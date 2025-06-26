import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// Redux & Redux-Saga Overview
// 🔹 Redux - State Management Library

// Redux is a predictable state container for JavaScript applications.
// It helps manage application state in a centralized store, making
// data flow predictable and easier to debug.

// Key Concepts of Redux

// Store → A single source of truth for the entire application's state.

// Actions → Plain JavaScript objects that describe what happened (e.g., "INCREMENT").

// Reducers → Pure functions that determine how the state should change based on actions.

// Dispatch → A function used to send actions to the Redux store.

// Selectors → Functions to retrieve specific parts of the state from the store.

// Advantages of Redux
// ✅ Centralized state management
// ✅ Predictable state updates
// ✅ Easy debugging using Redux DevTools
// ✅ Improves maintainability in large applications

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creators
const incrementAction = () => ({
  type: INCREMENT,
  description: "Increases the counter by 1",
});

const decrementAction = () => ({
  type: DECREMENT,
  description: "Decreases the counter by 1",
});

// 1. Initial State
const initialState = { count: 0 };

// 2. Reducer Function
// export
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case "POSTS_LOADED":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

// 3. Create Store
// const store = createStore(counterReducer);
// import { counterReducer } from "./reducer";

export const store = createStore(counterReducer);

// 4. Counter Component
const Counter = () => {
  const count = useSelector((state) => state.count);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Fetch posts on mount
  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        dispatch({ type: "POSTS_LOADED", payload: data });
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    }

    fetchPosts();
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#2c3e50" }}>Redux Concepts Explained</h2>
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <h3>🔹 What is Redux?</h3>
          <p>
            Redux is a predictable state container for JavaScript applications.
            It helps manage application state in a centralized store.
          </p>

          <h3>🔹 Key Concepts:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              📦 <strong>Store:</strong> Single source of truth for your app's
              state
            </li>
            <li>
              📝 <strong>Actions:</strong> Plain objects describing what
              happened
            </li>
            <li>
              🔄 <strong>Reducers:</strong> Pure functions that update state
            </li>
            <li>
              🚀 <strong>Dispatch:</strong> Method to send actions to the store
            </li>
            <li>
              🔍 <strong>Selectors:</strong> Functions to get specific state
              data
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#e8f4f8",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#2c3e50" }}>Live Demo</h2>
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>
          Current Count:{" "}
          <span style={{ fontWeight: "bold", color: "#e74c3c" }}>{count}</span>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={() => dispatch(incrementAction())}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Increment (+)
          </button>
          <button
            onClick={() => dispatch(decrementAction())}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Decrement (-)
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f0f7ff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>🔍 What's happening behind the scenes:</h3>
        <ul style={{ textAlign: "left" }}>
          <li>When you click a button, it dispatches an action</li>
          <li>The reducer processes the action and updates the state</li>
          <li>The UI automatically re-renders with the new state</li>
          <li>All of this happens in a predictable, one-way data flow</li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#fff3e0",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>📝 Action Definitions:</h3>
        <div style={{ textAlign: "left", fontFamily: "monospace" }}>
          <pre
            style={{
              backgroundColor: "#2c3e50",
              color: "#fff",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            {`// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creators
const incrementAction = () => ({
  type: INCREMENT,
  description: "Increases the counter by 1"
});

const decrementAction = () => ({
  type: DECREMENT,
  description: "Decreases the counter by 1"
});`}
          </pre>
          <p style={{ marginTop: "10px" }}>
            <strong>Note:</strong> Action creators are functions that create and
            return action objects. They help maintain consistency in action
            creation and make the code more maintainable.
          </p>
        </div>
        <div>
          <h2>Posts</h2>
          {posts.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {posts.slice(0, 5).map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. App Component with Provider
// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { Counter } from "./components/Counter";

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
