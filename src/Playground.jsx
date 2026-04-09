import React from "react";

function Playground() {
  function debounce(fn, delay) {
    let time;

    return function (...args) {
      clearTimeout(time);

      time = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  const search = debounce((query) => {
    console.log("Searching for:", query);
  }, 300);

  return (
    <div>
      <input onChange={(e) => search(e.target.value)} />
    </div>
  );
}

export default Playground;
