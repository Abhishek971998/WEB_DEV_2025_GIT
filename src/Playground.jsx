import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

//
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "IN":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
const store = createStore(counterReducer);

function Counter() {
  const countValue = useSelector((store) => store.count);

  const dispatch = useDispatch();

  return (
    <>
      {countValue}
      <button onClick={() => dispatch({ type: "IN" })}>ADD</button>
    </>
  );
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Counter />
      </Provider>
    </>
  );
};

export default App;
