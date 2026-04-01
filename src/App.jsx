import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
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
import ShortNotes from "./shortNotes";
import Redux from "./Redux/AllinOne";
import Playground from "./Playground";
import CSS from "./CSS";
import ReactQuery from "./ReactQuery";
import "./App.css";

const routes = [
  { path: "/", element: <MostAskedTheory />, label: "Home" },
  {
    path: "/MostAskedTheory",
    element: <MostAskedTheory />,
    label: "Most Asked Theory",
  },
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
  { path: "/FEFAQ", element: <FrontendFAQ />, label: "Frontend FAQ" },
  { path: "/ThisKeyword", element: <ThisKeyword />, label: "This Keyword" },
  { path: "/CodeBlock", element: <CodeBlock />, label: "Code Block" },
  { path: "/eventLoop", element: <EventLoopFlashcard />, label: "Event Loop" },
  { path: "/react19", element: <React19 />, label: "React 19" },
  { path: "/react", element: <CodeBlock />, label: "React" },
  { path: "/javascript", element: <CodeBlock />, label: "JavaScript" },
  {
    path: "/type-play",
    element: <TypeScriptExample />,
    label: "TypeScript Play",
  },
  { path: "/redux", element: <Redux />, label: "Redux" },
  { path: "/redux-saga", element: <ReduxSaga />, label: "Redux Saga" },
  { path: "/advance-js", element: <AdvanceJS />, label: "Advance JavaScript" },
  { path: "/hooks-QnA", element: <ReactHooksQnA />, label: "Hooks QnA" },
  { path: "/pagination", element: <Pagination />, label: "Pagination" },
  { path: "/playground", element: <Playground />, label: "Playground" },
  { path: "/css", element: <CSS />, label: "CSS" },
  { path: "/ShortNotes", element: <ShortNotes />, label: "Short Notes" },
  { path: "/reactQuery", element: <ReactQuery />, label: "React Query" },
];

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((open) => !open);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Router>
      <div className="app-shell">
        <Navigation />
        <div className="app-body">
          <button
            type="button"
            className="drawer-toggle"
            onMouseOver={() => setIsDrawerOpen(true)}
            // onMouseOut={() => setIsDrawerOpen(false)}
            // onMouseLeave={toggleDrawer}
            // onClick={toggleDrawer}
            aria-expanded={isDrawerOpen}
            aria-controls="route-drawer"
            aria-label={isDrawerOpen ? "Close route menu" : "Open route menu"}
          >
            {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            <span>Menu</span>
          </button>

          <button
            type="button"
            className={`drawer-backdrop${isDrawerOpen ? " drawer-backdrop--visible" : ""}`}
            onClick={closeDrawer}
            aria-label="Close route menu"
          />

          <aside
            id="route-drawer"
            className={`side-menu${isDrawerOpen ? " side-menu--open" : ""}`}
          >
            <div className="side-menu__header">
              <p className="side-menu__eyebrow">Study Map</p>
              <h2>All routes</h2>
              <span>{routes.length} topics</span>
            </div>

            <nav className="side-menu__nav" aria-label="All app routes">
              {routes.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `side-menu__link${isActive ? " side-menu__link--active" : ""}`
                  }
                  onClick={closeDrawer}
                >
                  <span className="side-menu__label">{label}</span>
                  <span className="side-menu__path">{path}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className="app-content">
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
