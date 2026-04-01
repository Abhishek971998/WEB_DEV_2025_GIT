/**
 * 03-mutations/01-basic-mutation.tsx
 *
 * CONCEPT: useMutation — create, update, delete server data
 *
 * Key difference from useQuery:
 *  - Mutations are NOT automatic. You call mutate() manually.
 *  - Mutations don't have a queryKey (they don't live in cache).
 *  - After a successful mutation, you typically invalidate related queries.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Post { id: number; title: string; body: string; }
type   NewPost = Omit<Post, "id">;

// ─── API functions ────────────────────────────────────────────────────────────

const api = {
  createPost:  (data: NewPost):              Promise<Post>    =>
    fetch("/api/posts",        { method: "POST",   body: JSON.stringify(data) }).then(r => r.json()),
  updatePost:  (id: number, data: Partial<Post>): Promise<Post> =>
    fetch(`/api/posts/${id}`,  { method: "PATCH",  body: JSON.stringify(data) }).then(r => r.json()),
  deletePost:  (id: number):                 Promise<void>   =>
    fetch(`/api/posts/${id}`,  { method: "DELETE" }).then(() => undefined),
};

// ─── Basic mutation with invalidation ────────────────────────────────────────

export function CreatePostForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const createPost = useMutation({
    mutationFn: (newPost: NewPost) => api.createPost(newPost),

    // ── Lifecycle callbacks ──────────────────────────────────────────────────
    onSuccess: (createdPost) => {
      // Most common pattern: invalidate the list so it refetches with the new item
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Alternatively, add directly to cache to avoid a network round-trip:
      // queryClient.setQueryData(["post", createdPost.id], createdPost);

      setTitle("");
      alert(`Post "${createdPost.title}" created!`);
    },

    onError: (error: Error) => {
      alert(`Failed to create post: ${error.message}`);
    },

    onSettled: () => {
      // Runs after both success AND error. Good for cleanup (e.g., dismiss spinner).
      console.log("mutation settled");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate({ title, body: "..." });
    // Or: createPost.mutateAsync(...) — returns a Promise, useful for chaining
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button
        type="submit"
        disabled={createPost.isPending}  // Prevent double submission
      >
        {createPost.isPending ? "Creating..." : "Create Post"}
      </button>

      {/* Show inline error */}
      {createPost.isError && (
        <p style={{ color: "red" }}>{createPost.error.message}</p>
      )}

      {/* Show success confirmation */}
      {createPost.isSuccess && (
        <p style={{ color: "green" }}>Post created!</p>
      )}
    </form>
  );
}

// ─── All mutation status values ───────────────────────────────────────────────
//
//  status:    'idle' | 'pending' | 'error' | 'success'
//  isPending: true while mutationFn is running
//  isSuccess: true after a successful mutation
//  isError:   true when mutationFn threw
//  isIdle:    true before mutate() is called (or after reset())
//  data:      the returned value from mutationFn (after success)
//  error:     the thrown error (after failure)

// ─── mutate vs mutateAsync ────────────────────────────────────────────────────

export function MutateVsAsync() {
  const deleteMutation = useMutation({
    mutationFn: api.deletePost,
    onSuccess: () => console.log("deleted"),
    onError: (err) => console.error(err),
  });

  // mutate() — fire and forget. Errors handled via onError callback.
  const handleDeleteSimple = (id: number) => {
    deleteMutation.mutate(id);
  };

  // mutateAsync() — returns a Promise. Errors bubble up to the caller.
  // Useful when you need to do something AFTER and handle errors locally.
  const handleDeleteWithChain = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      // guaranteed to run only on success
      console.log("Do something after delete");
    } catch (err) {
      // Handle error here instead of (or in addition to) onError
      console.error("Caught in component:", err);
    }
  };

  return (
    <div>
      <button onClick={() => handleDeleteSimple(1)}>Delete (simple)</button>
      <button onClick={() => handleDeleteWithChain(1)}>Delete (async)</button>
    </div>
  );
}

// ─── Reset mutation state ─────────────────────────────────────────────────────

export function FormWithReset() {
  const mutation = useMutation({ mutationFn: api.createPost });

  return (
    <div>
      {mutation.isError && (
        <div>
          <p>Error: {mutation.error.message}</p>
          {/* Reset back to idle state */}
          <button onClick={() => mutation.reset()}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

// ─── INTERVIEW Q&A ───────────────────────────────────────────────────────────
//
// Q: What is the difference between useQuery and useMutation?
// A: useQuery fetches data automatically, is cached by key, and re-runs on
//    stale/mount/focus. useMutation requires explicit invocation, is not cached,
//    and is for side-effecting operations (POST, PUT, DELETE).
//
// Q: What's the difference between mutate and mutateAsync?
// A: mutate is fire-and-forget; errors go to onError callback.
//    mutateAsync returns a Promise, so you can await it and use try/catch.
//
// Q: What does onSettled do?
// A: Runs after BOTH success and error. Think of it as a finally block.
//    Useful for cleanup operations like dismissing loading states.
//
// Q: Can you pass variables to onSuccess/onError callbacks?
// A: Yes! The signature is:
//    onSuccess: (data, variables, context) => void
//    onError:   (error, variables, context) => void
//    `variables` is what you passed to mutate(), `context` is from onMutate.
