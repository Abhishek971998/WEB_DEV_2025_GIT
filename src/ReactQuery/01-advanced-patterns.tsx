/**
 * 05-advanced/01-advanced-patterns.tsx
 *
 * CONCEPT: select, Suspense mode, QueryClient tricks
 */

import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import React, { Suspense } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// SELECT — transform & subscribe to a subset of data
// ═══════════════════════════════════════════════════════════════════════════
//
//  select runs AFTER every fetch AND is memoized.
//  The full raw data is cached; `select` transforms what the component sees.
//  If the selector's return value doesn't change (referential equality),
//  the component does NOT re-render. This is a powerful optimisation.

interface User { id: number; name: string; email: string; role: string; }

// Two components subscribing to the same cache entry but different slices
function useUserName(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: (): Promise<User> => fetch(`/api/users/${userId}`).then(r => r.json()),
    // This component only re-renders when the NAME changes, not email/role
    select: (user) => user.name,
  });
}

function useUserRole(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: (): Promise<User> => fetch(`/api/users/${userId}`).then(r => r.json()),
    // Same cache entry, different slice
    select: (user) => user.role,
  });
}

// Complex transformation — find a specific item in a list
function useTodo(todoId: number) {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then(r => r.json()),
    // Subscribe to just one item from a list — re-renders only when THAT item changes
    select: (todos: any[]) => todos.find(t => t.id === todoId),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SUSPENSE MODE — let React handle loading states
// ═══════════════════════════════════════════════════════════════════════════
//
//  useSuspenseQuery (v5):
//  - Always returns data (never undefined)
//  - Throws a Promise while loading → caught by <Suspense fallback>
//  - Throws an Error on failure    → caught by <ErrorBoundary>
//  - No more isPending/isError checks needed in the component

function UserProfile({ userId }: { userId: number }) {
  // With Suspense, data is ALWAYS defined — no loading check needed
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: (): Promise<User> => fetch(`/api/users/${userId}`).then(r => r.json()),
  });

  return <h1>{user.name}</h1>;  // TypeScript: user is User, not User | undefined
}

// Wrap in Suspense + ErrorBoundary above the component
export function UserPage({ userId }: { userId: number }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}

// useSuspenseQuery also enables parallel rendering with use(Promise)
export function ParallelSuspense({ userId }: { userId: number }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Both queries fire in parallel — Suspense waits for both */}
      <UserProfile userId={userId} />
      <UserPosts userId={userId} />
    </Suspense>
  );
}

function UserPosts({ userId }: { userId: number }) {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetch(`/api/users/${userId}/posts`).then(r => r.json()),
  });
  return <ul>{posts.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;
}

// ═══════════════════════════════════════════════════════════════════════════
// QUERY CLIENT ADVANCED USAGE
// ═══════════════════════════════════════════════════════════════════════════

export function AdvancedQueryClientUsage() {
  const queryClient = useQueryClient();

  // ── 1. Check if a query is currently fetching ─────────────────────────────
  const isFetching = queryClient.isFetching({ queryKey: ["posts"] });
  // Returns a number (count of matching queries currently fetching)
  // Useful for a global loading indicator

  // ── 2. Check if any mutation is pending ───────────────────────────────────
  const isMutating = queryClient.isMutating();
  // Returns count of in-flight mutations

  // ── 3. Get the cache entry's raw state ───────────────────────────────────
  const state = queryClient.getQueryState(["user", 1]);
  const isStale = state
    ? Date.now() - state.dataUpdatedAt > 60_000
    : true;

  // ── 4. Manually trigger a refetch ─────────────────────────────────────────
  const refetchPosts = () => queryClient.refetchQueries({ queryKey: ["posts"] });

  // ── 5. Cancel in-flight queries ───────────────────────────────────────────
  // Used in optimistic updates before applying cache changes
  const cancelUserQueries = () =>
    queryClient.cancelQueries({ queryKey: ["user"] });
}

// ─── Global loading indicator ────────────────────────────────────────────────
//
//  A common pattern: show a top-bar spinner whenever ANY query is fetching.

import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function GlobalLoadingBar() {
  const isFetching  = useIsFetching();   // count of queries fetching
  const isMutating  = useIsMutating();   // count of mutations in flight

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "#0070f3",
      animation: "progress 1s ease infinite",
    }} />
  );
}

// ─── Placeholder ErrorBoundary (use react-error-boundary in real projects) ───

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError = () => ({ hasError: true });
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: What does the `select` option do and why is it useful for performance?
// A: `select` transforms the cached data before it's returned to the component.
//    React Query memoizes the result — if the selector returns the same value
//    (via Object.is), the component doesn't re-render. Great for subscribing
//    to a single item in a list without re-rendering on unrelated changes.
//
// Q: How is useSuspenseQuery different from useQuery?
// A: useSuspenseQuery suspends (throws a Promise) while loading and throws
//    an Error on failure. This means you don't need isPending/isError checks —
//    your component always receives data. You need Suspense + ErrorBoundary above.
//
// Q: What does useIsFetching return?
// A: The NUMBER of queries currently fetching across the entire app. Useful for
//    a global loading indicator. Use isFetching > 0 to get a boolean.
