/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import "./Re-Render-Problem.css";

// Tab Navigation Component
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

// Logger Component
const Logger = ({ logs }) => {
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
};

// ======================================================
// EXAMPLE 1: Prop Changes Causing Excessive Rerenders
// ======================================================
const ParentWithPropProblem = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [logs, setLogs] = useState([]);

  //creates new object everytime child is renderred
  const userInfo__ = { name: "John", id: 123 };
  const userInfo = useMemo(() => {
    return { name: "Jhone" };
  }, []);
  const prevUserInfoRef = useRef(userInfo);

  useEffect(() => {
    if (prevUserInfoRef.current !== userInfo) {
      console.log("❗userInfo was recreated!");
    } else {
      console.log("✅userInfo reference is the same");
    }
    prevUserInfoRef.current = userInfo;
  }, [userInfo]);

  //creates new function everytime child is renderred
  const handleClick__ = () => {
    setRenderCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Child component rendered due to prop change",
      },
    ]);
  };

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

  const prevHandleClickRef = useRef(handleClick);

  useEffect(() => {
    if (prevHandleClickRef.current !== handleClick) {
      console.log("❗handleClick was recreated!");
    } else {
      console.log("✅handleClick reference is the same");
    }
    prevHandleClickRef.current = handleClick;
  }, [handleClick]);

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

const ChildComponent = ({ userInfo, onButtonClick, renderCount }) => {
  return (
    <div className="child-container">
      <p>User: {userInfo.name}</p>
      <p>Child Render Count: {renderCount}</p>
      <button className="action-button" onClick={onButtonClick}>
        Trigger Child Render
      </button>
    </div>
  );
};

// ======================================================
// EXAMPLE 2: State Updates in Parent Cause Child Rerenders
// ======================================================
const ParentWithStateUpdates = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleUnrelatedUpdate = () => {
    setUnrelatedState((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Unrelated state updated - Child will re-render",
      },
    ]);
  };

  const handleCountUpdate = () => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Child will re-render",
      },
    ]);
  };

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

const ChildCounter = React.memo(({ count, onIncrement }) => {
  return (
    <div className="child-container">
      <p className="count-text">Count: {count}</p>
      <button className="action-button" onClick={onIncrement}>
        Increment Count
      </button>
    </div>
  );
});

// ======================================================
// EXAMPLE 3: Context Causing Widespread Rerenders
// ======================================================
const ThemeContext = React.createContext();

const ContextExample = () => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const themeValue = {
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
  };

  const handleCountUpdate = () => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Components will re-render",
      },
    ]);
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="solution-container">
        <div className="solution-content">
          <h2 className="solution-title">Problem 3: Context Rerenders</h2>
          <div className="counter-container">
            <p className="count-text">Count: {count}</p>
            <button className="action-button" onClick={handleCountUpdate}>
              Update Count
            </button>
          </div>
          <ThemedComponent />
          <CountDisplay />
        </div>
        <Logger logs={logs} />
      </div>
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div className={`themed-container ${theme}`}>
      <p>Current theme: {theme}</p>
      <button className="action-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

const CountDisplay = () => {
  return (
    <div className="count-container">
      <p>This component doesn't use count but still rerenders</p>
    </div>
  );
};

// ======================================================
// EXAMPLE 4: Expensive Calculations On Every Render
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
  const expensiveResult = calculateExpensiveValue(count);

  const handleCountUpdate = () => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Expensive calculation triggered",
      },
    ]);
  };

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
// ======================================================
const EffectLoopComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setData((prevData) => [...prevData, count]);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: `Effect triggered - Data updated with count: ${count}`,
      },
    ]);
  }, [count]);

  const handleCountUpdate = () => {
    setCount((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: "Count updated - Effect will trigger",
      },
    ]);
  };

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

  const renderActiveComponent = () => {
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
  };

  return (
    <div className="app-container">
      <h1 className="main-title">React Re-rendering Problems</h1>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="tab-content">{renderActiveComponent()}</div>
    </div>
  );
};

export default App;
