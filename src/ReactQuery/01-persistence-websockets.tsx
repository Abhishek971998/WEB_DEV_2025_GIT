/**
 * 12-advanced-patterns/01-persistence-websockets-background-sync.tsx
 *
 * CONCEPT: Cache persistence, WebSocket integration, and background sync
 *
 * These are the patterns that separate senior-level React Query knowledge
 * from intermediate. Critical for interviews at larger companies.
 */

import {
  QueryClient,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { experimental_createPersister } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// ═══════════════════════════════════════════════════════════════════════════
// 1. CACHE PERSISTENCE — survive page refreshes
// ═══════════════════════════════════════════════════════════════════════════
//
// By default, the cache lives only in memory. On page refresh, it's gone.
// Persistence plugins save the cache to localStorage / IndexedDB.
// On next load, the persisted cache is restored — instant data.

// ─── Setup: localStorage persister ───────────────────────────────────────────

import { persistQueryClient } from "@tanstack/query-persist-client-core";

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "REACT_QUERY_CACHE",      // localStorage key
  throttleTime: 1000,             // Debounce writes (don't write on every update)
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

const queryClientWithPersistence = new QueryClient({
  defaultOptions: {
    queries: {
      // gcTime must be > 0 and ideally longer than your app session
      // Data with gcTime of 0 won't be persisted
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// Connect the persister to the QueryClient
// Call this ONCE when your app starts (outside React)
persistQueryClient({
  queryClient: queryClientWithPersistence,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24,   // Discard persisted data older than 24h
  buster: "v1",                    // Change this string to invalidate all persisted data
                                   // (useful when your data shape changes)
});

// ─── Per-query persistence (v5 experimental) ─────────────────────────────────

import { useQuery } from "@tanstack/react-query";

// Opt specific queries into persistence using the persister option
const indexedDBPersister = experimental_createPersister({
  storage: {
    // Use IndexedDB for larger datasets (unlike localStorage's 5MB limit)
    getItem: async (key: string) => {
      // return await idb.get(key);
    },
    setItem: async (key: string, value: string) => {
      // await idb.set(key, value);
    },
    removeItem: async (key: string) => {
      // await idb.delete(key);
    },
  },
});

function usePersistentPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
    gcTime: Infinity,         // Must be Infinity for per-query persistence
    persister: indexedDBPersister as any,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. WEBSOCKET INTEGRATION — real-time updates
// ═══════════════════════════════════════════════════════════════════════════
//
// React Query doesn't have built-in WebSocket support, but integrates cleanly.
// The pattern: WebSocket updates → queryClient.setQueryData / invalidateQueries
//
// Two strategies:
//  A. Invalidate on event → triggers refetch (simpler, slightly more network)
//  B. Update cache directly from WS payload → no refetch needed (efficient)

class WebSocketManager {
  private ws: WebSocket | null = null;
  private queryClient: QueryClient;

  constructor(qc: QueryClient) {
    this.queryClient = qc;
  }

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.ws.onclose = () => {
      // Reconnect after 3s
      setTimeout(() => this.connect(url), 3000);
    };
  }

  private handleMessage(message: { type: string; payload: any }) {
    const qc = this.queryClient;

    switch (message.type) {
      // ── Strategy A: Invalidate → triggers refetch ──────────────────────────
      case "POST_CREATED":
      case "POST_DELETED":
        qc.invalidateQueries({ queryKey: ["posts", "list"] });
        break;

      // ── Strategy B: Update cache directly with WS payload ──────────────────
      case "POST_UPDATED": {
        const updatedPost = message.payload;

        // Update the detail cache
        qc.setQueryData(["posts", "detail", updatedPost.id], updatedPost);

        // Update the post inside all cached list queries
        qc.setQueriesData<{ posts: any[] }>(
          { queryKey: ["posts", "list"] },
          (old) => old
            ? {
                ...old,
                posts: old.posts.map(p =>
                  p.id === updatedPost.id ? updatedPost : p
                ),
              }
            : old
        );
        break;
      }

      // ── Invalidate specific user's data ────────────────────────────────────
      case "USER_UPDATED":
        qc.invalidateQueries({ queryKey: ["users", "detail", message.payload.id] });
        break;

      default:
        break;
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}

// ─── React hook wrapping the WebSocket manager ───────────────────────────────

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useWebSocket(url: string) {
  const queryClient = useQueryClient();
  const managerRef = useRef<WebSocketManager | null>(null);

  useEffect(() => {
    const manager = new WebSocketManager(queryClient);
    manager.connect(url);
    managerRef.current = manager;

    return () => {
      manager.disconnect();
    };
  }, [url, queryClient]);
}

// Usage: Call this once near the root of your app
// export function App() {
//   useWebSocket("wss://api.example.com/ws");
//   return <RouterProvider router={router} />;
// }

// ═══════════════════════════════════════════════════════════════════════════
// 3. BACKGROUND SYNC — process queued mutations when back online
// ═══════════════════════════════════════════════════════════════════════════
//
// React Query handles online/offline automatically with networkMode: 'online'.
// For more control, you can integrate with the Broadcast Channel API to
// sync across tabs, or use service workers for offline-first apps.

// ─── Cross-tab cache synchronization ─────────────────────────────────────────
//
//  When the user has multiple tabs open, each has its own QueryClient.
//  Use BroadcastChannel to notify other tabs when cache should be invalidated.

export function setupCrossTabSync(queryClient: QueryClient) {
  if (typeof window === "undefined") return;

  const channel = new BroadcastChannel("react-query-sync");

  // Listen for invalidation messages from other tabs
  channel.onmessage = (event) => {
    const { type, queryKey } = event.data;
    if (type === "INVALIDATE") {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  // Return a function to broadcast invalidation to other tabs
  const broadcastInvalidate = (queryKey: unknown[]) => {
    channel.postMessage({ type: "INVALIDATE", queryKey });
  };

  return { broadcastInvalidate, cleanup: () => channel.close() };
}

// ─── Custom online manager for React Native / Electron ───────────────────────

export function setupReactNativeOnlineManager() {
  // React Native example:
  // import { AppState, Platform } from 'react-native';
  // import NetInfo from '@react-native-community/netinfo';
  //
  // onlineManager.setEventListener((setOnline) => {
  //   return NetInfo.addEventListener((state) => {
  //     setOnline(!!state.isConnected);
  //   });
  // });
  //
  // focusManager.setEventListener((setFocused) => {
  //   const subscription = AppState.addEventListener('change', (nextState) => {
  //     setFocused(nextState === 'active');
  //   });
  //   return () => subscription.remove();
  // });
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. MUTATION QUEUING — guaranteed delivery even on unstable networks
// ═══════════════════════════════════════════════════════════════════════════
//
// With networkMode: 'online', mutations are paused when offline.
// Combined with persistence, you can queue mutations across sessions.

import { useMutation } from "@tanstack/react-query";

// Mutations with networkMode 'online' auto-queue when offline
// and fire in order when the connection is restored.
export function useQueuedLike() {
  return useMutation({
    mutationFn: (postId: number) =>
      fetch(`/api/posts/${postId}/like`, { method: "POST" }).then(r => r.json()),
    networkMode: "online",      // Queue if offline
    retry: 3,                   // Retry 3 times on failure
    retryDelay: 1000,
  });
}

// ─── INTERVIEW Q&A ───────────────────────────────────────────────────────────
//
// Q: How do you persist the React Query cache across page refreshes?
// A: Use a persister plugin (@tanstack/query-persist-client-core).
//    Connect it via persistQueryClient(). You need gcTime > 0 (set it to
//    24h or Infinity). Use a buster string to invalidate stale persisted caches.
//
// Q: How do you integrate WebSockets with React Query?
// A: React Query doesn't have native WS support. The pattern is:
//    WebSocket message → call queryClient.setQueryData() (direct update)
//    or queryClient.invalidateQueries() (trigger refetch).
//    Direct updates are more efficient; invalidation is simpler.
//
// Q: How do you synchronize cache between browser tabs?
// A: Use the BroadcastChannel API. On mutation success, broadcast an
//    invalidation event. Other tabs listen and call invalidateQueries.
//
// Q: What is the networkMode option?
// A: Controls behaviour when the device is offline.
//    'online': pauses queries/mutations when offline, resumes on reconnect.
//    'always': runs regardless of connection.
//    'offlineFirst': tries once, then pauses if network is the issue.
//
// Q: How do you ensure mutations aren't lost when the user is offline?
// A: Set networkMode: 'online'. Combined with a persister that saves
//    in-flight mutations, you can restore and replay them on next session.
