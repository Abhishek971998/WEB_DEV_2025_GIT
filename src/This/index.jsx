import React, { useState } from "react";
import "./index.css";

/*
THEORY: 'this' Keyword in JavaScript

1. What is 'this'?
   - 'this' is a special keyword that refers to the current execution context
   -  Its value depends on how and where a function is called, not where it's defined
   -  Understanding 'this' is crucial for object-oriented programming in JavaScript

2. Rules for 'this':
   a) Global Context:
      - In non-strict mode: 'this' refers to window object
      - In strict mode: 'this' is undefined
      - In modules: 'this' is undefined

   b) Object Methods:
      - When a function is called as an object method, 'this' refers to the object
      - Method shorthand and regular method definitions behave the same way

   c) Constructor Functions:
      - When used with 'new' keyword, 'this' refers to the newly created instance
      - Constructor functions create objects with their own properties

   d) Arrow Functions:
      - Don't have their own 'this' binding
      - Inherit 'this' from the enclosing scope (lexical scope)
      - Can't be used as constructors
      - Can't be bound to a different 'this' using call, apply, or bind

   e) Event Handlers:
      - In regular function event handlers, 'this' refers to the DOM element
      - In arrow function event handlers, 'this' inherits from surrounding scope

   f) Explicit Binding:
      - call(): Calls function with specified 'this' and individual arguments
      - apply(): Same as call, but takes arguments as an array
      - bind(): Creates new function with fixed 'this' value
*/

// Regular object with methods
const person = {
  name: "John",
  // Regular method - 'this' refers to person object
  // Output: "Hello, I'm John" (this.name refers to person.name)
  greet: function () {
    return `Hello, I'm ${this.name}`;
  },
  // Method shorthand - same behavior as regular method
  // Output: "Hi from John" (this.name refers to person.name)
  sayHi() {
    return `Hi from ${this.name}`;
  },
  // Arrow function - 'this' inherits from where it's defined
  // Output: "Arrow: name not accessible" (this is undefined in module scope)
  greetArrow: () => {
    return `Arrow: ${this?.name || "name not accessible"}`;
  },
};

// Constructor function example
function User(name) {
  // 'this' refers to the new instance being created
  this.name = name;
  // Regular method - 'this' refers to instance
  // Output: "My name is Alice" (this.name refers to instance property)
  this.sayName = function () {
    return `My name is ${this.name}`;
  };
  // Arrow function - 'this' is bound to instance when created
  // Output: "Arrow: My name is Alice" (this.name is captured from constructor)
  this.sayNameArrow = () => {
    return `Arrow: My name is ${this.name}`;
  };
}

function App() {
  const [output, setOutput] = useState("Click buttons to see results");
  const user = new User("Alice");

  // Regular function - 'this' depends on how it's called
  // Output: "Regular function this: undefined" (this is undefined in strict mode)
  function regularFunction() {
    return `Regular function this: ${this?.name || "undefined"}`;
  }

  // Arrow function - 'this' inherits from surrounding scope
  // Output: "Arrow function this: undefined" (this is undefined in module scope)
  const arrowFunction = () => {
    return `Arrow function this: ${this?.name || "undefined"}`;
  };

  // Explicit binding example
  const bindingDemo = {
    name: "Original",
    // Output depends on how it's called:
    // Normal: "Name: Original"
    // With call/apply/bind: "Name: New Context"
    sayName: function () {
      return `Name: ${this.name}`;
    },
  };

  const otherContext = { name: "New Context" };

  return (
    <div className="container">
      <h1>Understanding 'this' keyword</h1>

      <div className="output-section">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>

      <div className="example-section">
        <h2>1. Regular Function vs Arrow Function</h2>
        <button onClick={() => setOutput(regularFunction())}>
          Regular Function
        </button>
        <button onClick={() => setOutput(arrowFunction())}>
          Arrow Function
        </button>
      </div>

      <div className="example-section">
        <h2>2. Object Methods</h2>
        <button onClick={() => setOutput(person.greet())}>Object Method</button>
        <button onClick={() => setOutput(person.greetArrow())}>
          Object Arrow Method
        </button>
      </div>

      <div className="example-section">
        <h2>3. Constructor Functions</h2>
        <button onClick={() => setOutput(user.sayName())}>
          Constructor Method
        </button>
        <button onClick={() => setOutput(user.sayNameArrow())}>
          Constructor Arrow Method
        </button>
      </div>

      <div className="example-section">
        <h2>4. Explicit Binding</h2>
        <button
          onClick={() => setOutput(bindingDemo.sayName.call(otherContext))}
        >
          Using .call()
        </button>
        <button
          onClick={() => setOutput(bindingDemo.sayName.apply(otherContext))}
        >
          Using .apply()
        </button>
        <button
          onClick={() => setOutput(bindingDemo.sayName.bind(otherContext)())}
        >
          Using .bind()
        </button>
      </div>

      <div className="theory-section">
        <h2>Common Interview Questions</h2>
        <ol>
          <li>
            <strong>
              Q: What is the difference between regular functions and arrow
              functions regarding 'this'?
            </strong>
            <p>
              A: Regular functions have their own 'this' binding based on how
              they're called, while arrow functions inherit 'this' from their
              enclosing scope.
            </p>
          </li>
          <li>
            <strong>Q: How does 'this' behave in event handlers?</strong>
            <p>
              A: In regular function event handlers, 'this' refers to the DOM
              element that triggered the event. In arrow functions, it inherits
              from the surrounding scope.
            </p>
          </li>
          <li>
            <strong>
              Q: What's the difference between call(), apply(), and bind()?
            </strong>
            <p>
              A: call() and apply() immediately invoke the function with a
              specified 'this' value (apply() takes arguments as an array),
              while bind() creates a new function with a fixed 'this' value.
            </p>
          </li>
          <li>
            <strong>
              Q: Why doesn't 'this' work in arrow functions as object methods?
            </strong>
            <p>
              A: Arrow functions don't have their own 'this' binding; they
              inherit it from the enclosing scope, which is often not what you
              want for object methods.
            </p>
          </li>
          <li>
            <strong>Q: What is the Event Loop and how does it work?</strong>
            <p>
              A: The Event Loop is JavaScript's mechanism for handling
              asynchronous operations. It continuously checks the Call Stack and
              queues (Microtask and Callback), moving tasks to the Call Stack
              when it's empty.
            </p>
          </li>
          <li>
            <strong>
              Q: What's the difference between Microtasks and Macrotasks?
            </strong>
            <p>
              A: Microtasks (Promises, process.nextTick) have higher priority
              and are processed immediately after the current synchronous code.
              Macrotasks (setTimeout, setInterval) are processed in the next
              iteration of the event loop.
            </p>
          </li>
          <li>
            <strong>Q: How does the Virtual DOM improve performance?</strong>
            <p>
              A: The Virtual DOM creates a lightweight copy of the actual DOM,
              calculates the minimal necessary changes through diffing, and
              batches updates to reduce expensive DOM manipulations.
            </p>
          </li>
          <li>
            <strong>Q: What is Reconciliation in React?</strong>
            <p>
              A: Reconciliation is React's diffing algorithm that determines
              what changes need to be made to the real DOM by comparing the
              previous Virtual DOM tree with the new one.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
