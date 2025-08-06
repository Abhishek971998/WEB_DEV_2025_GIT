import React from "react";

function closureExample() {
  let count = 0;

  // This function creates a closure that retains access to the `count` variable
  // even after the outer function has finished executing.

  // This function creates a closure that retains access to the `count` variable
  // even after the outer function has finished executing.
  // even if only funtion is using count variable closure will be created for both functions
  // bec

  function increment() {
    count += 1;
    return count;
  }

  function decrement() {
    // count -= 1;
    // return count;
  }
  return { increment, decrement };
}

const ClosureDemo = () => {
  const [value, setValue] = React.useState(0);
  // Create the closure only once
  const increment = React.useRef(closureExample());

  const handleClick = () => {
    setValue(increment.current());
  };

  return (
    <div>
      <h2>Closure Example</h2>
      <p>Count: {value}</p>
      <button onClick={handleClick}>Increment</button>
      <p>
        This demonstrates a closure: the <code>increment</code> function
        remembers the <code>count</code> variable even after{" "}
        <code>closureExample</code> has finished executing.
      </p>
    </div>
  );
};

export default ClosureDemo;
