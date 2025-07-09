/* eslint-disable no-unused-vars */
// 1. Pure Function
function add(a, b) {
  return a + b; // No side effects, same inputs = same output
}
console.log("Pure:", add(2, 3));

// 2. Higher-Order Function (HOF)
function hof(fn) {
  return function (x) {
    return fn(x) + "!";
  };
}
const excited = hof((str) => str.toUpperCase());
console.log("HOF:", excited("hello"));

// 3. Generator Function
function* counterGen() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
const gen = counterGen();
console.log("Generator:", gen.next().value, gen.next().value);

// 4. Callback Function
function greetUser(name, callback) {
  const msg = `Hello, ${name}`;
  callback(msg);
}
greetUser("Abhi", (msg) => console.log("Callback:", msg));

// 5. Currying
function multiply(a) {
  return function (b) {
    return a * b;
  };
}
const double = multiply(2);
console.log("Currying:", double(5)); // 10

// 6. IIFE (Immediately Invoked Function Expression)
(function () {
  const secret = "IIFE inside";
  console.log("IIFE:", secret);
})();

// 7. Closure
function outer() {
  const name = "Closure Example";
  return function inner() {
    console.log("Closure:", name);
  };
}
const cl = outer();
cl();

// 8. Debounce (Useful Function)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const log = debounce((msg) => console.log("Debounced:", msg), 300);
// log("Typing..."); // Uncomment to test in browser or Node

// 9. Memoization (Performance Optimization)
function memoize(fn) {
  const cache = {};
  return function (x) {
    if (cache[x]) return cache[x];
    const result = fn(x);
    cache[x] = result;
    return result;
  };
}
const square = memoize((n) => n * n);
console.log("Memoize:", square(4), square(4)); // 16 from cache

// 10. Arrow Function
const sayHi = (name) => `Hi, ${name}`;
console.log("Arrow:", sayHi("John"));

function App() {
  return <div>Hello </div>;
}

export default App;
