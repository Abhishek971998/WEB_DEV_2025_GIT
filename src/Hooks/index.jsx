import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  createContext,
} from "react";

const MyContext = createContext(); // Create a context

const App = () => {
  // 🟢 useState — Manage simple state
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  // 🔵 useContext — Use global state
  const MyComponent = () => {
    const value = useContext(MyContext);
    return <p>Context Value: {value}</p>;
  };

  // 🔴 useRef — Get input element reference
  const inputRef = useRef(null);
  const focusInput = () => inputRef.current.focus();

  // 🟣 useReducer — Manage complex state logic
  const reducer = (state, action) => {
    if (action.type === "increment") return { count: state.count + 1 };
    if (action.type === "decrement") return { count: state.count - 1 };
    return state;
  };

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // 🟠 useMemo — Cache expensive calculations
  const doubleCount = useMemo(() => count * 2, [count]);

  // 🟤 useCallback — Memoize functions
  const showAlert = useCallback(() => alert("Hello!"), []);

  const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      // 🟢 Start an interval that updates state every second
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
        // console.log("⏳ Timer running...");
      }, 1000);

      // 🔴 Cleanup function (stops interval on unmount)
      return () => {
        clearInterval(intervalId);
        // console.log("🛑 Cleanup: Timer stopped!");
      };
    }, []); // Runs only on mount/unmount

    return (
      <div>
        <h2>⏱ Timer: {seconds} sec</h2>
      </div>
    );
  };

  return (
    <MyContext.Provider value="Hello from Context!">
      <div style={{ padding: "20px" }}>
        <h1>React Hooks Cheat Sheet</h1>

        <h2>useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setName("Jane")}>Change Name</button>
        <p>Name: {name}</p>

        <h2>useEffect</h2>
        <p>Check the console for logs!</p>

        <h2>useContext</h2>
        <MyComponent />

        <h2>useRef</h2>
        <input ref={inputRef} placeholder="Type here..." />
        <button onClick={focusInput}>Focus Input</button>

        <h2>useReducer</h2>
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-1</button>

        <h2>useMemo</h2>
        <p>Double Count (Memoized): {doubleCount}</p>

        <h2>useCallback</h2>
        <button onClick={showAlert}>Show Alert</button>
        <Timer />
      </div>
    </MyContext.Provider>
  );
};

export default App;
