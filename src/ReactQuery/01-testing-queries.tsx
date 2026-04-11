/**
 * 08-testing/01-testing-queries.tsx
 *
 * CONCEPT: Testing React Query — queries, mutations, and custom hooks
 *
 * Stack: Vitest (or Jest) + React Testing Library + MSW (Mock Service Worker)
 *
 * The golden rule: DON'T mock React Query itself.
 * Mock the NETWORK layer (via MSW) and let React Query work normally.
 * This tests your real hooks, caching logic, and component behaviour.
 */

// ─── Setup: test utilities ────────────────────────────────────────────────────
// File: src/test/utils.tsx

import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Creates a fresh QueryClient per test with:
 *  - retry: false   → fail fast, no exponential backoff in tests
 *  - gcTime: Infinity → don't garbage collect during a test
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,        // Don't retry on failure — tests run faster
        gcTime: Infinity,    // Keep cache alive for the test duration
        staleTime: 0,        // Always consider stale so refetch behaviour is predictable
      },
      mutations: {
        retry: false,
      },
    },
    // Silence React Query's error logging in tests
    // (remove if you want to see query errors in test output)
    // logger: { log: () => {}, warn: () => {}, error: () => {} },
  });
}

interface WrapperProps { children: React.ReactNode; }

/**
 * Custom render function that wraps components in a fresh QueryClientProvider.
 * Use this instead of RTL's render() for any component using React Query.
 */
export function renderWithQueryClient(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient, // expose so tests can inspect/modify cache
  };
}

// ─── MSW Setup: src/mocks/handlers.ts ────────────────────────────────────────

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/posts", () => {
    return HttpResponse.json([
      { id: 1, title: "Hello World", body: "Content" },
      { id: 2, title: "React Query", body: "Great library" },
    ]);
  }),

  http.get("/api/posts/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    return HttpResponse.json({ id, title: `Post ${id}`, body: "Body" });
  }),

  http.post("/api/posts", async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({ id: 99, ...body }, { status: 201 });
  }),

  http.delete("/api/posts/:id", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

// ─── MSW Setup: src/mocks/server.ts ──────────────────────────────────────────

import { setupServer } from "msw/node";

export const server = setupServer(...handlers);

// src/test/setup.ts (add to vitest.config.ts or jest.setup.ts)
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers()); // reset overrides between tests
// afterAll(() => server.close());

// ─── Tests: PostList component ────────────────────────────────────────────────

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
// import { server } from "./mocks/server";
// import { PostList } from "./PostList";

describe("PostList", () => {
  it("shows loading state then renders posts", async () => {
    const { renderWithQueryClient } = await import("./utils");
    // renderWithQueryClient(<PostList />);

    // Loading state
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data
    // await waitFor(() => {
    //   expect(screen.getByText("Hello World")).toBeInTheDocument();
    //   expect(screen.getByText("React Query")).toBeInTheDocument();
    // });
  });

  it("shows error state when API fails", async () => {
    // Override the handler for this single test
    // server.use(
    //   http.get("/api/posts", () =>
    //     HttpResponse.json({ message: "Server error" }, { status: 500 })
    //   )
    // );

    // renderWithQueryClient(<PostList />);

    // await waitFor(() => {
    //   expect(screen.getByText(/error/i)).toBeInTheDocument();
    // });
  });
});

// ─── Testing custom hooks with renderHook ────────────────────────────────────

import { renderHook, waitFor as waitForHook } from "@testing-library/react";

// The hook we want to test
function usePosts() {
  const { useQuery } = require("@tanstack/react-query");
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
  });
}

export function testCustomHook() {
  // describe("usePosts", () => {
  //   it("fetches and returns posts", async () => {
  //     const queryClient = createTestQueryClient();
  //
  //     const wrapper = ({ children }: WrapperProps) => (
  //       <QueryClientProvider client={queryClient}>
  //         {children}
  //       </QueryClientProvider>
  //     );
  //
  //     const { result } = renderHook(() => usePosts(), { wrapper });
  //
  //     // Initially loading
  //     expect(result.current.isPending).toBe(true);
  //
  //     // Wait for success
  //     await waitForHook(() => {
  //       expect(result.current.isSuccess).toBe(true);
  //     });
  //
  //     expect(result.current.data).toHaveLength(2);
  //     expect(result.current.data[0].title).toBe("Hello World");
  //   });
  // });
}

// ─── Testing mutations ────────────────────────────────────────────────────────

export function testMutation() {
  // describe("CreatePostForm", () => {
  //   it("calls the API and invalidates the query on success", async () => {
  //     const user = userEvent.setup();
  //     const { queryClient } = renderWithQueryClient(<CreatePostForm />);
  //
  //     // Spy on invalidateQueries
  //     const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
  //
  //     // Fill out form
  //     await user.type(screen.getByRole("textbox", { name: /title/i }), "New Post");
  //     await user.click(screen.getByRole("button", { name: /create/i }));
  //
  //     // Button shows loading
  //     expect(screen.getByRole("button")).toHaveTextContent(/creating/i);
  //
  //     // Wait for success
  //     await waitFor(() => {
  //       expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["posts"] });
  //     });
  //   });
  // });
}

// ─── Testing with pre-populated cache ────────────────────────────────────────
//
//  Speed up tests that don't need to test loading states by seeding the cache.

export async function testWithSeedData() {
  const queryClient = createTestQueryClient();

  // Seed the cache before rendering
  queryClient.setQueryData(["posts"], [
    { id: 1, title: "Seeded Post", body: "Body" },
  ]);

  // Component renders immediately with data — no loading state
  // renderWithQueryClient(<PostList />, { queryClient });
  // expect(screen.getByText("Seeded Post")).toBeInTheDocument(); // synchronous!
}

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: Should you mock React Query in tests?
// A: No. Mock the network (with MSW) and let React Query work normally.
//    Mocking React Query means you're not testing your actual hooks or caching.
//
// Q: Why set retry: false in test QueryClient?
// A: Default retry is 3 with exponential backoff. A single 500 error test would
//    take 30+ seconds. retry: false makes error tests instant.
//
// Q: How do you test a component that shows stale data while refetching?
// A: Seed the cache with setQueryData, then trigger a refetch (e.g., via MSW
//    delay), and assert the old data is visible while isFetching is true.
//
// Q: How do you test that invalidateQueries was called after a mutation?
// A: vi.spyOn(queryClient, "invalidateQueries") — or assert the UI reflects
//    the updated list (testing behaviour, not implementation).
