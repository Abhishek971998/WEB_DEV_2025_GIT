import React, { useState } from "react";

const topics = [
  {
    id: "execution-context",
    title: "Execution Context & Call Stack",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600/50 shadow-lg">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            Execution Context & Call Stack
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Execution Context is the environment where JavaScript code is
            executed. It contains the code that's currently running and
            everything that helps in its execution. The Call Stack is a
            mechanism that keeps track of function calls in JavaScript.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Global Execution Context
            </h3>
            <p className="text-gray-300 mb-4">
              When JavaScript code runs, it creates a global execution context
              that contains:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Global object (window in browsers)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                this keyword
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Outer environment
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Function Execution Context
            </h3>
            <p className="text-gray-300 mb-4">
              Created when a function is invoked:
            </p>
            <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-gray-300 overflow-x-auto">
              {`function greet(name) {
  console.log('Hello ' + name);
}
greet('John'); // Creates new execution context`}
            </pre>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Lexical Environment
            </h3>
            <p className="text-gray-300 mb-4">
              Where code is physically written in the source code:
            </p>
            <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-gray-300 overflow-x-auto">
              {`const global = 'I am global';

function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    const innerVar = 'I am inner';
    console.log(global, outerVar, innerVar);
  }
  
  inner();
}`}
            </pre>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Hoisting
            </h3>
            <p className="text-gray-300 mb-4">
              JavaScript moves declarations to the top:
            </p>
            <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-gray-300 overflow-x-auto">
              {`console.log(x); // undefined
var x = 5;

// Function declarations are hoisted
sayHello(); // Works!
function sayHello() {
  console.log('Hello!');
}`}
            </pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "closures-scope",
    title: "Closures & Scope",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Closures & Scope
          </h3>
          <p className="text-gray-300">
            A closure is a function that has access to variables from its outer
            (enclosing) lexical scope, even after the outer function has
            returned. Scope defines the accessibility of variables, functions,
            and objects in your code.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">
          Function Scope vs Block Scope
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Function scope
function example() {
  var functionScoped = 'I am function scoped';
}

// Block scope
{
  let blockScoped = 'I am block scoped';
  const alsoBlockScoped = 'I am also block scoped';
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Lexical Scoping</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`const global = 'I am global';

function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    console.log(outerVar); // Can access outerVar
  }
  
  inner();
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Closures & Memory
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1`}
        </pre>
      </div>
    ),
  },
  {
    id: "this-keyword",
    title: "this Keyword Mastery",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            this Keyword Mastery
          </h3>
          <p className="text-gray-300">
            The 'this' keyword in JavaScript refers to the object that is
            currently executing the code. Its value is determined by how a
            function is called, and it can be different depending on the
            context.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">Global Context</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`console.log(this); // Window object in browser`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Object Method Context
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`const person = {
  name: 'John',
  greet() {
    console.log('Hello, ' + this.name);
  }
};

person.greet(); // Hello, John`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Arrow Functions & this
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`const person = {
  name: 'John',
  greet: () => {
    console.log('Hello, ' + this.name); // undefined
  }
};`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          call(), apply(), bind()
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

const person = { name: 'John' };

greet.call(person, 'Hello'); // Hello, John
greet.apply(person, ['Hi']); // Hi, John
const boundGreet = greet.bind(person);
boundGreet('Hey'); // Hey, John`}
        </pre>
      </div>
    ),
  },
  {
    id: "async-js",
    title: "Asynchronous JavaScript",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Asynchronous JavaScript
          </h3>
          <p className="text-gray-300">
            Asynchronous JavaScript allows code to run in the background without
            blocking the main thread. It's essential for handling operations
            like API calls, file operations, and other time-consuming tasks.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">Callback Hell</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Callback Hell Example
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Promises</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Promise Example
fetchUser(userId)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">async / await</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// async/await Example
async function getComments() {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Event Loop</h3>
        <p className="text-gray-300">
          The event loop is what allows JavaScript to be non-blocking:
        </p>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Output: 1, 4, 3, 2`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Microtasks vs Macrotasks
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Microtasks (Promise callbacks, process.nextTick)
Promise.resolve().then(() => console.log('Microtask'));

// Macrotasks (setTimeout, setInterval, setImmediate)
setTimeout(() => console.log('Macrotask'), 0);`}
        </pre>
      </div>
    ),
  },
  {
    id: "oop-js",
    title: "Object-Oriented JS",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Object-Oriented JS
          </h3>
          <p className="text-gray-300">
            Object-Oriented Programming in JavaScript is a programming paradigm
            that uses objects to organize code. It includes concepts like
            inheritance, encapsulation, and polymorphism.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">Prototypes</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Prototype Example
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log('Hello, ' + this.name);
};

const john = new Person('John');
john.greet(); // Hello, John`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Constructor Functions
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function Car(make, model) {
  this.make = make;
  this.model = model;
  this.start = function() {
    console.log('Starting ' + this.make + ' ' + this.model);
  };
}

const myCar = new Car('Toyota', 'Camry');`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          ES6 Class Syntax
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a sound.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Inheritance</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.year = year;
  }
}`}
        </pre>
      </div>
    ),
  },
  {
    id: "functional-programming",
    title: "Functional Programming",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Functional Programming
          </h3>
          <p className="text-gray-300">
            Functional Programming is a programming paradigm that treats
            computation as the evaluation of mathematical functions and avoids
            changing state and mutable data. It emphasizes pure functions and
            immutability.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">Pure Functions</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Pure Function
function add(a, b) {
  return a + b;
}

// Impure Function
let total = 0;
function addToTotal(x) {
  total += x;
  return total;
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Immutability</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Mutable
const arr = [1, 2, 3];
arr.push(4);

// Immutable
const arr = [1, 2, 3];
const newArr = [...arr, 4];`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Higher-order Functions
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function multiplyBy(factor) {
  return function(x) {
    return x * factor;
  };
}

const multiplyByTwo = multiplyBy(2);
console.log(multiplyByTwo(4)); // 8`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Array Methods</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(x => x * 2);

// filter
const even = numbers.filter(x => x % 2 === 0);

// reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);`}
        </pre>
      </div>
    ),
  },
  {
    id: "modules",
    title: "Modules",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Modules</h3>
          <p className="text-gray-300">
            Modules in JavaScript are a way to organize and structure code. They
            help in splitting code into smaller, reusable pieces and managing
            dependencies between different parts of an application.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">ES6 Modules</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">IIFE</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`(function() {
  const private = 'I am private';
  
  window.public = {
    getPrivate() {
      return private;
    }
  };
})();`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">CommonJS</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// main.js
const math = require('./math.js');`}
        </pre>
      </div>
    ),
  },
  {
    id: "advanced-patterns",
    title: "Advanced Patterns",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Advanced Patterns
          </h3>
          <p className="text-gray-300">
            Design patterns are reusable solutions to common programming
            problems. They help in writing more maintainable, scalable, and
            efficient code by providing proven approaches to specific problems.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">
          Debounce & Throttle
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Currying</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Memoization</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize(n => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Factory Functions
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`function createUser(name, role) {
  return {
    name,
    role,
    sayHello() {
      console.log('Hello, I'm ' + this.name + ' and I'm a ' + this.role);
    }
  };
}

const admin = createUser('John', 'admin');
const user = createUser('Jane', 'user');`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Singleton Pattern
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`class Singleton {
  static instance;
  
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Observer Pattern
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}`}
        </pre>
      </div>
    ),
  },
  {
    id: "web-apis",
    title: "Web APIs & DOM",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Web APIs & DOM
          </h3>
          <p className="text-gray-300">
            Web APIs provide interfaces to interact with the browser and web
            services. The DOM (Document Object Model) is a programming interface
            for HTML and XML documents, representing the structure of a webpage.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">fetch() & Axios</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// fetch
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Axios
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">DOM Traversal</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Select elements
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');

// Traverse DOM
const parent = element.parentElement;
const children = element.children;
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          DOM Manipulation
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Create element
const div = document.createElement('div');
div.textContent = 'Hello World';

// Add to DOM
document.body.appendChild(div);

// Modify element
div.classList.add('new-class');
div.style.color = 'red';
div.setAttribute('data-id', '123');`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">
          Event Delegation
        </h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`document.querySelector('.parent').addEventListener('click', (e) => {
  if (e.target.matches('.child')) {
    console.log('Child clicked!');
  }
});`}
        </pre>
      </div>
    ),
  },
  {
    id: "performance",
    title: "Performance Optimization",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Performance Optimization
          </h3>
          <p className="text-gray-300">
            Performance optimization in JavaScript involves techniques and best
            practices to improve the speed, efficiency, and overall performance
            of web applications. It includes strategies for loading, rendering,
            and executing code.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-blue-400">Lazy Loading</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Image lazy loading
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" />

// Component lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Virtual DOM</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// React's Virtual DOM
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
        </pre>

        <h3 className="text-xl font-semibold text-blue-400">Code Splitting</h3>
        <pre className="bg-gray-900 p-4 rounded border border-gray-700 text-gray-300">
          {`// Dynamic import
const module = await import('./module.js');

// React code splitting
const About = React.lazy(() => import('./About'));
const Contact = React.lazy(() => import('./Contact'));`}
        </pre>
      </div>
    ),
  },
];

const JSAdvanced = () => {
  const [activeTab, setActiveTab] = useState("execution-context");

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
    if (!Array.prototype.myincludes) {
      Array.prototype.myincludes = function (element) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === element) {
            return true;
          }
        }
        return false;
      };
    }

    //polyfill for Array.prototype.map
    if (!Array.prototype.mymap) {
      Array.prototype.mymap = function (callback, thisArg) {
        var result = [];
        for (var i = 0; i < this.length; i++) {
          if (i in this) {
            result.push(callback.call(thisArg, this[i], i, this));
          }
        }
        return result;
      };
    }
    let obj = {};
    console.log("Object.keys(obj):", Object.values(obj)); // Should return an empty array
    console.log("Object.keys(obj):", Object.values(obj)); // Should return an empty array
    console.dir(Array.prototype);

    return <div>Hello </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            JavaScript Advanced Concepts
          </span>
        </h1>

        {/* Tabs */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                activeTab === topic.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {topics.find((topic) => topic.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default JSAdvanced;
