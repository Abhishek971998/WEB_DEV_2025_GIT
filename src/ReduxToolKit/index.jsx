// REDUX CORE EXAMPLE
import { createStore } from "redux";

// 1. Action types
const INCREMENT = "INCREMENT";

// 2. Action creators
const increment = () => ({ type: INCREMENT });

// 3. Reducer (with switch-case)
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// 4. Store
const storeCore = createStore(counterReducer);

// 5. Usage
storeCore.subscribe(() => {
  console.log("Redux Core:", storeCore.getState());
});
storeCore.dispatch(increment());
storeCore.dispatch(increment());

// ------------------------------------------------------------

// REDUX TOOLKIT EXAMPLE
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 1. Slice (reducers + actions)
const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1; // uses Immer under the hood
    },
  },
});

// 2. Export actions
const { increment: rtkIncrement } = counterSlice.actions;

// 3. Store
const storeToolkit = configureStore({
  reducer: counterSlice.reducer,
});

// 4. Usage
storeToolkit.subscribe(() => {
  console.log("Redux Toolkit:", storeToolkit.getState());
});
storeToolkit.dispatch(rtkIncrement());
storeToolkit.dispatch(rtkIncrement());
