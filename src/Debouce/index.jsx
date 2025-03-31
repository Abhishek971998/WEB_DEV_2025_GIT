/* eslint-disable no-unused-vars */
import React, { useRef } from "react";

function Debouncing_() {
  const debounceTimeout = useRef(null);

  function debounce__(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      console.log(args, "args");
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function debounce(event) {
    let value = event.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      console.log(value, "value debouce");
    }, 1000);
  }

  const handleInputChange = (event) => {
    console.log("Input value:", event.target.value);
  };

  let de = debounce__(handleInputChange, 1000);

  return <input onChange={de} />;
}

function Debouncing() {
  function debounce(fn, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  const debouncedSearch = debounce((e) => {
    console.log(e);
  }, 1000);

  return (
    <div>
      <h2>DEBOUNCE</h2>
      <input
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="ascascsc"
      />
    </div>
  );
}
// export default Debouncing;
export default Debouncing;
