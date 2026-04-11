/**
 * 10-performance/01-optimization-patterns.tsx
 *
 * CONCEPT: Performance patterns — render optimization, request deduplication,
 *          structural sharing, and avoiding common pitfalls.
 *
 * React Query is already very performant by default.
 * These patterns help you go further.
 */

import {
  useQuery,
  useQueryClient,
  QueryObserver,
} from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// 1. STRUCTURAL SHARING — React Query's built-in optimisation
// ═══════════════════════════════════════════════════════════════════════════
//
// When data is refetched, React Query performs a deep structural comparison.
// If a part of the data hasn't changed, it keeps the SAME object reference.
// This means components subscribed to unchanged parts WON'T re-render.
//
// Example: You have a list of 100 posts. On refetch, only post #3 changed.
// React Query returns the same array reference for the other 99 posts.
// Components rendering those posts won't re-render.

interface Post { id: number; title: string; views: number; }

// This component only re-renders when post #3's data changes —
// not when other posts in the same query refetch.
function PostItem({ postId }: { postId: number }) {
  const { data: post } = useQuery({
    queryKey: ["posts"],
    queryFn: (): Promise<Post[]> => fetch("/api/posts").then(r => r.json()),
    select: useCallback(
      (posts: Post[]) => posts.find(p => p.id === postId),
      [postId]
    ),
    // ↑ IMPORTANT: memoize the selector. Without useCallback, a new function
    // reference is created every render, bypassing React Query's memoisation.
  });

  return <div>{post?.title}</div>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SELECT — the primary render optimisation tool
// ═══════════════════════════════════════════════════════════════════════════
//
// Problem: Without select, EVERY subscriber to a query re-renders whenever
//          ANY part of the data changes.
//
// Solution: Use select to subscribe to only the slice you need.
//           The component only re-renders when ITS slice changes.

interface User { id: number; name: string; email: string; settings: object; }

// BAD: re-renders on any user property change
function UserNameBad({ userId }: { userId: number }) {
  const { data: user } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });
  return <span>{user?.name}</span>;
}

// GOOD: only re-renders when user.name changes
function UserNameGood({ userId }: { userId: number }) {
  const { data: name } = useQuery<User, Error, string>({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
    select: (user) => user.name,
  });
  return <span>{name}</span>;
}

// IMPORTANT: Memoize selectors that create new objects/arrays
function useActiveUsers() {
  return useQuery<User[], Error, User[]>({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
    // This filter creates a new array on every call.
    // If wrapped in useCallback, React Query can detect "same reference = no re-render"
    select: useCallback(
      (users: User[]) => users.filter(u => (u as any).active),
      [] // stable reference
    ),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. AVOID OVER-FETCHING — staleTime as your primary lever
// ═══════════════════════════════════════════════════════════════════════════
//
// The single most impactful performance setting.
// Default staleTime is 0 → data is immediately stale → refetches on every mount.
// This means navigating back to a page triggers a fetch every time.

// Tiered staleTime strategy:
const STALE = {
  LIVE:     0,              // Always refetch (prices, scores, notifications)
  SHORT:    30_000,         // 30s — search results, feeds
  MEDIUM:   5 * 60_000,     // 5min — user profile, settings
  LONG:     30 * 60_000,    // 30min — reference data (countries, categories)
  FOREVER:  Infinity,       // Never refetch (static content, lookup tables)
};

function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch("/api/countries").then(r => r.json()),
    staleTime: STALE.FOREVER,  // Countries never change — cache forever
    gcTime: STALE.FOREVER,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. QUERY DEDUPLICATION — automatic, but good to understand
// ═══════════════════════════════════════════════════════════════════════════
//
// If 10 components mount at the same time with the same queryKey,
// React Query makes exactly ONE network request. All 10 components
// share the response. No code needed — it's automatic.
//
// However, this only works when keys are IDENTICAL. A common mistake
// is creating slightly different keys for the same data:

// ❌ These are DIFFERENT cache entries → two network requests
function BadDedup() {
  useQuery({ queryKey: ["user", { id: 1 }], queryFn: () => {} });
  useQuery({ queryKey: ["user", { id: 1 }], queryFn: () => {} }); // same key — deduped ✅
  useQuery({ queryKey: ["user", 1], queryFn: () => {} });          // different key! ❌
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. SUBSCRIPTIONS WITH QueryObserver (outside React)
// ═══════════════════════════════════════════════════════════════════════════
//
// For subscribing to query state outside of React components
// (e.g., in a service, a Zustand store, or Vanilla JS).

export function observeQueryOutsideReact() {
  const { QueryClient, QueryObserver } = require("@tanstack/react-query");
  const qc = new QueryClient();

  const observer = new QueryObserver(qc, {
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
  });

  // Subscribe to changes
  const unsubscribe = observer.subscribe((result) => {
    if (result.isSuccess) {
      console.log("Posts updated:", result.data);
    }
  });

  return unsubscribe; // call to clean up
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. AVOID LAYOUT THRASH — notifyOnChangeProps
// ═══════════════════════════════════════════════════════════════════════════
//
// By default, a component re-renders when ANY property of the query result
// changes (data, isFetching, isStale, etc.).
// Restrict re-renders to only the properties you actually use.

function PostCount() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
    // Only re-render when `data` changes — not isFetching, isStale, etc.
    notifyOnChangeProps: ["data"],
  });

  return <span>{data?.length ?? 0} posts</span>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. TRACKED QUERIES (v5 default)
// ═══════════════════════════════════════════════════════════════════════════
//
// In React Query v5, "tracked queries" is the default behaviour.
// React Query tracks which properties you destructure from useQuery
// and only re-renders when those specific properties change.
//
// This is automatic — you get it for free.
//
// Example: If you only destructure `data`, changes to `isFetching`
// won't cause a re-render.

function OptimisedByDefault() {
  // React Query v5 tracks that you only use `data`
  // → only re-renders when data changes
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
  });

  return <div>{data?.length}</div>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. WINDOWING / VIRTUALISATION with infinite queries
// ═══════════════════════════════════════════════════════════════════════════
//
// For large lists, combine useInfiniteQuery with a virtualiser.
// React Query manages the data fetching; the virtualiser manages rendering.

import { useInfiniteQuery } from "@tanstack/react-query";

// With @tanstack/react-virtual:
export function VirtualisedList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/items?offset=${pageParam}&limit=50`).then(r => r.json()),
    getNextPageParam: (last, pages) =>
      last.hasMore ? pages.length * 50 : undefined,
    initialPageParam: 0,
  });

  const allItems = data?.pages.flatMap(p => p.items) ?? [];

  // Then use useVirtual / Virtuoso / react-window to render only visible rows
  // const rowVirtualiser = useVirtual({ size: allItems.length, ... });

  return (
    <div>
      {/* Only render ~20 visible rows even if allItems has 10,000 entries */}
      {allItems.slice(0, 50).map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: What is structural sharing in React Query?
// A: After each refetch, React Query deep-compares the new data with the old.
//    Any unchanged sub-objects keep the same reference. Components subscribed
//    to unchanged data don't re-render. Disable with structuralSharing: false.
//
// Q: How do you prevent unnecessary re-renders with useQuery?
// A: (1) Use `select` to subscribe to only the data slice you need.
//    (2) Memoize selectors with useCallback.
//    (3) Use `notifyOnChangeProps` to limit which state changes trigger renders.
//    (4) In v5, tracked queries are the default — only destructured props trigger renders.
//
// Q: What is notifyOnChangeProps?
// A: An option that limits which query result properties trigger re-renders.
//    notifyOnChangeProps: ["data"] → only re-render when data changes.
//    In v5, this is handled automatically by tracked queries.
//
// Q: How does React Query deduplicate requests?
// A: Queries with the same key share one cache entry and one in-flight request.
//    Any component mounting with an active (in-flight) query subscribes to
//    the existing request instead of firing a new one.
