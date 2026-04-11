/**
 * 02-queries/03-dependent-queries.tsx
 * 02-queries/04-parallel-queries.tsx
 *
 * CONCEPT: Dependent (sequential) queries and parallel queries
 */

import { useQuery, useQueries } from "@tanstack/react-query";

// ═══════════════════════════════════════════════════════════════════════════
// DEPENDENT QUERIES — run query B only when query A has data
// ═══════════════════════════════════════════════════════════════════════════

interface User { id: string; teamId: string; name: string; }
interface Team { id: string; name: string; members: string[]; }

// Pattern: enabled flag + nullish coalescing
function useUserAndTeam(userId: string) {
  // Step 1: fetch the user
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: (): Promise<User> =>
      fetch(`/api/users/${userId}`).then(r => r.json()),
  });

  // Step 2: only fetch the team once we have the user's teamId
  const teamQuery = useQuery({
    queryKey: ["team", userQuery.data?.teamId],
    queryFn: (): Promise<Team> =>
      fetch(`/api/teams/${userQuery.data!.teamId}`).then(r => r.json()),

    // ← The key line: don't run until userQuery has data
    enabled: !!userQuery.data?.teamId,
  });

  return { userQuery, teamQuery };
}

export function UserProfile({ userId }: { userId: string }) {
  const { userQuery, teamQuery } = useUserAndTeam(userId);

  if (userQuery.isPending) return <div>Loading user...</div>;
  if (userQuery.isError)   return <div>User not found</div>;

  return (
    <div>
      <h1>{userQuery.data.name}</h1>
      {teamQuery.isPending
        ? <p>Loading team...</p>
        : <p>Team: {teamQuery.data?.name}</p>
      }
    </div>
  );
}

// ─── Multi-step chain (3 dependent queries) ──────────────────────────────────

function useOrderWithShipping(orderId: string) {
  const orderQuery = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetch(`/api/orders/${orderId}`).then(r => r.json()),
  });

  const addressQuery = useQuery({
    queryKey: ["address", orderQuery.data?.addressId],
    queryFn: () =>
      fetch(`/api/addresses/${orderQuery.data!.addressId}`).then(r => r.json()),
    enabled: !!orderQuery.data?.addressId,
  });

  const shippingQuery = useQuery({
    queryKey: ["shipping", addressQuery.data?.zipCode],
    queryFn: () =>
      fetch(`/api/shipping-rates?zip=${addressQuery.data!.zipCode}`)
        .then(r => r.json()),
    enabled: !!addressQuery.data?.zipCode,
  });

  return { orderQuery, addressQuery, shippingQuery };
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLEL QUERIES — run multiple independent queries simultaneously
// ═══════════════════════════════════════════════════════════════════════════

// ─── Static parallel (known at compile time) ──────────────────────────────────
//  Just call useQuery multiple times. React Query runs them in parallel.

export function Dashboard() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
  });

  const statsQuery = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetch("/api/stats").then(r => r.json()),
  });

  const isLoading = postsQuery.isPending || usersQuery.isPending || statsQuery.isPending;

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <p>Posts: {postsQuery.data?.length}</p>
      <p>Users: {usersQuery.data?.length}</p>
    </div>
  );
}

// ─── Dynamic parallel with useQueries ────────────────────────────────────────
//  When you have an ARRAY of ids and need a query per id.
//  Can't use a loop with useQuery (rules of hooks), use useQueries instead.

export function PostsList({ postIds }: { postIds: number[] }) {
  const postQueries = useQueries({
    queries: postIds.map((id) => ({
      queryKey: ["post", id],
      queryFn: () => fetch(`/api/posts/${id}`).then(r => r.json()),
      staleTime: 60_000,
    })),
    // v5 feature: combine the results into a single value
    combine: (results) => ({
      data: results.map(r => r.data),
      isLoading: results.some(r => r.isPending),
      isError: results.some(r => r.isError),
    }),
  });

  if (postQueries.isLoading) return <div>Loading posts...</div>;

  return (
    <ul>
      {postQueries.data.map((post, i) => (
        <li key={postIds[i]}>{post?.title}</li>
      ))}
    </ul>
  );
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: How do you implement dependent queries?
// A: Use the `enabled` option. Set it to a boolean expression that evaluates
//    the dependency's data. The dependent query won't run until enabled is true.
//
// Q: What is useQueries for?
// A: For a dynamic number of parallel queries (e.g., fetching N items by ID).
//    You can't call useQuery in a loop because of Rules of Hooks.
//
// Q: What does the `combine` option in useQueries do?
// A: It lets you reduce the array of query results into a single merged value,
//    avoiding repetitive spread patterns in your component.
