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

// 1. Initial State
const initialState = { count: 0 };

// 2. Reducer Function
// export
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
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
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
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
