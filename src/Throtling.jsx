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
  }, 2000);

  const mock = (success, timeout = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve({ status: 200, data: {} });
        } else {
          reject({ message: "Error" });
        }
      }, timeout);
    });
  };
  const someEvent = async () => {
    try {
      let d = await mock(true, 1000);
      return d;
    } catch (e) {
      console.log(e.message);
    }
  };

  let d = someEvent();
  console.log(d, "someEvent");

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
