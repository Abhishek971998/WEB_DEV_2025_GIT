/**
 * 02-queries/01-query-keys.tsx
 *
 * CONCEPT: Query Keys — the most important concept to master
 *
 * Query keys are React Query's cache keys. They determine:
 *  - What data is stored under what key
 *  - When two queries share cache vs. have separate entries
 *  - What gets invalidated when you call invalidateQueries
 *  - What refetches when key values change
 *
 * RULE: Think of query keys like dependency arrays in useEffect.
 * Any variable used inside queryFn should be in the queryKey.
 */

import { useQuery } from "@tanstack/react-query";

// ─── 1. Simple keys ──────────────────────────────────────────────────────────

// Global data with no parameters
const globalQuery = { queryKey: ["posts"] };
const userQuery   = { queryKey: ["users"] };

// ─── 2. Variable keys (the most common pattern) ──────────────────────────────
//
// When the key changes, React Query treats it as a NEW query.
// The old data is kept in cache (for gcTime), the new key triggers a fresh fetch.

function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],      // ["post", 1], ["post", 2] → separate cache entries
    queryFn: () => fetch(`/api/posts/${id}`).then(r => r.json()),
  });
}

function useUserPosts(userId: number, filters: { status: string }) {
  return useQuery({
    // Include EVERYTHING that affects the fetch result in the key
    queryKey: ["posts", { userId, ...filters }],
    queryFn: () =>
      fetch(`/api/posts?userId=${userId}&status=${filters.status}`)
        .then(r => r.json()),
  });
}

// ─── 3. Hierarchical keys (critical for invalidation) ────────────────────────
//
// React Query's invalidateQueries uses PREFIX MATCHING.
// invalidateQueries({ queryKey: ["posts"] }) will invalidate:
//   ✅ ["posts"]
//   ✅ ["posts", 1]
//   ✅ ["posts", { userId: 5 }]
//   ✅ ["posts", "list", { page: 2 }]
//   ❌ ["post", 1]     ← different first segment

const queryKeys = {
  // Scope → Entity → Identifier → Params
  all:     ()                          => ["posts"]                    as const,
  lists:   ()                          => ["posts", "list"]            as const,
  list:    (filters: object)           => ["posts", "list", filters]   as const,
  details: ()                          => ["posts", "detail"]          as const,
  detail:  (id: number)                => ["posts", "detail", id]      as const,
};

// Usage:
// useQuery({ queryKey: queryKeys.detail(5), queryFn: ... })
// queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
//   → invalidates all list queries but NOT detail queries

// ─── 4. Object keys ──────────────────────────────────────────────────────────
//
// Objects in query keys are deep-compared. Order DOES NOT matter.
// { page: 1, limit: 10 } === { limit: 10, page: 1 } → same cache entry

function usePaginatedPosts(page: number, limit: number, sort: string) {
  return useQuery({
    queryKey: ["posts", "list", { page, limit, sort }],
    queryFn: () =>
      fetch(`/api/posts?page=${page}&limit=${limit}&sort=${sort}`)
        .then(r => r.json()),
  });
}

// ─── 5. Factory pattern (best practice for large apps) ───────────────────────

export const postKeys = {
  all:     () => ["posts"]                          as const,
  lists:   () => [...postKeys.all(), "list"]        as const,
  list:    (f: object) => [...postKeys.lists(), f]  as const,
  details: () => [...postKeys.all(), "detail"]      as const,
  detail:  (id: number) => [...postKeys.details(), id] as const,
};

export const userKeys = {
  all:    () => ["users"]                             as const,
  detail: (id: number) => ["users", "detail", id]    as const,
  posts:  (id: number) => ["users", id, "posts"]      as const,
};

// ─── INTERVIEW QUESTIONS ──────────────────────────────────────────────────────
//
// Q: What happens when a query key changes?
// A: React Query cancels/ignores the old query, starts a new one with the new key.
//    Old data stays in cache for gcTime. This is how you implement "watch a variable."
//
// Q: How does invalidateQueries match keys?
// A: By default it does partial/prefix matching. ["posts"] invalidates all keys
//    starting with "posts". Use `exact: true` for exact matching only.
//
// Q: Why use arrays instead of strings?
// A: Arrays allow partial matching for invalidation. "posts" as a string would
//    only match exactly "posts", not ["posts", 1] etc.
//
// Q: What is a query key factory?
// A: A plain object with functions that return arrays — centralises key management,
//    prevents typos, and makes invalidation predictable across the codebase.
