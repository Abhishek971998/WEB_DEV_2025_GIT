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
    return <p className="text-gray-300">Context Value: {value}</p>;
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
      }, 1000);

      // 🔴 Cleanup function (stops interval on unmount)
      return () => {
        clearInterval(intervalId);
        // console.log("🛑 Cleanup: Timer stopped!");
      };
    }, []); // Runs only on mount/unmount

    return (
      <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
        <h2 className="text-xl font-semibold text-blue-400 mb-2">
          ⏱ Timer: {seconds} sec
        </h2>
      </div>
    );
  };

  return (
    <MyContext.Provider value="Hello from Context!">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              React Hooks Cheat Sheet
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* useState Section */}
            <div className="bg-gray-400/30 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-bold text-blue-400 mb-3">useState</h2>
              <div className="space-y-3">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-gray-300 mb-2">Count: {count}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCount(count + 1)}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => setName("Jane")}
                      className="px-2 py-1 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-sm"
                    >
                      Change Name
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Name: {name}</p>
              </div>
            </div>

            {/* useEffect Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                useEffect
              </h2>
              <p className="text-gray-300 mb-4">Check the console for logs!</p>
              <Timer />
            </div>

            {/* useContext Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                useContext
              </h2>
              <MyComponent />
            </div>

            {/* useRef Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">useRef</h2>
              <div className="space-y-4">
                <input
                  ref={inputRef}
                  placeholder="Type here..."
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={focusInput}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Focus Input
                </button>
              </div>
            </div>

            {/* useReducer Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                useReducer
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300">Reducer Count: {state.count}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dispatch({ type: "increment" })}
                    className="px-2 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => dispatch({ type: "decrement" })}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    -1
                  </button>
                </div>
              </div>
            </div>

            {/* useMemo Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">useMemo</h2>
              <p className="text-gray-300">
                Double Count (Memoized): {doubleCount}
              </p>
            </div>

            {/* useCallback Section */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                useCallback
              </h2>
              <button
                onClick={showAlert}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Show Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
};

export default App;
