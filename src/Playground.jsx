import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

//Action Types

const INCREMENT = "INCREMENT";

//ACTION METHODS
function increment() {
  return { type: INCREMENT };
}

// STORE
const initialState = { count: 0 };

//REducer

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default function Playground() {
  const countValue = useSelector((state) => state.count);

  const dispatch = useDispatch();

  console.log(countValue, "countValue");

  return (
    <div>
      <Provider store={store}>
        <button onClick={dispatch(increment())}> </button>
        Hello world {countValue}
      </Provider>
    </div>
  );
}
