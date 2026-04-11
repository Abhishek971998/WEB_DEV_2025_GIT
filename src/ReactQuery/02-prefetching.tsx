/**
 * 04-caching/02-prefetching.tsx
 *
 * CONCEPT: Prefetching — load data before the user needs it
 *
 * Prefetching puts data into the cache BEFORE a component mounts.
 * When the component renders, it finds fresh data immediately — no loading state.
 *
 * Common patterns:
 *  - Hover-to-prefetch navigation links
 *  - Prefetch next page in a pagination flow
 *  - Prefetch on route transition
 *  - Prefetch in a server component (Next.js / Remix)
 */

import {
  useQueryClient,
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

const fetchPost = (id: number) =>
  fetch(`/api/posts/${id}`).then(r => r.json());

// ─── 1. Prefetch on hover ─────────────────────────────────────────────────────
//
//  On hover, we start fetching. By the time the user clicks, data is ready.
//  If the data is already fresh (within staleTime), prefetch is a no-op.

export function PostLink({ id, title }: { id: number; title: string }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["post", id],
      queryFn: () => fetchPost(id),
      staleTime: 60_000,  // Don't prefetch if data is less than 1 min old
    });
  }, [id, queryClient]);

  return (
    <a href={`/posts/${id}`} onMouseEnter={handleMouseEnter}>
      {title}
    </a>
  );
}

// ─── 2. Prefetch next page in a pagination flow ──────────────────────────────

const fetchPostsPage = (page: number) =>
  fetch(`/api/posts?page=${page}`).then(r => r.json());

export function PaginatedPosts() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);

  const { data } = useQuery({
    queryKey: ["posts", "page", page],
    queryFn: () => fetchPostsPage(page),
    staleTime: 30_000,
  });

  // Prefetch the NEXT page whenever the current page loads
  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["posts", "page", page + 1],
      queryFn: () => fetchPostsPage(page + 1),
      staleTime: 30_000,
    });
  }, [page, queryClient]);

  return (
    <div>
      {data?.posts.map((p: any) => <div key={p.id}>{p.title}</div>)}
      <button onClick={() => setPage(p => p + 1)}>
        Next Page (already loading!)
      </button>
    </div>
  );
}

// ─── 3. Prefetch on route enter (React Router loader) ────────────────────────
//
//  With React Router v6.4+ loaders, you can prefetch before the component renders.

export function postLoader(queryClient: QueryClient) {
  return async ({ params }: { params: { id: string } }) => {
    const id = parseInt(params.id);

    // Only fetch if not already in cache (or stale)
    await queryClient.ensureQueryData({
      queryKey: ["post", id],
      queryFn: () => fetchPost(id),
      staleTime: 60_000,
    });

    return null; // loader must return something
  };
}

// In your router:
// {
//   path: "/posts/:id",
//   loader: postLoader(queryClient),
//   element: <PostDetail />,
// }

// ─── ensureQueryData vs prefetchQuery ────────────────────────────────────────
//
//  prefetchQuery   → Fires and forgets. Returns void. Never throws.
//                    Use when prefetching is optional (hover, background).
//
//  ensureQueryData → Returns the data. Throws on error.
//                    Use in loaders where you NEED the data before rendering.

// ─── 4. Prefetch in useEffect on mount ───────────────────────────────────────

import React from "react";

export function PostsListWithPrefetch() {
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
  });

  // After the list loads, prefetch the first 5 post details
  React.useEffect(() => {
    if (!posts) return;
    posts.slice(0, 5).forEach((post: any) => {
      queryClient.prefetchQuery({
        queryKey: ["post", post.id],
        queryFn: () => fetchPost(post.id),
        staleTime: 60_000,
      });
    });
  }, [posts, queryClient]);

  return (
    <ul>
      {posts?.map((p: any) => (
        <PostLink key={p.id} id={p.id} title={p.title} />
      ))}
    </ul>
  );
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: What is prefetching in React Query?
// A: Loading data into the cache before the component that needs it renders.
//    When that component mounts, it finds fresh data and shows no loading state.
//
// Q: What is the difference between prefetchQuery and ensureQueryData?
// A: prefetchQuery returns void and never throws — fire and forget.
//    ensureQueryData returns the data and throws on failure — use in loaders.
//
// Q: Will prefetchQuery refetch if data is already in cache?
// A: Only if the cached data is stale. The staleTime option in prefetchQuery
//    controls this — pass the same value you use in the consuming component.
//
// Q: What is a good use case for hover prefetching?
// A: Navigation links. When a user hovers over a link, there's ~200-300ms
//    before they click. Starting the fetch on hover often means data is ready
//    by the time the new page renders.
