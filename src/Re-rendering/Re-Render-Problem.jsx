/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from "react";

// ======================================================
// EXAMPLE 1: Prop Changes Causing Excessive Rerenders
// ======================================================
const ParentWithPropProblem = () => {
  const [count, setCount] = useState(0);

  // This creates a new object on EVERY render
  const userInfo = { name: "John", id: 123 };

  const userInfo__ = useMemo(() => {
    return { name: "sdcdc" };
  }, []);

  // This creates a new function on EVERY render
  const handleClick = () => {
    console.log("Button clicked");
  };

  const handleClick__ = useCallback(() => {
    console.log("CLiek");
  }, []);

  return (
    <div>
      <h2>Problem 1: New Props on Every Render</h2>
      <button onClick={() => setCount(count + 1)}>
        Parent render count: {count}
      </button>

      {/* Both userInfo and handleClick are recreated every render */}
      <ChildComponent userInfo={userInfo} onButtonClick={handleClick} />
    </div>
  );
};

// This will rerender whenever ParentWithPropProblem rerenders
const ChildComponent = ({ userInfo, onButtonClick }) => {
  console.log("ChildComponent rendered");
  return (
    <div>
      <p>User: {userInfo.name}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
};

// export default React.memo(ChildComponent)

// ======================================================
// EXAMPLE 2: State Updates in Parent Cause Child Rerenders
// ======================================================
const ParentWithStateUpdates = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  return (
    <div>
      <h2>Problem 2: Unrelated State Updates</h2>
      <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
        Update unrelated state: {unrelatedState}
      </button>

      {/* ChildCounter rerenders even when only unrelatedState changes */}
      <ChildCounter count={count} onIncrement={() => setCount(count + 1)} />
    </div>
  );
};

const ChildCounter = ({ count, onIncrement }) => {
  console.log("ChildCounter rendered");
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};

// ======================================================
// EXAMPLE 3: Context Causing Widespread Rerenders
// ======================================================
const ThemeContext = React.createContext();

const ContextExample = () => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  // Theme value recreated on every render
  const themeValue = {
    theme,
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <h2>Problem 3: Context Rerenders</h2>
      <button onClick={() => setCount(count + 1)}>Update count: {count}</button>
      <ThemedComponent />
      <CountDisplay />
    </ThemeContext.Provider>
  );
};

// Will rerender when ThemeContext changes OR when parent rerenders
const ThemedComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  console.log("ThemedComponent rendered");

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// Will rerender when parent rerenders, even though it doesn't use the count
const CountDisplay = () => {
  console.log("CountDisplay rendered (unnecessarily)");
  return <div>This component doesn't use count but still rerenders</div>;
};

// ======================================================
// EXAMPLE 4: Expensive Calculations On Every Render
// ======================================================
const ExpensiveCalculationComponent = () => {
  const [count, setCount] = useState(0);

  // This expensive calculation runs on EVERY render
  const expensiveResult = calculateExpensiveValue(count);

  return (
    <div>
      <h2>Problem 4: Expensive Calculations</h2>
      <p>Result: {expensiveResult}</p>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </div>
  );
};

function calculateExpensiveValue(input) {
  console.log("Running expensive calculation...");
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random() * input;
  }
  return result.toFixed(2);
}

// ======================================================
// EXAMPLE 5: Effect Dependencies Causing Render Loops
// ======================================================
const EffectLoopComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  // Missing or incorrect dependencies
  useEffect(() => {
    // This effect runs on every render because the fetchData
    // function is recreated each time
    fetchData();
  }, []);

  // This function is recreated on every render
  const fetchData = () => {
    console.log("Fetching data...");
    // This would trigger another render
    setData([...data, count]);
  };

  return (
    <div>
      <h2>Problem 5: Effect Dependencies</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Data length: {data.length}</p>
    </div>
  );
};

// ======================================================
// App Component: Combines all examples
// ======================================================
const App = () => {
  return (
    <div>
      <h1>React Re-rendering Problems</h1>
      <ParentWithPropProblem />
      <hr />
      <ParentWithStateUpdates />
      <hr />
      <ContextExample />
      <hr />
      <ExpensiveCalculationComponent />
      <hr />
      <EffectLoopComponent />
    </div>
  );
};

export default App;
