/**
 * 03-mutations/02-optimistic-updates.tsx
 *
 * CONCEPT: Optimistic Updates — update the UI instantly, then sync with server
 *
 * The pattern:
 *  1. onMutate   → snapshot old cache, write new value to cache immediately
 *  2. onError    → rollback to snapshot if the server call fails
 *  3. onSettled  → invalidate query so it syncs with real server state
 *
 * This makes your app feel instant. Users see the result before the server responds.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// ─── API ──────────────────────────────────────────────────────────────────────

const api = {
  getTodos: (): Promise<Todo[]> =>
    fetch("/api/todos").then(r => r.json()),

  toggleTodo: (id: number): Promise<Todo> =>
    fetch(`/api/todos/${id}/toggle`, { method: "PATCH" }).then(r => r.json()),

  deleteTodo: (id: number): Promise<void> =>
    fetch(`/api/todos/${id}`, { method: "DELETE" }).then(() => undefined),

  addTodo: (text: string): Promise<Todo> =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    }).then(r => r.json()),
};

// ─── Optimistic toggle ────────────────────────────────────────────────────────

export function TodoList() {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: api.getTodos,
  });

  const toggleMutation = useMutation({
    mutationFn: api.toggleTodo,

    // ── Step 1: Optimistically update the cache ──────────────────────────────
    onMutate: async (todoId: number) => {
      // Cancel any in-flight refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the current cache value (for rollback)
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Optimistically update the cache
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map(todo =>
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );

      // Return context for use in onError/onSettled
      return { previousTodos };
    },

    // ── Step 2: Rollback on error ────────────────────────────────────────────
    onError: (_error, _todoId, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },

    // ── Step 3: Sync with server reality ────────────────────────────────────
    onSettled: () => {
      // Always refetch to make sure our cache matches the server
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleMutation.mutate(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ─── Optimistic delete ────────────────────────────────────────────────────────

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTodo,

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Remove the item instantly
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter(todo => todo.id !== deletedId)
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

// ─── Optimistic add (with temp id) ────────────────────────────────────────────
//
//  When adding, we don't have the real server ID yet.
//  Use a temporary ID, then replace on success.

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.addTodo,

    onMutate: async (text: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Add with a temporary negative id (won't clash with real server ids)
      const tempId = -Date.now();
      const optimisticTodo: Todo = {
        id: tempId,
        text,
        completed: false,
      };

      queryClient.setQueryData<Todo[]>(["todos"], old => [
        ...(old ?? []),
        optimisticTodo,
      ]);

      return { previousTodos, tempId };
    },

    onSuccess: (serverTodo, _text, context) => {
      // Replace the temp entry with the real server entry
      queryClient.setQueryData<Todo[]>(["todos"], old =>
        (old ?? []).map(todo =>
          todo.id === context?.tempId ? serverTodo : todo
        )
      );
    },

    onError: (_err, _text, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

// ─── INTERVIEW Q&A ───────────────────────────────────────────────────────────
//
// Q: What is an optimistic update and why use it?
// A: Immediately updating the UI as if the server request succeeded,
//    before the server responds. It makes apps feel instant. If the server
//    fails, you roll back to the previous state.
//
// Q: What is the role of onMutate?
// A: Runs before mutationFn. Use it to: (1) cancel in-flight queries,
//    (2) snapshot current cache, (3) apply the optimistic update,
//    (4) return context (the snapshot) for rollback.
//
// Q: Why do you cancelQueries in onMutate?
// A: To prevent a racing background refetch from overwriting your optimistic
//    update with stale data before the mutation response arrives.
//
// Q: Why invalidate in onSettled rather than onSuccess?
// A: onSettled runs on both success AND error. You want to sync with the server
//    regardless of outcome — on success to reflect real data, on error because
//    you already rolled back and want to confirm the server state.
