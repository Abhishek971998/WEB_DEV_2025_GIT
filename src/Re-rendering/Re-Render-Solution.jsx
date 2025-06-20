/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import "./Re-Render-Solution.css";

// Tab Navigation Component - No optimization needed as it's a simple component
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "prop-changes", label: "Prop Changes" },
    { id: "state-updates", label: "State Updates" },
    { id: "context", label: "Context" },
    { id: "expensive", label: "Expensive Calc" },
    { id: "effects", label: "Effects" },
  ];

  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Logger Component - Memoized to prevent unnecessary re-renders
const Logger = React.memo(({ logs }) => {
  return (
    <div className="log-container">
      <h3 className="log-title">Render & State Changes</h3>
      <div className="log-content">
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <span className="log-time">{log.time}</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// ======================================================
// EXAMPLE 1: Prop Changes Causing Excessive Rerenders
// Problem:
// 1. userInfo object was recreated on every render
// 2. handleClick function was recreated on every render
// Solution:
// 1. Used useMemo for userInfo to maintain reference stability
// 2. Used useCallback for handleClick to maintain function reference
// 3. Memoized ChildComponent to prevent unnecessary re-renders
// ======================================================

// Memoized child component to prevent unnecessary re-renders
const ChildComponent = React.memo(
  ({ userInfo, onButtonClick, renderCount }) => {
    return (
      <div className="child-container">
        <p>User: {userInfo.name}</p>
        <p>Child Render Count: {renderCount}</p>
        <button className="action-button" onClick={onButtonClick}>
          Trigger Child Render
        </button>
      </div>
    );
  }
);

const ParentWithPropProblem = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // Memoized object to prevent recreation on every render
  const userInfo = useMemo(() => ({ name: "John", id: 123 }), []);

  // Memoized callback to prevent recreation on every render
  const handleClick = useCallback(() => {
    setRenderCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Child component rendered due to callback",
      },
    ]);
  }, []);

  return (
    <div className="solution-container">
      <div className="solution-content">
        <h2 className="solution-title">Problem 1: New Props on Every Render</h2>
        <div className="counter-container">
          <p className="count-text">Parent render count: {count}</p>
          <button className="action-button" onClick={() => setCount(count + 1)}>
            Update Parent Count
          </button>
        </div>
        <ChildComponent
          userInfo={userInfo}
          onButtonClick={handleClick}
          renderCount={renderCount}
        />
      </div>
      <Logger logs={logs} />
    </div>
  );
};

// ======================================================
// EXAMPLE 2: State Updates in Parent Cause Child Rerenders
// Problem: Child component re-renders when parent's unrelated state changes
// Solution:
// 1. Used React.memo for ChildCounter to prevent re-renders when props haven't changed
// 2. Memoized callback functions to maintain reference stability
// ======================================================

// Memoized ChildCounter component to prevent unnecessary re-renders
const ChildCounter = React.memo(({ count, onIncrement }) => {
  console.log("👶 ChildCounter rendered");
  return (
    <div className="child-container">
      <p className="count-text">Count: {count}</p>
      <button className="action-button" onClick={onIncrement}>
        Increment Count
      </button>
    </div>
  );
});

const ParentWithStateUpdates = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [logs, setLogs] = useState([]);

  const logUpdate = useCallback((message) => {
    setLogs((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), message },
    ]);
  }, []);

  const handleUnrelatedUpdate = useCallback(() => {
    setUnrelatedState((prev) => prev + 1);
    logUpdate("Unrelated state updated - Child will NOT re-render if memoized");
  }, [logUpdate]);

  const handleCountUpdate = useCallback(() => {
    setCount((prev) => prev + 1);
    logUpdate("Count updated - Child will re-render");
  }, [logUpdate]);

  return (
    <div className="solution-container">
      <div className="solution-content">
        <h2 className="solution-title">Problem 2: Unrelated State Updates</h2>
        <div className="counter-container">
          <p className="count-text">Unrelated State: {unrelatedState}</p>
          <button className="action-button" onClick={handleUnrelatedUpdate}>
            Update Unrelated State
          </button>
        </div>
        <ChildCounter count={count} onIncrement={handleCountUpdate} />
      </div>
      <Logger logs={logs} />
    </div>
  );
};

// ======================================================
// EXAMPLE 3: Context Causing Widespread Rerenders
// Problem: All components re-render when context value changes
// Solution:
// 1. Split context into multiple contexts (theme and count)
// 2. Memoized context values
// 3. Used React.memo for components that don't need to re-render
// ======================================================
const ThemeContext = React.createContext();
const CountContext = React.createContext();

const ThemedComponent = React.memo(() => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div className={`themed-container ${theme}`}>
      <p>Current theme: {theme}</p>
      <button className="action-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
});

const CountDisplay = React.memo(() => {
  console.log("CountDisplay");
  return (
    <div className="count-container">
      <p>This component doesn't use count but still rerenders</p>
    </div>
  );
});

const ContextExample = () => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // Memoized theme context value
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: "Theme changed - Components will re-render",
          },
        ]);
      },
    }),
    [theme]
  );

  // Memoized count context value
  const countValue = useMemo(
    () => ({
      count,
      incrementCount: () => {
        setCount((prev) => prev + 1);
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: "Count updated - Components will re-render",
          },
        ]);
      },
    }),
    [count]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <CountContext.Provider value={countValue}>
        <div className="solution-container">
          <div className="solution-content">
            <h2 className="solution-title">Problem 3: Context Rerenders</h2>
            <div className="counter-container">
              <p className="count-text">Count: {count}</p>
              <button
                className="action-button"
                onClick={countValue.incrementCount}
              >
                Update Count
              </button>
            </div>
            <ThemedComponent />
            <CountDisplay />
          </div>
          <Logger logs={logs} />
        </div>
      </CountContext.Provider>
    </ThemeContext.Provider>
  );
};

// ======================================================
// EXAMPLE 4: Expensive Calculations On Every Render
// Problem: Expensive calculation runs on every render
// Solution: Used useMemo to cache the calculation result
// ======================================================
function calculateExpensiveValue(input) {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random() * input;
  }
  return result.toFixed(2);
}

const ExpensiveCalculationComponent = () => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // Memoized expensive calculation
  const expensiveResult = useMemo(
    () => calculateExpensiveValue(count),
    [count]
  );

  const handleCountUpdate = useCallback(() => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Expensive calculation triggered",
      },
    ]);
  }, []);

  return (
    <div className="solution-container">
      <div className="solution-content">
        <h2 className="solution-title">Problem 4: Expensive Calculations</h2>
        <div className="counter-container">
          <p className="result-text">Calculation Result: {expensiveResult}</p>
          <p className="count-text">Count: {count}</p>
          <button className="action-button" onClick={handleCountUpdate}>
            Trigger Expensive Calculation
          </button>
        </div>
      </div>
      <Logger logs={logs} />
    </div>
  );
};

// ======================================================
// EXAMPLE 5: Effect Dependencies Causing Render Loops
// Problem: Effect causes infinite loop due to state updates
// Solution:
// 1. Used useRef to track previous count
// 2. Only update data when count actually changes
// 3. Memoized callback functions
// ======================================================
const EffectLoopComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [logs, setLogs] = useState([]);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (prevCountRef.current !== count) {
      setData((prevData) => [...prevData, count]);
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Effect triggered - Data updated with count: ${count}`,
        },
      ]);
      prevCountRef.current = count;
    }
  }, [count]);

  const handleCountUpdate = useCallback(() => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Effect will trigger",
      },
    ]);
  }, []);

  return (
    <div className="solution-container">
      <div className="solution-content">
        <h2 className="solution-title">Problem 5: Effect Dependencies</h2>
        <div className="counter-container">
          <p className="count-text">Count: {count}</p>
          <button className="action-button" onClick={handleCountUpdate}>
            Increment Count
          </button>
          <div className="data-display">
            <p className="data-length">Data Array Length: {data.length}</p>
          </div>
        </div>
      </div>
      <Logger logs={logs} />
    </div>
  );
};

// ======================================================
// App Component: Combines all examples with tabs
// ======================================================
const App = () => {
  const [activeTab, setActiveTab] = useState("prop-changes");

  const renderActiveComponent = useCallback(() => {
    switch (activeTab) {
      case "prop-changes":
        return <ParentWithPropProblem />;
      case "state-updates":
        return <ParentWithStateUpdates />;
      case "context":
        return <ContextExample />;
      case "expensive":
        return <ExpensiveCalculationComponent />;
      case "effects":
        return <EffectLoopComponent />;
      default:
        return <ParentWithPropProblem />;
    }
  }, [activeTab]);

  return (
    <div className="app-container">
      <h1 className="main-title">React Re-rendering Solutions</h1>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="tab-content">{renderActiveComponent()}</div>
    </div>
  );
};

export default App;
