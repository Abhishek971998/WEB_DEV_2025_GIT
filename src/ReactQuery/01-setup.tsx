/**
 * 01-basics/01-setup.tsx
 *
 * CONCEPT: QueryClient & QueryClientProvider
 *
 * QueryClient is the core of React Query. It manages:
 *  - The cache (all your server state lives here)
 *  - Default configuration for every query/mutation
 *  - Background refetch scheduling
 *
 * QueryClientProvider makes the client available via context
 * to every component in the tree.
 */

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

// ─── 1. Create the client (do this OUTSIDE the component) ───────────────────
//
// Creating it inside a component would recreate the cache on every render.
// All global defaults live here.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long (ms) data is considered "fresh". During this window, React
      // Query will NOT refetch the data even if the component remounts.
      // Default: 0 (always stale → always refetches on mount)
      staleTime: 1000 * 60 * 5, // 5 minutes

      // How long (ms) unused/inactive cache entries are kept in memory before
      // being garbage collected. Formerly called `cacheTime` in v4.
      // Default: 1000 * 60 * 5 (5 minutes)
      gcTime: 1000 * 60 * 10, // 10 minutes

      // How many times to retry a failed query before showing an error.
      // Default: 3
      retry: 2,

      // Retry delay: exponential backoff capped at 30s (React Query default)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),

      // Refetch when the browser window regains focus.
      // Default: true
      refetchOnWindowFocus: true,

      // Refetch when a component mounts and data is stale.
      // Default: true
      refetchOnMount: true,

      // Refetch when the network reconnects.
      // Default: true
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once by default.
      retry: 1,
    },
  },
});

// ─── 2. Wrap your app ───────────────────────────────────────────────────────

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your entire app goes here */}
      <YourAppRoutes />

      {/*
       * DevTools: Only renders in development (checks process.env.NODE_ENV).
       * Place it anywhere inside the provider — bottom of the tree is clean.
       * Shows every query: status, data, staleTime, gcTime countdowns.
       */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function YourAppRoutes() {
  return <div>Your app here</div>;
}

// ─── 3. Accessing the client imperatively (outside React) ───────────────────
//
// Sometimes you need to interact with the cache outside React components
// (e.g., in an axios interceptor, a service layer, or after a login).

export function imperativeExample() {
  // Prefetch a query before any component renders
  queryClient.prefetchQuery({
    queryKey: ["user", 1],
    queryFn: () => fetch("/api/users/1").then((r) => r.json()),
  });

  // Clear the entire cache (e.g., on logout)
  queryClient.clear();

  // Invalidate everything matching a key prefix
  queryClient.invalidateQueries({ queryKey: ["user"] });
}
