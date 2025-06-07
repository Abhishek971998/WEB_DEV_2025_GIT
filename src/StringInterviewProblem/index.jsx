import React from "react";
import "./styles.css";

function StringInterviewProblem() {
  const stringMethods = [
    'const upper = str.toUpperCase() // "HELLO WORLD"',
    'const lower = str.toLowerCase() // "hello world"',
    'const char = str.charAt(0) // "H"',
    'const concat = str.concat("!!!") // "Hello world!!!"',
    'const idx = str.indexOf("o") // 4',
    'const lastIdx = str.lastIndexOf("o") // 7',
    'const replaced = str.replace("world", "JS") // "Hello JS"',
    'const searched = str.search("world") // 6',
    'const sliced = str.slice(0, 5) // "Hello"',
    'const substrd = str.substr(6, 5) // "world"',
    'const trimmed = str.trim() // "Hello world"',
    'const strVal = str.valueOf() // "Hello world"',
    'const strStr = str.toString() // "Hello world"',
    'const included = str.includes("world") // true',
    "const code = str.charCodeAt(0) // 72",

    'const splitted = str.split(" ") // ["Hello", "world"]',
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

  // Helper to highlight variable, value, and output
  function highlightLine(line) {
    // Match: const var = value // output
    const match = line.match(/const\s+(\w+)\s*=\s*([^/]+)(\/\/\s*)(.*)$/);
    if (match) {
      return (
        <>
          <span className="cheatsheet-keyword">const</span>{" "}
          <span className="cheatsheet-var">{match[1]}</span>
          {" = "}
          <span className="cheatsheet-value">{match[2].trim()}</span>{" "}
          <span className="cheatsheet-comment">// {match[4]}</span>
        </>
      );
    }
    return line;
  }

  return (
    <div className="string-methods-cheatsheet">
      <h1 className="cheatsheet-title">
        JavaScript String Methods Cheat Sheet
      </h1>
      <div className="cheatsheet-grid">
        <div className="cheatsheet-card">
          <div className="cheatsheet-code">
            {stringMethods.map((line, idx) => (
              <div key={idx}>{highlightLine(line)}</div>
            ))}
          </div>
        </div>
        <div className="cheatsheet-card">
          <div className="cheatsheet-code">
            {arrayMethods.map((line, idx) => (
              <div key={idx}>{highlightLine(line)}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="interview-questions">
        <h2>STRINGS Questions</h2>
        <div className="questions-list">
          <div className="question-card">
            <h3>Q: What's the difference between slice() and substring()?</h3>
            <p>
              A: slice() can take negative indices and works with arrays, while
              substring() only works with strings and converts negative indices
              to 0.
            </p>
          </div>
          <div className="question-card">
            <h3>Q: How do you check if a string contains a substring?</h3>
            <p>
              A: You can use includes(), indexOf(), or search() methods.
              includes() returns a boolean, while indexOf() and search() return
              the position or -1.
            </p>
          </div>
          <div className="question-card">
            <h3>
              Q: What's the difference between == and === when comparing
              strings?
            </h3>
            <p>
              A: == performs type coercion before comparison, while === checks
              both value and type. For strings, it's recommended to use === for
              strict comparison.
            </p>
          </div>
          <div className="question-card">
            <h3>Q: How do you handle string immutability in JavaScript?</h3>
            <p>
              A: Strings in JavaScript are immutable. To modify a string, you
              need to create a new string using methods like replace(), slice(),
              or concatenation.
            </p>
          </div>
        </div>
        <div className="interview-questions">
          <h2>ARRAY Questions</h2>
          <div className="questions-list">
            <div className="question-card">
              <h3>Q: What's the difference between map() and forEach()?</h3>
              <p>
                A: map() returns a new array, forEach() just iterates and
                returns undefined.
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
                A: It accumulates array values into a single result (sum,
                object, etc.).
              </p>
            </div>
            <div className="question-card">
              <h3>Q: How do you find if all elements match a condition?</h3>
              <p>A: Use every().</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StringInterviewProblem;
