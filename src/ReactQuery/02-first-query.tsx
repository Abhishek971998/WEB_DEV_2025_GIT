/**
 * 01-basics/02-first-query.tsx
 *
 * CONCEPT: useQuery — the foundation of React Query
 *
 * useQuery takes:
 *  - queryKey  : unique identifier for this piece of data in the cache
 *  - queryFn   : async function that returns the data
 *  - options   : configuration (staleTime, enabled, select, etc.)
 *
 * It returns status flags + the data + helpful metadata.
 */

import { useQuery } from "@tanstack/react-query";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ─── API function (keep these separate from components) ──────────────────────

async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`); // React Query catches this
  return res.json();
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PostDetail({ postId }: { postId: number }) {
  const {
    // ── Core data & status ──────────────────────────────────────────────────
    data,           // The resolved value from queryFn (undefined while loading)
    error,          // Error object if queryFn threw (null otherwise)
    status,         // 'pending' | 'error' | 'success'

    // ── Derived boolean flags (more convenient than checking `status`) ──────
    isPending,      // true while first load, no cached data yet
    isLoading,      // alias for isPending && isFetching (same as isPending for most cases)
    isError,        // true when status === 'error'
    isSuccess,      // true when status === 'success'

    // ── Background fetch indicators ─────────────────────────────────────────
    isFetching,     // true ANY time a request is in-flight (incl. background refetches)
    isRefetching,   // true during a background refetch (data already exists)
    isStale,        // true when data is older than staleTime

    // ── Manual refetch ──────────────────────────────────────────────────────
    refetch,        // () => Promise<QueryObserverResult> — trigger a refetch manually
  } = useQuery({
    queryKey: ["post", postId],   // Array form — ALWAYS prefer arrays (explained in 02-queries/01-query-keys.tsx)
    queryFn: () => fetchPost(postId),
    staleTime: 1000 * 60,         // Data is fresh for 1 minute
  });

  // ── Render states ───────────────────────────────────────────────────────────

  // 1. First load — no data in cache yet
  if (isPending) return <div>Loading...</div>;

  // 2. Query failed
  if (isError) return <div>Error: {error.message}</div>;

  // 3. Data is available (TypeScript now knows `data` is Post)
  return (
    <div>
      {/*
       * isFetching is true even when data exists (background refetch).
       * Show a subtle indicator instead of replacing the whole UI.
       */}
      {isFetching && <span>Refreshing...</span>}

      <h1>{data.title}</h1>
      <p>{data.body}</p>

      <button onClick={() => refetch()}>Force Refresh</button>
    </div>
  );
}

// ─── INTERVIEW INSIGHT: status vs isFetching ────────────────────────────────
//
//  status === 'pending'   → No data, no error, waiting for first response
//  status === 'success'   → Has data (might be stale, might be refetching)
//  status === 'error'     → queryFn threw and all retries exhausted
//
//  isFetching = true      → A network request is in-flight RIGHT NOW
//                           (can be true even when status === 'success')
//
//  So: isPending && isFetching = initial load skeleton
//      isSuccess && isFetching = background refresh spinner
//
// ─── INTERVIEW INSIGHT: Why separate queryKey & queryFn? ────────────────────
//
//  queryKey  → identity (what is this data?)
//  queryFn   → fetcher  (how do I get this data?)
//
//  Two components using the same queryKey SHARE the same cache entry
//  and the same network request. React Query deduplicates automatically.
