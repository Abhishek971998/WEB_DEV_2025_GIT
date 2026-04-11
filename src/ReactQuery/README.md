# React Query Masterclass

A complete, copy-paste-ready guide from basics to advanced concepts.
Every file is a standalone example you can drop into your repo.

## Module Structure

```
react-query-masterclass/
├── 01-basics/
│   ├── 01-setup.tsx                  # QueryClient setup & providers
│   └── 02-first-query.tsx            # Your first useQuery
├── 02-queries/
│   ├── 01-query-keys.tsx             # Key strategies (critical for interviews)
│   ├── 02-query-options.tsx          # staleTime, gcTime, retry, refetch
│   ├── 03-dependent-queries.tsx      # Sequential queries with enabled flag
│   ├── 04-parallel-queries.tsx       # Multiple queries at once
│   └── 05-paginated-infinite.tsx     # Pagination & infinite scroll
├── 03-mutations/
│   ├── 01-basic-mutation.tsx         # useMutation fundamentals
│   ├── 02-optimistic-updates.tsx     # Instant UI feedback
│   └── 03-mutation-side-effects.tsx  # onSuccess, onError, onSettled
├── 04-caching/
│   ├── 01-cache-mechanics.tsx        # How the cache actually works
│   ├── 02-invalidation.tsx           # When & how to invalidate
│   └── 03-prefetching.tsx            # Prefetch on hover/route
├── 05-advanced/
│   ├── 01-query-client-usage.tsx     # Imperative cache manipulation
│   ├── 02-select-transform.tsx       # select option for transforms
│   ├── 03-suspense-mode.tsx          # React Suspense integration
│   └── 04-devtools.tsx               # ReactQueryDevtools setup
├── 06-patterns/
│   ├── 01-custom-hooks.tsx           # Real-world custom hook patterns
│   ├── 02-global-error-handling.tsx  # Centralized error boundaries
│   └── 03-offline-support.tsx        # Network mode & persistence
└── 07-interview-prep/
    └── 01-interview-questions.md     # 30 most important Q&A
```

## Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

## Quick Concept Reference

| Concept | What it does |
|---|---|
| `useQuery` | Fetch & cache server state |
| `useMutation` | Create/update/delete server data |
| `useQueryClient` | Access cache imperatively |
| `staleTime` | How long data is considered fresh |
| `gcTime` | How long unused cache lives (was `cacheTime` in v4) |
| `invalidateQueries` | Mark cache as stale → trigger refetch |
| `setQueryData` | Write to cache directly |
| `prefetchQuery` | Fetch before user navigates |
| `enabled` | Conditionally run a query |
| `select` | Transform/subscribe to a subset of data |
