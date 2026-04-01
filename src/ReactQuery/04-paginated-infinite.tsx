/**
 * 02-queries/04-paginated-infinite.tsx
 *
 * CONCEPT: useInfiniteQuery — infinite scroll / load more
 *
 * useInfiniteQuery is like useQuery but manages MULTIPLE pages of data.
 * Each page is fetched with getNextPageParam, and all pages are kept in cache.
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback, useEffect } from "react";

interface Post  { id: number; title: string; body: string; }
interface Page  { posts: Post[]; nextCursor: string | null; total: number; }

// ─── API function ─────────────────────────────────────────────────────────────

async function fetchPosts(cursor?: string): Promise<Page> {
  const url = cursor
    ? `/api/posts?cursor=${cursor}&limit=10`
    : `/api/posts?limit=10`;
  const res = await fetch(url);
  return res.json();
}

// ─── Basic infinite query ─────────────────────────────────────────────────────

export function InfinitePostList() {
  const {
    data,                  // { pages: Page[], pageParams: unknown[] }
    fetchNextPage,         // () => void — trigger next page fetch
    fetchPreviousPage,     // () => void — for bi-directional lists
    hasNextPage,           // boolean — true when getNextPageParam returns non-undefined
    hasPreviousPage,
    isFetchingNextPage,    // true while next page is loading
    isFetchingPreviousPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam as string | undefined),

    // Called after each page fetch. Return the next cursor, or undefined to stop.
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    // Where to start (optional — first call gets undefined as pageParam by default)
    initialPageParam: undefined as string | undefined,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError)   return <div>Error: {error.message}</div>;

  // data.pages is an array of Page objects
  // Flatten all pages into a single list of posts
  const allPosts = data.pages.flatMap(page => page.posts);

  return (
    <div>
      <ul>
        {allPosts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>
    </div>
  );
}

// ─── Auto-scroll with IntersectionObserver ────────────────────────────────────
//
//  The real-world pattern: automatically fetch the next page when the user
//  scrolls to the bottom sentinel element.

export function AutoScrollPostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam as string),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });

  // Ref on a sentinel div at the bottom of the list
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px", // Trigger 200px before the element is visible
    });

    observer.observe(sentinel);
    return () => observer.unobserve(sentinel);
  }, [handleObserver]);

  if (isPending) return <div>Loading...</div>;

  const allPosts = data.pages.flatMap(p => p.posts);

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      <ul>
        {allPosts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {/* Sentinel — when this enters the viewport, fetch next page */}
      <div ref={sentinelRef} style={{ height: "1px" }} />

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>No more posts.</p>}
    </div>
  );
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: How is useInfiniteQuery different from useQuery?
// A: useInfiniteQuery stores multiple pages of data. data.pages is an array
//    of page results. You call fetchNextPage() to load more. useQuery stores
//    a single result and replaces it on refetch.
//
// Q: How does React Query know if there's a next page?
// A: From getNextPageParam. If it returns undefined/null, hasNextPage is false.
//    Otherwise hasNextPage is true and fetchNextPage will call queryFn with
//    the returned value as pageParam.
//
// Q: What happens when an infinite query refetches?
// A: It refetches ALL pages in order (not just the first one). Each page is
//    re-fetched sequentially using the stored pageParams.
//
// Q: What is initialPageParam?
// A: Required in v5. Sets the pageParam value for the very first page fetch.
//    Previously, the first call always received undefined as pageParam.
