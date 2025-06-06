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
import Playground from "./Playground";
import Debouncing from "./Debouce";
import TodoApp from "./Todo";
import FrontendFAQ from "./OptimizeQuestions";
import ThisKeyword from "./This";
import CodeBlock from "./CodeBlocks";
import { Navigation } from "./components/Navigation";
import EventLoopFlashcard from "./EventLoop";
import MostAskedTheory from "./MostAskedTheory";

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
  { path: "/playground", element: <Playground />, label: "Playground" },
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
  { path: "/react", element: <CodeBlock />, label: "React" },
  { path: "/javascript", element: <CodeBlock />, label: "JavaScript" },
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
