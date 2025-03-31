import React from "react";

function throttle(func, delay) {
  let canRun = true;

  return function (...args) {
    if (!canRun) return;

    canRun = false;
    func(...args);

    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

function ThrottleButtonExample() {
  const handleClick = throttle(() => {
    console.log("Button clicked! 🚀");
    // alert("Button clicked! 🚀");
  }, 1000);

  return (
    <div>
      <h2>Throttle Button Click Example</h2>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default ThrottleButtonExample;

// 🟢 **What happens?**
// - Clicking the button rapidly logs only **1 click every 2 seconds**.
// - Even if you spam-click, the function waits until the delay is over to run again.

// Perfect for: **Preventing double form submissions** or **rate-limiting actions**!

// Let me know if you’d like me to tweak this or add more examples! ✌️
