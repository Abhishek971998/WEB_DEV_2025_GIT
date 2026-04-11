# React Query — Interview Questions & Answers

30 questions from beginner to advanced. Every important concept is covered.

---

## Fundamentals

**Q1: What problem does React Query solve?**

React Query is a server state management library. It solves the problems that come with fetching, caching, synchronizing, and updating asynchronous data in React applications.

Without React Query you end up writing complex `useEffect` + `useState` combinations for loading states, error handling, deduplication, background refetching, and stale data. React Query handles all of this with minimal boilerplate.

The key insight: *server state* (data that lives on a remote server) is fundamentally different from *client state* (UI state). React Query is purpose-built for server state.

---

**Q2: What is a QueryClient and where should it be created?**

`QueryClient` is the core class that manages:
- The cache (all server state lives here)
- Default configuration for every query and mutation
- Background refetch scheduling

It should be created **outside** any React component so it isn't recreated on every render. A single instance persists for the entire app lifetime. Pass it to `QueryClientProvider` at the root.

```tsx
// ✅ Correct — outside component
const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}><App /></QueryClientProvider>;
}
```

---

**Q3: What are the three required/common options for useQuery?**

```ts
useQuery({
  queryKey: ["posts"],              // Cache key (array)
  queryFn: () => fetchPosts(),      // Async function returning data
  staleTime: 60_000,                // Optional: how long data is fresh
})
```

`queryKey` and `queryFn` are the only required options.

---

**Q4: What do the status values mean?**

| Status | Meaning |
|--------|---------|
| `pending` | No data yet, first fetch hasn't completed |
| `success` | Data is available |
| `error` | All retries failed, no data |

`isFetching` is separate from `status` — it's true whenever a network request is in flight, including background refetches when `status === 'success'`.

---

**Q5: What is the difference between `isPending` and `isLoading`?**

In v5, `isPending` = `status === 'pending'` (no data at all).
`isLoading` = `isPending && isFetching` (pending AND fetching right now).
They're the same in practice for most queries, but differ when `enabled: false` (isPending is true but isFetching is false).

---

## Caching

**Q6: What is the difference between `staleTime` and `gcTime`?**

- **`staleTime`** (default: `0`): How long data is considered "fresh". During this window, React Query will NOT refetch even on window focus or component remount.
- **`gcTime`** (default: `5 minutes`, was `cacheTime` in v4): How long *inactive* (unmounted) cache entries are kept in memory before garbage collection.

They're independent. You can have data that's fresh for 10 minutes (`staleTime: 600_000`) but evicted from memory after 1 minute of inactivity (`gcTime: 60_000`).

---

**Q7: What was `cacheTime` renamed to and why?**

`cacheTime` was renamed to `gcTime` in React Query v5. The old name was misleading — it made people think it controlled how long data is cached (it doesn't; that's `staleTime`). `gcTime` (garbage collection time) more accurately describes that it controls memory eviction of *inactive* entries.

---

**Q8: When does React Query refetch data?**

By default, React Query refetches when:
1. Component mounts and data is stale (`refetchOnMount: true`)
2. Window regains focus (`refetchOnWindowFocus: true`)
3. Network reconnects (`refetchOnReconnect: true`)
4. You call `refetch()` manually
5. You call `invalidateQueries()`
6. The query key changes

None of these apply during the `staleTime` window — fresh data is never refetched.

---

**Q9: What happens when two components use the same query key?**

They share the same cache entry and the same in-flight network request. React Query deduplicates: if both mount at the same time, only ONE request goes out. Both components get the same data from the same cache entry. This is one of the biggest benefits over a plain `useEffect` approach.

---

**Q10: What is the difference between `invalidateQueries`, `removeQueries`, and `resetQueries`?**

| Method | Effect on cache | Triggers refetch? | Shows old data while refetching? |
|--------|----------------|------------------|----------------------------------|
| `invalidateQueries` | Marks as stale | Yes (if active) | ✅ Yes |
| `removeQueries` | Deletes entry | On next mount | ❌ No (shows loading) |
| `resetQueries` | Back to initial state | Yes (if active) | Only if `initialData` set |

Use `invalidateQueries` most of the time. Use `removeQueries` on logout or when data absolutely must not be shown again.

---

## Query Keys

**Q11: Why are query keys arrays instead of strings?**

Arrays enable **prefix matching** in `invalidateQueries`. `["posts"]` will invalidate `["posts"]`, `["posts", 1]`, `["posts", "list", { page: 2 }]`, etc. This makes hierarchical invalidation trivial.

With a string `"posts"`, you can only match exactly `"posts"`.

---

**Q12: What is a query key factory and why use one?**

A query key factory is an object of functions that return query key arrays:

```ts
const postKeys = {
  all:    () => ["posts"],
  lists:  () => ["posts", "list"],
  detail: (id: number) => ["posts", "detail", id],
};
```

Benefits: single source of truth for key shapes, prevents typos, makes invalidation patterns predictable. Rename a key in one place and it updates everywhere.

---

**Q13: What variables should be in the query key?**

**Rule: Everything used inside `queryFn` that affects the result must be in the key.**

This is the same mental model as `useEffect` dependencies. If you filter by `userId` in the fetch URL, `userId` must be in the key. Otherwise different values reuse the same cache entry.

---

## Mutations

**Q14: What is the difference between `useQuery` and `useMutation`?**

| | `useQuery` | `useMutation` |
|---|---|---|
| Purpose | Read server data | Write (create/update/delete) |
| Runs | Automatically on mount | Manually via `mutate()` |
| Cached | Yes, by query key | No |
| Status starts at | `pending` | `idle` |
| Background runs | Yes (refetchOnFocus etc.) | Never |

---

**Q15: What is the difference between `mutate` and `mutateAsync`?**

- `mutate(variables)`: Fire and forget. Errors are handled by `onError` callback. Does not throw to the calling code.
- `mutateAsync(variables)`: Returns a `Promise`. You can `await` it and use `try/catch`. The error still goes to `onError` AND bubbles to the caller.

Use `mutateAsync` when you need to chain operations or show conditional UI after the mutation.

---

**Q16: What does `onMutate`, `onSuccess`, `onError`, `onSettled` do?**

```
onMutate   → Before mutationFn fires. For optimistic updates + returning context.
onSuccess  → After mutationFn resolves. Receives (data, variables, context).
onError    → After mutationFn throws. Receives (error, variables, context).
onSettled  → After both success and error. Like a finally block.
```

`context` is whatever `onMutate` returns — it's how you pass the rollback snapshot to `onError`.

---

## Optimistic Updates

**Q17: What is the optimistic update pattern and why use it?**

Immediately update the cache to reflect the expected result of a mutation, before the server responds. If the server fails, roll back. This makes the UI feel instant.

The pattern:
1. `onMutate`: snapshot cache → update cache → return snapshot as context
2. `onError`: restore snapshot
3. `onSettled`: invalidate to sync with server truth

---

**Q18: Why do you `cancelQueries` in `onMutate`?**

To prevent a racing background refetch from overwriting your optimistic update. If a refetch lands AFTER your optimistic write but BEFORE the mutation response, it would revert the UI to the old server state. `cancelQueries` cancels any in-flight requests for that key.

---

**Q19: Why invalidate in `onSettled` rather than `onSuccess`?**

`onSettled` fires after BOTH success and error. After a failed mutation, you've already rolled back the optimistic update — but you still want to refetch to confirm the server is in the correct state. If you only invalidated in `onSuccess`, a failed mutation would leave you with potentially stale rolled-back data.

---

## Dependent & Parallel Queries

**Q20: How do you implement dependent (sequential) queries?**

Use the `enabled` flag:

```ts
const userQuery = useQuery({ queryKey: ["user", id], queryFn: ... });

const teamQuery = useQuery({
  queryKey: ["team", userQuery.data?.teamId],
  queryFn: () => fetchTeam(userQuery.data!.teamId),
  enabled: !!userQuery.data?.teamId,  // ← Only runs when teamId exists
});
```

---

**Q21: How do you run a dynamic number of parallel queries?**

Use `useQueries`:

```ts
const queries = useQueries({
  queries: ids.map(id => ({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
  })),
  combine: (results) => ({
    data: results.map(r => r.data),
    isLoading: results.some(r => r.isPending),
  }),
});
```

You can't call `useQuery` in a loop — it violates Rules of Hooks.

---

## Infinite Queries

**Q22: How does useInfiniteQuery work?**

It's like `useQuery` but stores an array of pages. `data.pages` is the array. `fetchNextPage()` fetches the next page using the cursor returned by `getNextPageParam`. `hasNextPage` is `false` when `getNextPageParam` returns `undefined`.

```ts
useInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  initialPageParam: undefined,
})
```

---

**Q23: What happens when an infinite query refetches?**

It refetches ALL pages in sequence (not just the first). It uses the stored `pageParams` to reconstruct each page in order. This ensures the entire list is consistent with the server.

---

## Advanced

**Q24: What does the `select` option do and why is it good for performance?**

`select` transforms the cached data before returning it to the component. React Query memoizes the result — if the transformed value hasn't changed, the component doesn't re-render.

```ts
// This component only re-renders when the name changes, not email/role
useQuery({
  queryKey: ["user", id],
  queryFn: fetchUser,
  select: (user) => user.name,
})
```

You can have multiple components subscribed to the same cache entry with different `select` transformations. Each updates independently.

---

**Q25: What is Suspense mode in React Query and how do you use it?**

`useSuspenseQuery` (v5) suspends the component while loading (throws a Promise) and throws to an ErrorBoundary on failure. The component always receives defined `data`. You never need `isPending`/`isError` checks. Requires `<Suspense>` + `<ErrorBoundary>` above.

```tsx
const { data } = useSuspenseQuery({ queryKey: [...], queryFn: ... });
// data is always defined here — TypeScript knows it
```

---

**Q26: What is `prefetchQuery` vs `ensureQueryData`?**

- `prefetchQuery`: Returns `void`, never throws. Fire and forget. Use for hover/background prefetching.
- `ensureQueryData`: Returns the data, throws on failure. Use in router loaders where data is required before render.

---

**Q27: What is `queryOptions()` and why use it?**

A v5 helper that creates a typed options object you can share between `useQuery`, `prefetchQuery`, `ensureQueryData`, etc. without losing TypeScript inference.

```ts
const postOptions = (id: number) => queryOptions({
  queryKey: ["post", id],
  queryFn: () => fetchPost(id),
});

// Same config, full type safety:
useQuery(postOptions(5));
queryClient.prefetchQuery(postOptions(5));
queryClient.ensureQueryData(postOptions(5)); // in loader
```

---

**Q28: What is the network mode and what are the three options?**

Controls query/mutation behavior when offline:
- `'online'` (default): pauses when offline, resumes on reconnect
- `'always'`: runs regardless of network status
- `'offlineFirst'`: tries once, then pauses if offline prevents it

Mutations with `'online'` mode are queued when offline and auto-resume — this gives you a simple offline mutation queue for free.

---

**Q29: How do you implement a global error handler for all queries?**

Use `QueryCache` and `MutationCache` callbacks when creating `QueryClient`:

```ts
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // query.state.data !== undefined → background refetch failure
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(error.message),
  }),
});
```

---

**Q30: What is the difference between v4 and v5 React Query?**

| v4 | v5 |
|---|---|
| `cacheTime` | `gcTime` |
| `useQuery({ onSuccess, onError })` | Callbacks removed from useQuery — use `QueryCache` instead |
| `keepPreviousData: true` option | `placeholderData: keepPreviousData` (imported function) |
| `status: 'loading'` | `status: 'pending'` |
| No `initialPageParam` | `initialPageParam` required in `useInfiniteQuery` |
| No `queryOptions()` | `queryOptions()` helper added |
| `useSuspenseQuery` in separate import | Built-in |
| `useQueries` without `combine` | `combine` option added |

---

## Bonus: Common Gotchas

- **Query key changes → data is `undefined` briefly**: On key change, React Query immediately switches to the new key (which may have no data). Use `keepPreviousData` / `placeholderData: keepPreviousData` to prevent the loading flash.
- **Objects in query keys**: Order doesn't matter — `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` are the same key.
- **`gcTime < staleTime`**: Don't do this — data could be evicted from cache before it becomes stale, causing unnecessary loading states.
- **Mutations don't refetch automatically**: After a mutation, you must manually `invalidateQueries` or `setQueryData` to update the cache.
- **`enabled: false` ≠ paused**: When `enabled` is false, the query is never subscribed to. It won't run when `enabled` flips to true only if you also call `refetch()`, unless you remove `enabled: false` — the query re-runs automatically when `enabled` becomes truthy.
