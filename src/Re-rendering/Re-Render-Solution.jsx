import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  memo,
} from "react";

// ======================================================
// SOLUTION 1: Using React.memo and useCallback/useMemo
// ======================================================
const ParentWithPropSolution = () => {
  const [count, setCount] = useState(0);

  // Use useMemo to memoize the object
  const userInfo = useMemo(() => {
    return { name: "John", id: 123 };
  }, []); // Empty dependency array means this is created only once

  // Use useCallback to memoize the function
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Empty dependency array means this is created only once

  return (
    <div>
      <h2>Solution 1: useCallback, useMemo, and React.memo</h2>
      <button onClick={() => setCount(count + 1)}>
        Parent render count: {count}
      </button>

      {/* MemoizedChildComponent only rerenders if props change */}
      <MemoizedChildComponent userInfo={userInfo} onButtonClick={handleClick} />
    </div>
  );
};

// Use React.memo to prevent rerenders if props haven't changed
const MemoizedChildComponent = memo(({ userInfo, onButtonClick }) => {
  console.log("MemoizedChildComponent rendered");
  return (
    <div>
      <p>User: {userInfo.name}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
});

// ======================================================
// SOLUTION 2: Component Composition to Avoid Unnecessary Rerenders
// ======================================================
const ParentWithComponentComposition = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Define increment function
  const handleIncrement = () => setCount(count + 1);

  return (
    <div>
      <h2>Solution 2: Component Composition</h2>
      <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
        Update unrelated state: {unrelatedState}
      </button>

      {/* Pass children as props to make updates more isolated */}
      <CounterContainer>
        <CounterDisplay count={count} />
        <CounterButton onIncrement={handleIncrement} />
      </CounterContainer>
    </div>
  );
};

// This component just renders its children - won't cause rerenders
const CounterContainer = ({ children }) => {
  return <div className="counter-container">{children}</div>;
};

// These components only rerender when their specific props change
const CounterDisplay = memo(({ count }) => {
  console.log("CounterDisplay rendered");
  return <p>Count: {count}</p>;
});

const CounterButton = memo(({ onIncrement }) => {
  console.log("CounterButton rendered");
  return <button onClick={onIncrement}>Increment</button>;
});

// ======================================================
// SOLUTION 3: Optimized Context with Separate Providers
// ======================================================
const ThemeContext = React.createContext();
const CountContext = React.createContext();

const OptimizedContextExample = () => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  // Memoize the theme value to prevent unnecessary renders
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme]
  );

  // Memoize the count value
  const countValue = useMemo(
    () => ({
      count,
      increment: () => setCount(count + 1),
    }),
    [count]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <CountContext.Provider value={countValue}>
        <h2>Solution 3: Optimized Context</h2>
        <OptimizedThemedComponent />
        <OptimizedCountDisplay />
      </CountContext.Provider>
    </ThemeContext.Provider>
  );
};

// Only rerenders when theme changes
const OptimizedThemedComponent = memo(() => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("OptimizedThemedComponent rendered");

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
});

// Only rerenders when count changes
const OptimizedCountDisplay = memo(() => {
  const { count, increment } = useContext(CountContext);
  console.log("OptimizedCountDisplay rendered");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
});

// ======================================================
// SOLUTION 4: Using useMemo for Expensive Calculations
// ======================================================
const OptimizedCalculationComponent = () => {
  const [count, setCount] = useState(0);

  // Use useMemo to only recalculate when count changes
  const expensiveResult = useMemo(() => {
    return calculateExpensiveValue(count);
  }, [count]);

  return (
    <div>
      <h2>Solution 4: Memoized Calculations</h2>
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
// SOLUTION 5: Proper Effect Dependencies and State Updates
// ======================================================
const OptimizedEffectComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  console.log(data, "data");

  // Use useCallback to memoize the function
  const fetchData = useCallback(() => {
    console.log("Fetching data...");
    // Use functional updates to avoid dependency on data
    setData((prevData) => [...prevData, count]);
  }, [count]); // Only recreate when count changes

  // Now our effect dependencies are correct
  useEffect(() => {
    fetchData();
    // This effect only runs when fetchData changes (which only changes when count changes)
  }, [fetchData]);

  return (
    <div>
      <h2>Solution 5: Proper Effect Dependencies</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Data length: {data.length}</p>
    </div>
  );
};

// ======================================================
// BONUS SOLUTION: React.lazy for Code-splitting
// ======================================================
const LazyLoadingExample = () => {
  const [showComponent, setShowComponent] = useState(false);

  // React.lazy for code-splitting
  const LazyComponent = React.lazy(
    () =>
      // In a real app, this would be an import statement
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            default: () => <div>This component was lazily loaded!</div>,
          });
        }, 1000);
      })
  );

  return (
    <div>
      <h2>Bonus: Code Splitting with React.lazy</h2>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? "Hide" : "Show"} Component
      </button>

      {showComponent && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </React.Suspense>
      )}
    </div>
  );
};

// ======================================================
// App Component: Combines all solutions
// ======================================================
const App = () => {
  return (
    <div>
      <h1>React Re-rendering Solutions</h1>
      {/* <ParentWithPropSolution />
      <hr />
      <ParentWithComponentComposition />
      <hr />
      <OptimizedContextExample />
      <hr />
      <OptimizedCalculationComponent /> */}
      <hr />
      <OptimizedEffectComponent />
      <hr />
      {/* <LazyLoadingExample /> */}
    </div>
  );
};

export default App;
