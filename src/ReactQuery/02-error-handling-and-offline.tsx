/**
 * 06-patterns/02-error-handling-and-offline.tsx
 *
 * CONCEPT: Global error handling, network mode, and offline support
 */

import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

// ─── Option 1: QueryCache callbacks ─────────────────────────────────────────
//
//  Handle all query errors in one place. Great for sending errors to Sentry,
//  showing toast notifications, etc.

import { QueryCache, MutationCache } from "@tanstack/react-query";
import toast from "react-hot-toast"; // or your toast library

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show a toast for queries that already have data in cache
      // (i.e., background refetch failures — not initial load failures)
      if (query.state.data !== undefined) {
        toast.error(`Background refresh failed: ${error.message}`);
      }
      // Always send to error tracking
      // Sentry.captureException(error, { extra: { queryKey: query.queryKey } });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
    onSuccess: () => {
      // Optional: success toast for all mutations
    },
  }),
});

// ─── Option 2: Error Boundary for query errors ───────────────────────────────
//
//  With throwOnError: true, React Query throws errors to the nearest ErrorBoundary.

import { useQuery } from "@tanstack/react-query";
import React from "react";

function usePostWithBoundary(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetch(`/api/posts/${id}`).then(r => r.json()),
    throwOnError: true,  // Throw to ErrorBoundary instead of returning isError
    // Or conditionally: throwOnError: (error) => error.status >= 500
  });
}

// ─── Typing errors properly ───────────────────────────────────────────────────
//
//  React Query v5 types errors as Error by default.
//  Extend the default if your API returns structured errors.

interface ApiError extends Error {
  status: number;
  code: string;
}

function useTypedError(id: number) {
  return useQuery<{ title: string }, ApiError>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) {
        const body = await res.json();
        const err = new Error(body.message) as ApiError;
        err.status = res.status;
        err.code = body.code;
        throw err;
      }
      return res.json();
    },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// NETWORK MODE — offline support
// ═══════════════════════════════════════════════════════════════════════════
//
//  networkMode controls what happens when the device is offline.
//
//  'online' (default): queries/mutations pause when offline and resume when online.
//  'always':           queries run regardless of network status.
//  'offlineFirst':     tries once, then pauses if it fails due to being offline.

const queryClientWithNetworkMode = new QueryClient({
  defaultOptions: {
    queries: {
      // For apps with service workers / local-first architecture
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "online",  // Queue mutations, send when back online
    },
  },
});

// ─── Detect online/offline status ────────────────────────────────────────────

export function OnlineStatusIndicator() {
  const [isOnline, setIsOnline] = React.useState(onlineManager.isOnline());

  useEffect(() => {
    // Subscribe to React Query's own online manager
    return onlineManager.subscribe((online) => {
      setIsOnline(online);
    });
  }, []);

  if (isOnline) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ef4444",
      color: "white",
      padding: "8px 16px",
      borderRadius: 8,
    }}>
      You are offline. Changes will sync when you reconnect.
    </div>
  );
}

// ─── Custom focus manager (React Native / Electron) ──────────────────────────
//
//  By default, React Query uses window.addEventListener('focus') to detect
//  app focus changes. Override for React Native or Electron.

export function setupCustomFocusManager() {
  // Example: React Native AppState
  // import { AppState } from 'react-native';
  // focusManager.setEventListener((handleFocus) => {
  //   const subscription = AppState.addEventListener('change', (state) => {
  //     handleFocus(state === 'active');
  //   });
  //   return () => subscription.remove();
  // });
}

// ─── Mutation queue for offline-first ────────────────────────────────────────
//
//  When networkMode: 'online', mutations are paused when offline.
//  They resume automatically when the network reconnects.
//  The mutation stays in 'paused' state until then.

import { useMutation } from "@tanstack/react-query";

export function useOfflineFriendlyLike() {
  return useMutation({
    mutationFn: (postId: number) =>
      fetch(`/api/posts/${postId}/like`, { method: "POST" }).then(r => r.json()),
    networkMode: "online",  // Will queue if offline
    onSuccess: (data, postId) => {
      console.log(`Post ${postId} liked when online`);
    },
  });
}

// fetchStatus: 'paused'  → mutation is queued, waiting for network
// fetchStatus: 'fetching' → mutation is executing
// fetchStatus: 'idle'     → idle

// ─── INTERVIEW Q&A ────────────────────────────────────────────────────────────
//
// Q: How do you implement global error handling in React Query?
// A: Use QueryCache({ onError }) and MutationCache({ onError }) when creating
//    the QueryClient. These callbacks fire for every query/mutation error,
//    ideal for toast notifications or error tracking.
//
// Q: What is the difference between the three networkMode values?
// A: 'online': pauses queries when offline (default).
//    'always': always runs, ignores network status.
//    'offlineFirst': attempts to run, pauses only if it fails due to being offline.
//
// Q: What happens to mutations when the user goes offline?
// A: With networkMode 'online' (default), mutations are paused and their
//    fetchStatus becomes 'paused'. When the user comes back online, they
//    resume automatically.
//
// Q: How would you override the focus detection for React Native?
// A: Use focusManager.setEventListener() and wire it to AppState changes.
//    Similarly, onlineManager.setEventListener() for network detection.
