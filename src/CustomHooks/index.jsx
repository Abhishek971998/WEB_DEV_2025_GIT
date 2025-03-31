/* eslint-disable no-unused-vars */
import { useState } from "react";

// 🟢 Custom hook for a simple counter
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// 🟡 Example usage
const App = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Counter Hook Example</h1>
      <h2>{count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;
