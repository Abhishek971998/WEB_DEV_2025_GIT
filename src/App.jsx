/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./Redux/action";
import ArrayMethods from "./ArrayMethods";
import AllHooks from "./Hooks";
import Modal from "./Modal";
import ReactPlay from "./ReactPlay/ReactPlay";
import ReRenderProblem from "./Re-rendering/Re-Render-Problem";
import ReRenderSolution from "./Re-rendering/Re-Render-Solution";
import DebounceNew from "./Debouce/index";
import ThrottleExample from "./Throtling";
import Playground from "./Playground";
import Debouncing from "./Debouce";
import TodoApp from "./Todo";
import StringProblems from "./StringInterviewProblem";

function App() {
  // const [count, setCount] = useState(0);

  // const count__ = useSelector((state) => state.counter.count);
  // const dispatch = useDispatch();

  return (
    <>
      {/* <div className="card">
        <button onClick={() => dispatch(increment("abhishek"))}>
          count is {count__}
        </button>
      </div> */}
      {/* <Debouncing /> */}
      {/* <ArrayMethods /> */}
      {/* <AllHooks /> */}
      {/* <Modal /> */}
      {/* <ReactPlay /> */}
      {/* <ReRenderProblem /> */}
      {/* <ReRenderSolution /> */}
      {/* <DebounceNew /> */}
      {/* <ThrottleExample /> */}
      {/* <Playground /> */}
      {/* <h2>hewnwenklw elw evwelvwvb</h2> */}
      {/* <TodoApp /> */}
      <StringProblems />
    </>
  );
}

export default App;

// not working no erro in log
