/**
 * 04-caching/01-cache-mechanics.tsx
 * 04-caching/02-invalidation.tsx
 *
 * CONCEPT: How React Query's cache actually works + all invalidation patterns
 *
 * The cache is a Map-like store: queryKey → { data, status, updatedAt, ... }
 * Understanding it is the key to mastering React Query.
 */

import { useQueryClient } from "@tanstack/react-query";

// ─── Cache lifecycle ──────────────────────────────────────────────────────────
//
//  1. Query mounts with a key → cache entry created, status: 'pending'
//  2. queryFn resolves        → data stored, status: 'success'
//  3. staleTime timer starts
//  4. Component unmounts      → query becomes "inactive", gcTime timer starts
//  5. gcTime expires          → cache entry deleted from memory
//  6. Same key remounts       → if within gcTime, shows old data + refetches if stale
//                               if after gcTime, starts fresh (no old data)
//
//  KEY INSIGHT: staleTime and gcTime are INDEPENDENT.
//  You can have staleTime: Infinity (never refetch) but gcTime: 5min (evict quickly)
//  You can have staleTime: 0 (always refetch) but gcTime: 1hr (keep in memory)

// ─── Reading from cache imperatively ─────────────────────────────────────────

export function CacheInspector() {
  const queryClient = useQueryClient();

  const inspectCache = () => {
    // Get a single entry's data (undefined if not in cache)
    const user = queryClient.getQueryData(["user", 1]);

    // Get data + metadata
    const state = queryClient.getQueryState(["user", 1]);
    console.log(state?.status);          // 'success' | 'pending' | 'error'
    console.log(state?.dataUpdatedAt);   // timestamp
    console.log(state?.errorUpdatedAt);
    console.log(state?.fetchStatus);     // 'fetching' | 'idle' | 'paused'

    // Get all matching cache entries (useful for debugging)
    const queries = queryClient.getQueriesData({ queryKey: ["user"] });
    console.log(queries); // [[queryKey, data], ...]
  };
}

// ─── Writing to cache imperatively ───────────────────────────────────────────

export function CacheWriter() {
  const queryClient = useQueryClient();

  const examples = () => {
    // 1. Set exact data (overwrites, does NOT trigger staleTime reset)
    queryClient.setQueryData(["user", 1], { id: 1, name: "Alice" });

    // 2. Update data using current value (like setState updater)
    queryClient.setQueryData(["user", 1], (old: any) => ({
      ...old,
      name: "Alice Updated",
    }));

    // 3. Set data for multiple queries at once
    queryClient.setQueriesData({ queryKey: ["user"] }, (old: any) => ({
      ...old,
      verified: true,
    }));
  };
}

// ─── All invalidation patterns ────────────────────────────────────────────────

export function InvalidationExamples() {
  const queryClient = useQueryClient();

  const examples = async () => {
    // ── 1. Invalidate a single exact query ────────────────────────────────────
    await queryClient.invalidateQueries({
      queryKey: ["user", 1],
      exact: true,  // Only ["user", 1] — not ["user", 1, "posts"] etc.
    });

    // ── 2. Invalidate all queries matching a prefix ───────────────────────────
    // Invalidates: ["user"], ["user", 1], ["user", 2, "posts"], etc.
    await queryClient.invalidateQueries({ queryKey: ["user"] });

    // ── 3. Invalidate EVERYTHING ──────────────────────────────────────────────
    await queryClient.invalidateQueries();

    // ── 4. Invalidate based on predicate ─────────────────────────────────────
    // Maximum control — filter by any property of the query
    await queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "posts" &&
        (query.state.data as any)?.userId === 5,
    });

    // ── 5. Remove (not just invalidate) from cache ────────────────────────────
    // Unlike invalidate, removeQueries deletes the entry entirely.
    // Next mount will show loading spinner (no stale data shown).
    queryClient.removeQueries({ queryKey: ["user", 1] });

    // ── 6. Reset a query (back to initial/pending state) ─────────────────────
    queryClient.resetQueries({ queryKey: ["user", 1] });
  };
}

// ─── invalidateQueries vs removeQueries vs resetQueries ──────────────────────
//
//  invalidateQueries  → Marks data as stale + triggers refetch if query is active.
//                       Old data shown while refetching (good UX).
//
//  removeQueries      → Deletes cache entry completely. Next render shows loading.
//                       Use when you want a completely fresh start (e.g., logout).
//
//  resetQueries       → Returns query to its initial state (like it was never run).
//                       Triggers refetch if active. Uses initialData if provided.

// ─── Practical: Full post CRUD with proper cache updates ─────────────────────

import { useMutation } from "@tanstack/react-query";

interface Post { id: number; title: string; userId: number; }

export function usePostMutations() {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: (data: Omit<Post, "id">) =>
      fetch("/api/posts", { method: "POST", body: JSON.stringify(data) }).then(r => r.json()),
    onSuccess: (newPost: Post) => {
      // Option A: Invalidate list → triggers a refetch
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });

      // Option B: Add to cache directly → no network request
      queryClient.setQueryData(["post", newPost.id], newPost);
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, ...data }: Partial<Post> & { id: number }) =>
      fetch(`/api/posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }).then(r => r.json()),
    onSuccess: (updatedPost: Post) => {
      // Update the detail cache entry directly — no refetch needed
      queryClient.setQueryData(["post", updatedPost.id], updatedPost);

      // Invalidate the list because the updated post may affect list display
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/posts/${id}`, { method: "DELETE" }).then(() => undefined),
    onSuccess: (_data, deletedId) => {
      // Remove from cache (post no longer exists)
      queryClient.removeQueries({ queryKey: ["post", deletedId] });

      // Invalidate list to remove the deleted item
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
    },
  });

  return { createPost, updatePost, deletePost };
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: What happens when you call invalidateQueries?
// A: Two things: (1) the matching cache entries are marked as stale,
//    (2) if those queries have active subscribers (mounted components),
//    a refetch is triggered immediately in the background.
//
// Q: What is the difference between invalidateQueries and removeQueries?
// A: invalidateQueries marks stale + refetches but keeps the data visible.
//    removeQueries deletes the entry — next render shows a loading state.
//
// Q: How does prefix matching work in invalidateQueries?
// A: React Query compares each segment of your filter key against the
//    query key. ["posts"] matches any query key starting with "posts".
//    Use exact: true to prevent this and match only the exact key.
