/**
 * 11-real-world/01-complete-feature.tsx
 *
 * CONCEPT: A complete real-world feature built with React Query best practices.
 *
 * This is a "Posts" feature with:
 *  ✅ Query key factory
 *  ✅ queryOptions helper
 *  ✅ Custom hooks for queries and mutations
 *  ✅ Optimistic updates
 *  ✅ Pagination with keepPreviousData
 *  ✅ Prefetch on hover
 *  ✅ Error handling
 *  ✅ Loading states
 *
 * Use this as a template for building features in production apps.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { useCallback, useState } from "react";

// ─── 1. Types ─────────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  published: boolean;
  createdAt: string;
}

export interface PostFilters {
  page: number;
  limit: number;
  authorId?: number;
  published?: boolean;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}

// ─── 2. API layer ─────────────────────────────────────────────────────────────

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      body.message ?? `HTTP ${res.status}`,
      res.status,
      body.code ?? "UNKNOWN"
    );
  }

  return res.json();
}

export const postApi = {
  list: (filters: PostFilters) => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(filters.limit),
      ...(filters.authorId && { authorId: String(filters.authorId) }),
      ...(filters.published !== undefined && { published: String(filters.published) }),
    });
    return fetchJson<PaginatedPosts>(`/api/posts?${params}`);
  },

  getById: (id: number) =>
    fetchJson<Post>(`/api/posts/${id}`),

  create: (data: Omit<Post, "id" | "createdAt">) =>
    fetchJson<Post>("/api/posts", { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: Partial<Post>) =>
    fetchJson<Post>(`/api/posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  delete: (id: number) =>
    fetchJson<void>(`/api/posts/${id}`, { method: "DELETE" }),

  publish: (id: number) =>
    fetchJson<Post>(`/api/posts/${id}/publish`, { method: "POST" }),
};

// ─── 3. Query key factory ─────────────────────────────────────────────────────

export const postKeys = {
  all:     ()                    => ["posts"]                          as const,
  lists:   ()                    => ["posts", "list"]                  as const,
  list:    (f: PostFilters)      => ["posts", "list", f]               as const,
  details: ()                    => ["posts", "detail"]                as const,
  detail:  (id: number)          => ["posts", "detail", id]            as const,
};

// ─── 4. Query options (reusable config) ───────────────────────────────────────

export const postListOptions = (filters: PostFilters) =>
  queryOptions({
    queryKey: postKeys.list(filters),
    queryFn: () => postApi.list(filters),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });

export const postDetailOptions = (id: number) =>
  queryOptions({
    queryKey: postKeys.detail(id),
    queryFn: () => postApi.getById(id),
    staleTime: 60_000,
    enabled: id > 0,
  });

// ─── 5. Query hooks ───────────────────────────────────────────────────────────

export function usePostList(filters: PostFilters) {
  return useQuery(postListOptions(filters));
}

export function usePost(id: number) {
  return useQuery(postDetailOptions(id));
}

// ─── 6. Mutation hooks ────────────────────────────────────────────────────────

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.create,
    onSuccess: (newPost) => {
      // Add to detail cache immediately
      queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
      // Invalidate all list views
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Post> & { id: number }) =>
      postApi.update(id, data),

    // Optimistic update
    onMutate: async ({ id, ...data }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });

      const previous = queryClient.getQueryData<Post>(postKeys.detail(id));

      queryClient.setQueryData<Post>(postKeys.detail(id), (old) =>
        old ? { ...old, ...data } : old!
      );

      return { previous, id };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(postKeys.detail(context.id), context.previous);
      }
    },

    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(vars.id) });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.delete,

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      // Snapshot all list entries for rollback
      const previousLists = queryClient.getQueriesData<PaginatedPosts>({
        queryKey: postKeys.lists(),
      });

      // Optimistically remove from all cached lists
      queryClient.setQueriesData<PaginatedPosts>(
        { queryKey: postKeys.lists() },
        (old) => old
          ? { ...old, posts: old.posts.filter(p => p.id !== deletedId) }
          : old
      );

      return { previousLists };
    },

    onError: (_err, _id, context) => {
      // Restore all list entries from snapshot
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: (_, _err, deletedId) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function usePublishPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.publish,
    onSuccess: (publishedPost) => {
      queryClient.setQueryData(postKeys.detail(publishedPost.id), publishedPost);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// ─── 7. Prefetch hook ─────────────────────────────────────────────────────────

export function usePrefetchPost() {
  const queryClient = useQueryClient();

  return useCallback(
    (id: number) => {
      queryClient.prefetchQuery(postDetailOptions(id));
    },
    [queryClient]
  );
}

// ─── 8. Component: PostListPage ───────────────────────────────────────────────

export function PostListPage() {
  const [filters, setFilters] = useState<PostFilters>({ page: 1, limit: 10 });
  const prefetchPost = usePrefetchPost();

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    usePostList(filters);

  const deleteMutation = useDeletePost();

  if (isPending) return <div>Loading posts...</div>;
  if (isError)   return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {/* Background refresh indicator */}
      {isFetching && !isPending && (
        <div style={{ position: "fixed", top: 8, right: 8 }}>
          Refreshing...
        </div>
      )}

      <ul>
        {data.posts.map(post => (
          <li
            key={post.id}
            onMouseEnter={() => prefetchPost(post.id)} // ← Hover prefetch
          >
            <a href={`/posts/${post.id}`}>{post.title}</a>
            <button
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button
          onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
          disabled={filters.page === 1 || isFetching}
        >
          Previous
        </button>

        <span>
          Page {data.page} of {data.totalPages}
        </span>

        <button
          onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
          disabled={isPlaceholderData || filters.page === data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─── 9. Component: PostDetailPage ────────────────────────────────────────────

export function PostDetailPage({ postId }: { postId: number }) {
  const { data: post, isPending, isError } = usePost(postId);
  const updatePost = useUpdatePost();
  const publishPost = usePublishPost();

  if (isPending) return <div>Loading post...</div>;
  if (isError)   return <div>Post not found</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      {!post.published && (
        <button
          onClick={() => publishPost.mutate(post.id)}
          disabled={publishPost.isPending}
        >
          {publishPost.isPending ? "Publishing..." : "Publish"}
        </button>
      )}

      <button
        onClick={() =>
          updatePost.mutate({ id: post.id, title: post.title + " (updated)" })
        }
      >
        Update Title
      </button>

      {updatePost.isError && (
        <p style={{ color: "red" }}>{(updatePost.error as Error).message}</p>
      )}
    </article>
  );
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: How do you architect React Query in a large application?
// A: (1) Separate API, keys, options, hooks, and components into distinct layers.
//    (2) Use query key factories for all keys — single source of truth.
//    (3) Use queryOptions() for reusable config across hooks and loaders.
//    (4) One custom hook per domain entity (usePost, useUser, etc.).
//    (5) One mutation hook per operation (useCreatePost, useDeletePost, etc.).
//
// Q: How do you handle optimistic updates across multiple list queries?
// A: Use getQueriesData() to get all matching list cache entries, then
//    setQueriesData() to update all of them. Store the snapshot with
//    previousLists for rollback on error.
//
// Q: Where should the API layer live?
// A: In a separate file/module, completely independent of React Query.
//    The API functions just fetch and return data (or throw ApiError).
//    React Query wraps them — but the API layer doesn't know about React Query.
//    This makes testing and swapping implementations much easier.
