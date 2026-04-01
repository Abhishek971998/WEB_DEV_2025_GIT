/**
 * 06-patterns/01-custom-hooks.tsx
 *
 * CONCEPT: Real-world custom hook patterns — the architecture you'll use every day
 *
 * Best practices:
 *  - Co-locate query key, queryFn, and default options in one place
 *  - Use the query key factory pattern
 *  - Wrap useQuery/useMutation in domain-specific hooks
 *  - Never scatter raw useQuery calls across components
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

// ─── API layer (keep this separate from hooks) ────────────────────────────────

const userApi = {
  getById:  (id: number): Promise<User>   => fetch(`/api/users/${id}`).then(r => r.json()),
  getAll:   ():           Promise<User[]> => fetch("/api/users").then(r => r.json()),
  update:   (id: number, data: Partial<User>): Promise<User> =>
    fetch(`/api/users/${id}`, { method: "PATCH", body: JSON.stringify(data) }).then(r => r.json()),
};

const postApi = {
  getAll:         (): Promise<Post[]>   => fetch("/api/posts").then(r => r.json()),
  getByUser:      (userId: number): Promise<Post[]> =>
    fetch(`/api/posts?authorId=${userId}`).then(r => r.json()),
  create:         (data: Omit<Post, "id">): Promise<Post> =>
    fetch("/api/posts", { method: "POST", body: JSON.stringify(data) }).then(r => r.json()),
};

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const userKeys = {
  all:    ()              => ["users"]                          as const,
  detail: (id: number)   => ["users", "detail", id]           as const,
  posts:  (id: number)   => ["users", id, "posts"]             as const,
};

export const postKeys = {
  all:    ()              => ["posts"]                          as const,
  byUser: (userId: number) => ["posts", "byUser", userId]      as const,
};

// ─── queryOptions helper (v5 feature) ────────────────────────────────────────
//
//  queryOptions() is a type-safe way to define query config once and share it
//  between useQuery, prefetchQuery, ensureQueryData, etc.
//  The options are inferred correctly everywhere you use them.

export const userQueryOptions = (id: number) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getById(id),
    staleTime: 1000 * 60 * 5,
  });

// Now use the same config in multiple places:
// useQuery(userQueryOptions(id))
// queryClient.prefetchQuery(userQueryOptions(id))
// queryClient.ensureQueryData(userQueryOptions(id))  // in a loader

// ─── Domain hooks ─────────────────────────────────────────────────────────────

export function useUser(id: number) {
  return useQuery(userQueryOptions(id));
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all(),
    queryFn: userApi.getAll,
    staleTime: 1000 * 60 * 2,
  });
}

export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: userKeys.posts(userId),
    queryFn: () => postApi.getByUser(userId),
    enabled: userId > 0,
    staleTime: 30_000,
  });
}

export function usePosts() {
  return useQuery({
    queryKey: postKeys.all(),
    queryFn: postApi.getAll,
    staleTime: 60_000,
  });
}

// ─── Mutation hooks ───────────────────────────────────────────────────────────

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<User> & { id: number }) =>
      userApi.update(id, data),

    onSuccess: (updatedUser) => {
      // Update the individual user's cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);

      // Invalidate the list (the user's data in the list is now stale)
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.create,
    onSuccess: (newPost) => {
      // Invalidate all post lists that might include this post
      queryClient.invalidateQueries({ queryKey: postKeys.all() });
      queryClient.invalidateQueries({ queryKey: userKeys.posts(newPost.authorId) });

      // Optionally: add to cache directly to avoid the refetch
      // queryClient.setQueryData(["post", newPost.id], newPost);
    },
  });
}

// ─── Composed hook (real-world pattern) ──────────────────────────────────────
//
//  A hook that combines multiple queries + mutations for a full feature.

export function useUserManagement(userId: number) {
  const userQuery     = useUser(userId);
  const postsQuery    = useUserPosts(userId);
  const updateMutation = useUpdateUser();

  return {
    user:          userQuery.data,
    posts:         postsQuery.data ?? [],
    isLoading:     userQuery.isPending || postsQuery.isPending,
    isUpdating:    updateMutation.isPending,
    updateError:   updateMutation.error,

    updateUser: (data: Partial<User>) =>
      updateMutation.mutateAsync({ id: userId, ...data }),
  };
}

// Usage in component:
// function UserPage({ userId }: { userId: number }) {
//   const { user, posts, isLoading, updateUser } = useUserManagement(userId);
//   if (isLoading) return <Spinner />;
//   return <UserForm user={user} posts={posts} onSave={updateUser} />;
// }

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: Why wrap useQuery in a custom hook instead of using it directly?
// A: Centralises the query key, queryFn, and defaults. Components don't know about
//    API details. Easy to update the queryFn or staleTime in one place.
//    Also enables mocking in tests by mocking the custom hook.
//
// Q: What is queryOptions()?
// A: A helper (v5) that creates a typed options object reusable across
//    useQuery, prefetchQuery, ensureQueryData, etc. without losing type inference.
//
// Q: How do you share query options between a React Router loader and a hook?
// A: Define the config with queryOptions() once, then use it in both:
//    const opts = userQueryOptions(id);
//    // In loader: queryClient.ensureQueryData(opts)
//    // In hook:   useQuery(opts)
