/**
 * 02-queries/02-query-options.tsx
 *
 * CONCEPT: All the important useQuery options explained with examples
 *
 * This is the config reference you'll reach for constantly.
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

// ─── 1. staleTime vs gcTime ──────────────────────────────────────────────────
//
//  staleTime (default: 0)
//    How long data stays "fresh". During this window, no refetch happens
//    even on window focus or component remount. After it expires, data
//    is "stale" but still shown while a background refetch runs.
//
//  gcTime (default: 5 minutes) — was `cacheTime` in v4, renamed in v5
//    How long UNUSED cache entries persist in memory. The timer starts
//    when the last component unsubscribes (unmounts). After gcTime,
//    the entry is deleted from cache entirely.
//
//  MENTAL MODEL:
//    staleTime: How long until React Query goes "hmm, should probably check again"
//    gcTime:    How long the data survives after no one is looking at it
//
//  COMMON CONFIGS:
//    Static reference data  →  staleTime: Infinity, gcTime: Infinity
//    User profile           →  staleTime: 5 min
//    Real-time feed         →  staleTime: 0 (always refetch)
//    Search results         →  staleTime: 30s (balance UX and freshness)

function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
    staleTime: 1000 * 60 * 5,   // 5 min — user profile rarely changes
    gcTime:    1000 * 60 * 30,  // 30 min — keep in memory while navigating
  });
}

// ─── 2. enabled — conditional queries ────────────────────────────────────────
//
//  When false: query does NOT run. Status stays 'pending'.
//  The most common use: wait for a dependency to be ready.

function useUserAddress(userId: string | null) {
  return useQuery({
    queryKey: ["user", userId, "address"],
    queryFn: () => fetch(`/api/users/${userId}/address`).then(r => r.json()),
    enabled: !!userId,   // ← Don't fetch if userId is null/undefined/empty
  });
}

// ─── 3. retry & retryDelay ───────────────────────────────────────────────────
//
//  React Query retries failed queries. Control how many times and how long
//  to wait between retries.

function useUnreliableData() {
  return useQuery({
    queryKey: ["unreliable"],
    queryFn: () => fetch("/api/flaky").then(r => r.json()),
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000), // exponential backoff

    // Or: retry only specific errors
    // retry: (failureCount, error: any) => {
    //   if (error.status === 404) return false;  // Don't retry 404s
    //   return failureCount < 3;
    // },
  });
}

// ─── 4. refetchInterval — polling ────────────────────────────────────────────

function useLiveOrderStatus(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetch(`/api/orders/${orderId}`).then(r => r.json()),

    // Poll every 5 seconds while this component is mounted
    refetchInterval: 5000,

    // Stop polling when the tab is in the background
    refetchIntervalInBackground: false,
  });
}

// ─── 5. keepPreviousData (placeholderData) ────────────────────────────────────
//
//  CRITICAL for pagination UX. When the query key changes (new page),
//  instead of showing a loading spinner, keep showing the old page's data
//  until the new page arrives.
//  In v5: use `placeholderData: keepPreviousData`

function usePaginatedPosts() {
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetch(`/api/posts?page=${page}`).then(r => r.json()),
    placeholderData: keepPreviousData,  // v5 way (was keepPreviousData option in v4)
    staleTime: 30_000,
  });

  return (
    <div>
      {/* Show subtle loading indicator instead of replacing content */}
      {isFetching && <span>Loading page {page}...</span>}

      <ul>{data?.posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>

      <button
        onClick={() => setPage(p => p - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPage(p => p + 1)}
        // Disable "next" while the next page is loading to prevent over-clicking
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next
      </button>
    </div>
  );
}

// ─── 6. initialData vs placeholderData ───────────────────────────────────────
//
//  initialData    — Treated as REAL cache data. Counts towards staleTime.
//                   Use when you already have the data (e.g., from SSR).
//
//  placeholderData — Shown while fetching, but NOT stored in cache.
//                   isPlaceholderData === true while it's being used.
//                   Use for skeletons or old page data (keepPreviousData).

function PostDetailWithSSR({ id, serverData }: { id: number; serverData: any }) {
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetch(`/api/posts/${id}`).then(r => r.json()),

    // Tell React Query: "this data is already fresh as of this time"
    initialData: serverData,
    initialDataUpdatedAt: Date.now(),
  });

  return <div>{data?.title}</div>;
}

// ─── 7. select — data transformation ─────────────────────────────────────────
//  (Covered in detail in 05-advanced/02-select-transform.tsx)

function usePostTitles() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
    // Transform data AFTER fetch, BEFORE returning to component
    // The full data is still cached — select only affects what's returned
    select: (posts) => posts.map((p: any) => p.title),
  });
}

// ─── INTERVIEW Q&A ───────────────────────────────────────────────────────────
//
// Q: What is the difference between staleTime and gcTime?
// A: staleTime controls refetch behavior (how fresh data is considered).
//    gcTime controls memory/cache eviction (how long unused data lives).
//    Both can be Infinity for static data.
//
// Q: What happens when enabled is false?
// A: The query doesn't run. It stays in 'pending' status indefinitely.
//    When enabled becomes true, the query runs immediately.
//
// Q: What was cacheTime renamed to and why?
// A: cacheTime → gcTime in v5. "gc" = garbage collection, which better
//    describes what it actually controls.
//
// Q: When would you use initialData vs placeholderData?
// A: initialData: When you have REAL server data (e.g., from SSR/hydration).
//    placeholderData: When you want to show something temporary while loading
//    (e.g., old page data during pagination, skeleton shapes).
