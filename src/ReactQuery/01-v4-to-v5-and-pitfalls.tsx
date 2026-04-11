/**
 * 13-migration-and-pitfalls/01-v4-to-v5-and-pitfalls.tsx
 *
 * CONCEPT: React Query v4 → v5 migration guide + the most common mistakes
 *
 * This file is a cheat sheet for interviews and for upgrading projects.
 */

// ═══════════════════════════════════════════════════════════════════════════
// V4 → V5 BREAKING CHANGES
// ═══════════════════════════════════════════════════════════════════════════

// ── 1. cacheTime → gcTime ─────────────────────────────────────────────────────

// v4:
// useQuery({ queryKey: [...], queryFn: ..., cacheTime: 60_000 })

// v5:
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// useQuery({ queryKey: [...], queryFn: ..., gcTime: 60_000 })

// ── 2. status: 'loading' → status: 'pending' ──────────────────────────────────

// v4: status === 'loading'   isLoading
// v5: status === 'pending'   isPending (isLoading still works as alias)

// ── 3. Callbacks removed from useQuery ───────────────────────────────────────

// v4 (REMOVED in v5):
// useQuery({ onSuccess: (data) => ..., onError: (err) => ... })

// v5: Use QueryCache callbacks or useEffect instead:
//
// Option A: QueryCache (for global handling)
// new QueryClient({ queryCache: new QueryCache({ onError: ... }) })
//
// Option B: useEffect on data/error (for per-component side effects)

import { useEffect } from "react";

function UserProfile({ userId }: { userId: number }) {
  const { data, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });

  // v5 way to run side effects on success/error
  useEffect(() => {
    if (data) {
      console.log("User loaded:", data.name);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.error("Failed to load user:", error);
    }
  }, [isError, error]);

  return <div>{data?.name}</div>;
}

// ── 4. keepPreviousData → placeholderData: keepPreviousData ────────────────────

import { keepPreviousData } from "@tanstack/react-query";

// v4:
// useQuery({ keepPreviousData: true })

// v5:
function PaginatedList({ page }: { page: number }) {
  return useQuery({
    queryKey: ["items", page],
    queryFn: () => fetch(`/api/items?page=${page}`).then(r => r.json()),
    placeholderData: keepPreviousData,   // ← imported function, not a boolean option
  });
}

// ── 5. useInfiniteQuery requires initialPageParam ───────────────────────────────

import { useInfiniteQuery } from "@tanstack/react-query";

// v4:
// useInfiniteQuery({ ..., getNextPageParam: (last) => last.cursor })
// First call received undefined as pageParam automatically

// v5 (initialPageParam is REQUIRED):
function InfiniteList() {
  return useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam }) =>
      fetch(`/api/items?cursor=${pageParam}`).then(r => r.json()),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: "",    // ← Now required explicitly
  });
}

// ── 6. Removed: isLoading on disabled queries ────────────────────────────────
//
// v4: disabled query had isLoading: false
// v5: disabled query (enabled: false) has isPending: true, fetchStatus: 'idle'
//     Always check `enabled` in your condition if you use `enabled: false`

function ConditionalQuery({ userId }: { userId: string | null }) {
  const { isPending, fetchStatus } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
    enabled: !!userId,
  });

  // v5: isPending is true AND fetchStatus is 'idle' when enabled: false
  // Don't show a spinner in this case!
  const isActuallyLoading = isPending && fetchStatus === "fetching";

  if (isActuallyLoading) return <div>Loading...</div>;
  return <div>Content</div>;
}

// ── 7. TypeScript: error is now typed as Error ───────────────────────────────
//
// v4: error was typed as unknown
// v5: error is typed as Error by default (configurable per query)

// ═══════════════════════════════════════════════════════════════════════════
// COMMON PITFALLS & HOW TO AVOID THEM
// ═══════════════════════════════════════════════════════════════════════════

// ── Pitfall 1: Creating QueryClient inside a component ────────────────────────

// ❌ BAD — recreates the client (and loses all cache) on every render
function BadApp() {
  const queryClient = new (require("@tanstack/react-query").QueryClient)(); // new client every render!
  return null;
}

// ✅ GOOD — create outside the component
const queryClient = new (require("@tanstack/react-query").QueryClient)();

// ── Pitfall 2: Missing variables in queryKey ──────────────────────────────────

// ❌ BAD — userId changes, but the key is always ["user"] → stale data
function BadUserQuery({ userId }: { userId: number }) {
  return useQuery({
    queryKey: ["user"],               // ← WRONG: missing userId
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });
}

// ✅ GOOD
function GoodUserQuery({ userId }: { userId: number }) {
  return useQuery({
    queryKey: ["user", userId],       // ← userId in key → new cache entry per user
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });
}

// ── Pitfall 3: Awaiting mutation in event handler without error handling ───────

// ❌ BAD — unhandled promise rejection if mutation fails
function BadForm() {
  const mutation = useMutation({ mutationFn: (d: any) => fetch("/api").then(r => r.json()) });

  const handleSubmit = async () => {
    await mutation.mutateAsync({ title: "test" }); // throws if fails — uncaught!
  };

  return <button onClick={handleSubmit}>Submit</button>;
}

// ✅ GOOD — use mutate() with onError, OR wrap mutateAsync in try/catch
function GoodForm() {
  const mutation = useMutation({
    mutationFn: (d: any) => fetch("/api").then(r => r.json()),
    onError: (err) => console.error(err),
  });

  // Option A: mutate() — errors go to onError
  const handleA = () => mutation.mutate({ title: "test" });

  // Option B: mutateAsync() — catch in the handler
  const handleB = async () => {
    try {
      await mutation.mutateAsync({ title: "test" });
    } catch {
      // handled
    }
  };

  return <button onClick={handleA}>Submit</button>;
}

// ── Pitfall 4: Not invalidating after mutations ───────────────────────────────

// ❌ BAD — data is created on server but list never updates
function BadCreatePost() {
  const mutation = useMutation({
    mutationFn: (data: any) => fetch("/api/posts", { method: "POST", body: JSON.stringify(data) }).then(r => r.json()),
    // No onSuccess → cache never updated
  });
  return null;
}

// ✅ GOOD
function GoodCreatePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: any) => fetch("/api/posts", { method: "POST", body: JSON.stringify(data) }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return null;
}

// ── Pitfall 5: gcTime < staleTime ─────────────────────────────────────────────

// ❌ BAD — data gets garbage collected before it becomes stale
// This causes loading flashes even though staleTime hasn't expired
// useQuery({ staleTime: 60_000, gcTime: 10_000 }) ← gcTime < staleTime!

// ✅ GOOD — gcTime should always be >= staleTime
// useQuery({ staleTime: 60_000, gcTime: 120_000 })

// ── Pitfall 6: Not memoizing select functions ─────────────────────────────────

// ❌ BAD — new function reference every render → React Query can't memoize
// The select optimisation is lost entirely
function BadSelect({ userId }: { userId: number }) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
    select: (users: any[]) => users.find(u => u.id === userId), // new fn ref each render
  });
}

// ✅ GOOD — stable reference via useCallback
import { useCallback } from "react";

function GoodSelect({ userId }: { userId: number }) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
    select: useCallback(
      (users: any[]) => users.find(u => u.id === userId),
      [userId]
    ),
  });
}

// ── Pitfall 7: Using string keys instead of array keys ────────────────────────

// ❌ BAD — string keys lose hierarchical invalidation
// useQuery({ queryKey: "posts", ... })

// ✅ GOOD — always use arrays
// useQuery({ queryKey: ["posts"], ... })

// ─── INTERVIEW Q&A ───────────────────────────────────────────────────────────
//
// Q: What are the biggest breaking changes in React Query v5?
// A: (1) cacheTime → gcTime. (2) status: 'loading' → 'pending'.
//    (3) Callbacks removed from useQuery (onSuccess, onError, onSettled).
//    (4) keepPreviousData → placeholderData: keepPreviousData.
//    (5) initialPageParam required in useInfiniteQuery.
//
// Q: Where do you put success/error side effects in v5?
// A: Use useEffect watching data/error, or use QueryCache/MutationCache
//    callbacks on the QueryClient for global handling.
//
// Q: What happens when gcTime is less than staleTime?
// A: The cache entry can be garbage collected before it's considered stale.
//    When the component remounts, data is gone → loading flash, even though
//    staleTime hasn't expired. Always keep gcTime >= staleTime.
