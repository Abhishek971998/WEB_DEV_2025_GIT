/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./ArrayMethods.css";

function ArrayMethods() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [output, setOutput] = useState("Click on any method to see its output");

  const data = [
    { id: 1, name: "John", age: 5, city: "New York", address: { state: "KA" } },
    { id: 2, name: "Sarah", age: 50, city: "London", address: { state: "MH" } },
    {
      id: 3,
      name: "kiran",
      age: 588,
      city: "London",
      address: { state: "GJ" },
    },
    {
      id: 4,
      name: "kiran",
      age: 588,
      city: "London",
      address: { state: "GJ" },
    },
  ];

  const arrayMethods = [
    "const arr = [1, 2, 3, 4, 5] // [1, 2, 3, 4, 5]",
    "const mapped = arr.map(x => x * 2) // [2, 4, 6, 8, 10]",
    "const filtered = arr.filter(x => x % 2 === 0) // [2, 4]",
    "const reduced = arr.reduce((acc, x) => acc + x, 0) // 15",
    "const found = arr.find(x => x > 3) // 4",
    "const some = arr.some(x => x > 4) // true",
    "const every = arr.every(x => x > 0) // true",
    "const includes = arr.includes(3) // true",
    "const index = arr.indexOf(3) // 2",
    "const pushed = [...arr, 6] // [1, 2, 3, 4, 5, 6]",
    "const popped = arr.slice(0, -1) // [1, 2, 3, 4]",
    "const shifted = arr.slice(1) // [2, 3, 4, 5]",
    "const unshifted = [0, ...arr] // [0, 1, 2, 3, 4, 5]",
    'const joined = arr.join(",") // "1,2,3,4,5"',
    "const reversed = [...arr].reverse() // [5, 4, 3, 2, 1]",
    "const sorted = [...arr].sort((a, b) => b - a) // [5, 4, 3, 2, 1]",
    "const sliced = arr.slice(1, 4) // [2, 3, 4]",
    "const spliced = (() => { let a = [...arr]; a.splice(2, 1); return a })() // [1, 2, 4, 5]",
    "const flat = [[1, 2], [3, 4]].flat() // [1, 2, 3, 4]",
    "const flatMap = arr.flatMap(x => [x, x * 2]) // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]",
  ];

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
    setOutput(JSON.stringify(method.examples[0].result, null, 2));
  };

  function highlightLine(line) {
    // Match: const var = value // output
    const match = line.match(/const\s+(\w+)\s*=\s*([^/]+)(\/\/\s*)(.*)$/);
    if (match) {
      return (
        <React.Fragment>
          <span className="cheatsheet-keyword">const</span>{" "}
          <span className="cheatsheet-var">{match[1]}</span>
          {" = "}
          <span className="cheatsheet-value">{match[2].trim()}</span>{" "}
          <span className="cheatsheet-comment">// {match[4]}</span>
        </React.Fragment>
      );
    }
    return line;
  }

  return (
    <div className="array-methods-cheatsheet">
      <h1 className="cheatsheet-title">JavaScript Array Methods Cheat Sheet</h1>
      <div className="cheatsheet-grid">
        <div className="cheatsheet-card">
          <div className="cheatsheet-code">
            {arrayMethods.map((line, idx) => (
              <div key={idx}>{highlightLine(line)}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="interview-questions">
        <h2>Common Interview Questions</h2>
        <div className="questions-list">
          <div className="question-card">
            <h3>Q: What's the difference between map() and forEach()?</h3>
            <p>
              A: map() returns a new array, forEach() just iterates and returns
              undefined.
            </p>
          </div>
          <div className="question-card">
            <h3>Q: How do you remove duplicates from an array?</h3>
            <p>
              A: Use [...new Set(arr)] or arr.filter((v, i, a) => a.indexOf(v)
              === i).
            </p>
          </div>
          <div className="question-card">
            <h3>Q: What does reduce() do?</h3>
            <p>
              A: It accumulates array values into a single result (sum, object,
              etc.).
            </p>
          </div>
          <div className="question-card">
            <h3>Q: How do you find if all elements match a condition?</h3>
            <p>A: Use every().</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayMethods;
