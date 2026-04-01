# React Query — Senior-Level Interview Questions

This file extends `07-interview-prep/01-interview-questions.md` with
senior/advanced questions covering SSR, performance, architecture, and testing.

---

## SSR & Hydration

**Q31: Explain the React Query hydration flow end-to-end.**

1. **Server**: Create a new `QueryClient` per request (never share across requests — data leak risk).
2. **Server**: Call `prefetchQuery` / `prefetchInfiniteQuery` for all data the page needs.
3. **Server**: Call `dehydrate(queryClient)` to serialize the cache to a plain JSON-serializable object.
4. **Server → Client**: Pass the dehydrated state as a prop (Pages Router) or via `HydrationBoundary` (App Router).
5. **Client**: `HydrationBoundary` calls `hydrate()` internally, merging the server cache into the client `QueryClient`.
6. **Client**: Components using `useQuery` find data immediately in the cache — no loading state, no extra network request (until `staleTime` expires).

---

**Q32: Why must you create a new QueryClient per server request?**

Module-level variables in Node.js are shared across all requests in the same process. If you reused a single `QueryClient`, User A's data could leak into User B's response — a serious security/privacy issue. `useState(() => new QueryClient())` in the provider component solves this for client components in App Router.

---

**Q33: What is the purpose of `staleTime` in an SSR context?**

Without `staleTime`, data is immediately stale after hydration. On mount, the component would trigger a background refetch — wasting the server prefetch entirely. Setting `staleTime` (e.g., 60 seconds) creates a window where the SSR data is used as-is, preventing the redundant fetch.

---

**Q34: What is `dehydrate` and what does it output?**

`dehydrate(queryClient)` returns a plain JS object `{ queries: [...], mutations: [...] }` containing serialized snapshots of successful query results. It only includes queries in `success` or `error` state — not `pending` ones. This object can be JSON-serialized and sent to the client.

---

## Architecture

**Q35: How would you architect React Query in a large team codebase?**

Layered structure:
1. **API layer** — pure async functions that call the network. No React Query knowledge. Easily testable in isolation.
2. **Query key factory** — centralised key definitions. One factory per domain (postKeys, userKeys).
3. **queryOptions()** — reusable config that works across useQuery, prefetchQuery, ensureQueryData.
4. **Custom hooks** — wrap useQuery/useMutation. One hook per operation. Never expose raw queryKey/queryFn to components.
5. **Components** — call custom hooks only. No knowledge of keys, queryFns, or caching details.

This means changing an API endpoint or cache configuration requires editing exactly one file.

---

**Q36: When would you choose `setQueryData` over `invalidateQueries` after a mutation?**

Use `setQueryData` when:
- You already have the updated data in the mutation response and a refetch is redundant
- You want instant UI update with zero extra network round-trip
- Optimistic updates (you update before the server responds)

Use `invalidateQueries` when:
- The server response doesn't include all the data the UI needs
- A mutation affects many queries (e.g., creating a post affects multiple filtered lists)
- You prefer simplicity over optimal network efficiency
- The server may apply business logic that changes the data in unpredictable ways

Best practice: combine both — `setQueryData` for the detail entry (from mutation response), `invalidateQueries` for list queries.

---

**Q37: How do you handle pagination state with React Query?**

Keep page state in the component (or URL), not inside React Query. React Query's job is caching, not UI state. The pattern:

```
const [page, setPage] = useState(1);
const { data, isPlaceholderData } = useQuery({
  queryKey: ["posts", page],
  queryFn: () => fetchPage(page),
  placeholderData: keepPreviousData,
});
```

`keepPreviousData` shows the old page while the new one loads, preventing layout shifts. Disable the "next" button while `isPlaceholderData` is true to prevent skipping pages.

---

## Performance

**Q38: How does structural sharing work and when would you disable it?**

React Query deep-compares new query results against the previous result. Unchanged sub-objects keep the same reference, so components subscribed to those parts won't re-render (React.memo and useMemo work correctly with stable references).

Disable with `structuralSharing: false` when:
- Your data contains non-serializable values (Dates, Sets, Maps, class instances)
- The deep comparison itself is too expensive (very large payloads)
- You intentionally want every refetch to trigger re-renders

---

**Q39: You have a component that renders 500 list items, each subscribed to the same query. How do you prevent performance issues?**

Three-pronged approach:
1. **Virtualization**: Only render visible rows using `@tanstack/react-virtual`, `react-window`, or Virtuoso. This is the biggest win.
2. **select with memoized selectors**: Each item subscribes to only its slice. `useCallback` on the selector prevents the memoization from being bypassed.
3. **React.memo on list items**: Prevent re-renders when the item's specific data hasn't changed.

---

**Q40: What is `notifyOnChangeProps` and when would you use it?**

An option that tells React Query which properties of the query result to watch for changes. Only those changes trigger a re-render.

```ts
useQuery({ ..., notifyOnChangeProps: ["data"] })
// → Only re-renders when data changes, not isFetching, isStale, etc.
```

In v5, **tracked queries** (the default) does this automatically based on which properties you destructure. So `notifyOnChangeProps` is rarely needed explicitly in v5.

---

## Testing

**Q41: What is the correct way to test a component using React Query?**

Use MSW (Mock Service Worker) to intercept network requests at the fetch level. Wrap the component in a fresh `QueryClientProvider` with `retry: false`. Assert on DOM output, not on React Query's internal state.

**Don't**: Mock `useQuery` or `useMutation` — this tests nothing meaningful.
**Don't**: Use the real network — tests become slow and flaky.
**Do**: Mock the API responses with MSW handlers. Let React Query work as intended.

---

**Q42: How do you test loading and error states?**

Loading state: render the component and immediately check for the loading indicator before `await waitFor()`. React Query will be in `pending` while MSW hasn't responded.

Error state: use `server.use(http.get(..., () => HttpResponse.json({ message: "error" }, { status: 500 })))` to override the handler for that test. Set `retry: false` so the test doesn't wait for 3 retries.

---

**Q43: How do you test optimistic updates?**

1. Render the component.
2. Trigger the mutation.
3. Immediately assert the optimistic state (before MSW responds).
4. Either let the mutation succeed (verify final state) or use `server.use()` to make it fail (verify rollback).

This requires MSW to have some artificial delay or to resolve synchronously — `@msw/jest-fetch-mock` or a manual delay in the handler helps.

---

## Advanced

**Q44: How do QueryObservers work internally?**

`QueryObserver` is the object that bridges a React component and a cache entry. When you call `useQuery`, internally a `QueryObserver` is created. It:
- Subscribes to the cache entry identified by the queryKey
- Triggers re-renders when the subscribed properties change
- Manages the background refetch lifecycle (scheduling, deduplication)
- Is destroyed when the component unmounts

Understanding this explains why two components with the same key share data (same cache entry, two observers) and why deduplication works (the cache entry's refetch is managed centrally, not per-observer).

---

**Q45: How do you implement an "undo" feature with React Query?**

```
1. User deletes a post
2. onMutate: snapshot the old cache, apply optimistic delete, return snapshot
3. Show an "Undo" button for ~5 seconds
4. If Undo clicked: restore from snapshot via setQueryData, cancel the mutation
5. If no Undo: mutation proceeds, onSettled invalidates to sync
```

The trick is that `cancelQueries` only cancels React Query's scheduled refetches, NOT the in-flight `mutationFn`. For true undo, you need either an AbortController in your `mutationFn`, or to delay the actual API call (debounce the mutation) so there's time to cancel before the network request fires.

---

**Q46: What is `broadcastQueryClient` and when would you use it?**

`broadcastQueryClient` is an experimental plugin that synchronizes the React Query cache across browser tabs using the `BroadcastChannel` API. When one tab invalidates a query or updates the cache, all other open tabs receive the change.

Use it when:
- Users typically have multiple tabs open (dashboards, admin tools)
- A mutation in one tab should be immediately reflected in others
- You want cache consistency without polling

---

**Q47: Can React Query replace Redux/Zustand? What's the difference?**

React Query replaces the *server state* slice of Redux — fetching, caching, synchronizing remote data. It does NOT replace Redux/Zustand for *client state* — UI state like modals, form values, selected filters, theme, etc.

Modern stack recommendation:
- React Query → all server state (API data)
- useState / useReducer → local component state
- Zustand / Jotai / Redux → shared client state (global UI state, user preferences)

Using Redux to store API responses is now an antipattern when React Query is available. React Query does it better with less code.

---

## Gotcha Round (rapid-fire)

**Q: Does `invalidateQueries` wait for the refetch to complete?**
A: No. It returns immediately after marking queries stale. The refetch is asynchronous. If you need to wait, use `await queryClient.invalidateQueries(...)` — the Promise resolves when the triggered refetch completes.

**Q: Can you have two `useMutation` hooks for the same operation?**
A: Yes. Unlike `useQuery`, mutations don't have keys, so two `useMutation` hooks for the same `mutationFn` are completely independent — separate status, separate data.

**Q: What does `exact: true` do in `invalidateQueries`?**
A: Disables prefix matching. Only invalidates queries whose key exactly matches the provided key. Without it, `["posts"]` would invalidate `["posts", 1]`, `["posts", "list"]`, etc.

**Q: What happens if `queryFn` returns `undefined`?**
A: React Query v5 throws an error. `queryFn` must return a defined value or throw. Return `null` instead of `undefined` if there's no data.

**Q: Is the `select` function run on every render or only after a fetch?**
A: After every fetch. It's NOT run on re-renders unless the underlying data changes. The result is memoized — same input → same output reference → no re-render.
