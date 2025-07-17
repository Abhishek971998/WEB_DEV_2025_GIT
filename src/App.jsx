/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StringProblems from "./StringInterviewProblem";
import ArrayMethods from "./ArrayMethods";
import AllHooks from "./Hooks";
import Modal from "./Modal";
import ReactPlay from "./ReactPlay/ReactPlay";
import ReRenderProblem from "./Re-rendering/Re-Render-Problem";
import ReRenderSolution from "./Re-rendering/Re-Render-Solution";
import DebounceNew from "./Debouce/index";
import ThrottleExample from "./Throtling";
import Debouncing from "./Debouce";
import TodoApp from "./Todo";
import FrontendFAQ from "./OptimizeQuestions";
import ThisKeyword from "./This";
import CodeBlock from "./CodeBlocks";
import { Navigation } from "./components/Navigation";
import EventLoopFlashcard from "./EventLoop";
import MostAskedTheory from "./MostAskedTheory";
import React19 from "./React19";
import TypeScriptExample from "./Typescript/index_";
import ReduxSaga from "./ReduxSaga/ReduxSaga";
import AdvanceJS from "./JSadvance";
import ReactHooksQnA from "./Hooks/HooksQNA";
import Pagination from "./Pagination";

import Redux from "./Redux/AllinOne";

import Playground from "./Playground";
import CSS from "./CSS";

import { useEffect } from "react";

import "./App.css";

const routes = [
  {
    path: "/string-problems",
    element: <StringProblems />,
    label: "String Problems",
  },
  { path: "/array-methods", element: <ArrayMethods />, label: "Array Methods" },
  { path: "/all-hooks", element: <AllHooks />, label: "All Hooks" },
  { path: "/modal", element: <Modal />, label: "Modal" },
  { path: "/react-play", element: <ReactPlay />, label: "React Play" },

  {
    path: "/re-render-problem",
    element: <ReRenderProblem />,
    label: "Re-render Problem",
  },
  {
    path: "/re-render-solution",
    element: <ReRenderSolution />,
    label: "Re-render Solution",
  },
  { path: "/debounce-new", element: <DebounceNew />, label: "Debounce New" },

  {
    path: "/throttle-example",
    element: <ThrottleExample />,
    label: "Throttle Example",
  },
  { path: "/debouncing", element: <Debouncing />, label: "Debouncing" },
  { path: "/todo", element: <TodoApp />, label: "Todo App" },
  { path: "/FEFAQ", element: <FrontendFAQ />, label: "FrontendFAQ" },
  { path: "/ThisKeyword", element: <ThisKeyword />, label: "ThisKeyword" },
  { path: "/CodeBlock", element: <CodeBlock />, label: "CodeBlock" },
  { path: "/eventLoop", element: <EventLoopFlashcard />, label: "EventLoop" },
  {
    path: "/MostAskedTheory",
    element: <MostAskedTheory />,
    label: "MostAskedTheory",
  },
  {
    path: "/",
    element: <MostAskedTheory />,
    label: "MostAskedTheory",
  },
  { path: "/react19", element: <React19 />, label: "React 19" },

  { path: "/react", element: <CodeBlock />, label: "React" },
  { path: "/javascript", element: <CodeBlock />, label: "JavaScript" },
  {
    path: "/type-play",
    element: <TypeScriptExample />,
    label: "TypeScript Play",
  },
  {
    path: "/redux",
    element: <Redux />,
    label: "Redux",
  },
  {
    path: "/redux-saga",
    element: <ReduxSaga />,
    label: "Redux Saga",
  },
  {
    path: "/advance-js",
    element: <AdvanceJS />,
    label: "Advnace javasript",
  },
  {
    path: "/hooks-QnA",
    element: <ReactHooksQnA />,
    label: "  Hooks QnA",
  },
  {
    path: "/pagination",
    element: <Pagination />,
    label: "Pagination",
  },

  { path: "/playground", element: <Playground />, label: "Playground" },
  { path: "/css", element: <CSS />, label: "CSS" },
];

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <nav>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              padding: "10px",
              background: "#282c34",
            }}
          >
            {routes.map(({ path, label }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React, { useState } from "react";

// const App = () => {
//   return (
//     <>
//       <h2>Hello world</h2>
//     </>
//   );
// };
// export default App;
