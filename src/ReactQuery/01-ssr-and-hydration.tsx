/**
 * 09-nextjs/01-ssr-and-hydration.tsx
 *
 * CONCEPT: Server-Side Rendering (SSR) and Hydration with React Query
 *
 * The problem: On the server, components render once. React Query's
 * automatic refetch, window focus, etc. don't exist. You need to:
 *   1. Prefetch data ON THE SERVER
 *   2. Serialize that cache and send it to the browser
 *   3. Hydrate the client cache from that serialized data
 *   4. Client picks up seamlessly — no loading flash, no double fetch
 *
 * React Query v5 approach: HydrationBoundary + dehydrate/hydrate
 */

// ═══════════════════════════════════════════════════════════════════════════
// APPROACH 1: App Router (Next.js 13+) — Server Components
// ═══════════════════════════════════════════════════════════════════════════

// app/providers.tsx — Client component that wraps the app
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  // useState ensures a FRESH QueryClient per USER SESSION on the server.
  // If you used a module-level variable, all users would share a cache (data leak!).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 min — prevents immediate refetch after hydration
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// app/layout.tsx
// import { ReactQueryProvider } from "./providers";
// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         <ReactQueryProvider>{children}</ReactQueryProvider>
//       </body>
//     </html>
//   );
// }

// ─── Server Component that prefetches ────────────────────────────────────────

import {
  HydrationBoundary,
  QueryClient as QC,
  dehydrate,
} from "@tanstack/react-query";

// app/posts/page.tsx — This is a SERVER component
export async function PostsPage() {
  const queryClient = new QC();

  // Prefetch on the server — runs during SSR
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(r => r.json()),
  });

  // dehydrate() serializes the cache to a plain object
  // HydrationBoundary sends it to the client and hydrates the client cache
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* PostList is a CLIENT component that uses useQuery */}
      {/* It will find the data in the cache immediately — no loading state */}
      {/* <PostList /> */}
    </HydrationBoundary>
  );
}

// app/posts/[id]/page.tsx — Server component for a detail page
export async function PostDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const queryClient = new QC();

  // Prefetch multiple queries at once
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["post", id],
      queryFn: () =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(r => r.json()),
    }),
    queryClient.prefetchQuery({
      queryKey: ["post", id, "comments"],
      queryFn: () =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(r => r.json()),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <PostDetail id={id} /> */}
    </HydrationBoundary>
  );
}

// ─── Client component that consumes the hydrated cache ───────────────────────

// app/posts/_components/PostList.tsx
"use client";

import { useQuery } from "@tanstack/react-query";

export function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    // staleTime should be > 0 to prevent immediate refetch after hydration
    staleTime: 60_000,
  });

  // On first render: data is already in cache from server prefetch — no spinner
  // After staleTime: refetches in background to keep data fresh
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {posts?.map((p: any) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APPROACH 2: Pages Router (Next.js 12 and older) — getServerSideProps
// ═══════════════════════════════════════════════════════════════════════════

import { GetServerSideProps } from "next";

// pages/posts/index.tsx

interface PageProps {
  dehydratedState: unknown;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QC();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
  });

  return {
    props: {
      // Pass the serialized cache to the page component
      dehydratedState: dehydrate(queryClient),
    },
  };
};

import { Hydrate } from "@tanstack/react-query"; // Pages router uses Hydrate

export default function PostsPageLegacy({ dehydratedState }: PageProps) {
  return (
    // Hydrate deserializes dehydratedState into the client QueryClient
    <Hydrate state={dehydratedState}>
      {/* <PostList /> */}
    </Hydrate>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APPROACH 3: React Router v6.4+ with loaders
// ═══════════════════════════════════════════════════════════════════════════

import { QueryClient, queryOptions } from "@tanstack/react-query";

const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetch("/api/posts").then(r => r.json()),
  staleTime: 60_000,
});

// Define loader outside the component
export function createPostsLoader(qc: QueryClient) {
  return async () => {
    // ensureQueryData: returns from cache if fresh, fetches if stale/absent
    await qc.ensureQueryData(postsQueryOptions);
    return null;
  };
}

// In router:
// {
//   path: "/posts",
//   loader: createPostsLoader(queryClient),
//   element: <PostsRoute />,
// }

export function PostsRoute() {
  // Data is guaranteed to be in cache when this renders
  const { data: posts } = useQuery(postsQueryOptions);
  return <ul>{posts?.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: How does React Query hydration work?
// A: On the server, you prefetch queries into a QueryClient, then call dehydrate()
//    to serialize the cache to JSON. That JSON is sent to the client inside
//    HydrationBoundary. On the client, React Query merges it into the client
//    QueryClient so components find data immediately without a loading state.
//
// Q: Why create a new QueryClient per request on the server?
// A: Sharing a module-level QueryClient across requests would mix different
//    users' data (a security/privacy issue). Each request needs its own isolated cache.
//
// Q: Why set a staleTime when using SSR?
// A: Without staleTime, data is immediately stale after hydration. The component
//    would trigger a background refetch on mount — meaning you did the server
//    prefetch for nothing. A staleTime of 60s prevents the immediate refetch.
//
// Q: What is the difference between dehydrate and hydrate?
// A: dehydrate() runs on the server — converts the cache to a plain serializable
//    object. hydrate() runs on the client — merges that object back into the
//    client QueryClient. HydrationBoundary does the hydration automatically.
//
// Q: What is the difference between prefetchQuery and ensureQueryData in loaders?
// A: prefetchQuery: returns void, won't throw. For optional prefetching.
//    ensureQueryData: returns the data, throws on error. For required data that
//    must exist before the page renders (like a loader needs it).
