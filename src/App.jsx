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

function App() {
  return (
    <Router>
      <div>
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
            <li>
              <Link to="/string-problems">String Problems</Link>
            </li>
            <li>
              <Link to="/array-methods">Array Methods</Link>
            </li>
            <li>
              <Link to="/all-hooks">All Hooks</Link>
            </li>
            <li>
              <Link to="/modal">Modal</Link>
            </li>
            <li>
              <Link to="/react-play">React Play</Link>
            </li>
            <li>
              <Link to="/re-render-problem">Re-render Problem</Link>
            </li>
            <li>
              <Link to="/re-render-solution">Re-render Solution</Link>
            </li>
            <li>
              <Link to="/debounce-new">Debounce New</Link>
            </li>
            <li>
              <Link to="/throttle-example">Throttle Example</Link>
            </li>
            <li>
              <Link to="/playground">Playground</Link>
            </li>
            <li>
              <Link to="/debouncing">Debouncing</Link>
            </li>
            <li>
              <Link to="/todo">Todo App</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/string-problems" element={<StringProblems />} />
          <Route path="/array-methods" element={<ArrayMethods />} />
          <Route path="/all-hooks" element={<AllHooks />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/react-play" element={<ReactPlay />} />
          <Route path="/re-render-problem" element={<ReRenderProblem />} />
          <Route path="/re-render-solution" element={<ReRenderSolution />} />
          <Route path="/debounce-new" element={<DebounceNew />} />
          <Route path="/throttle-example" element={<ThrottleExample />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/debouncing" element={<Debouncing />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
