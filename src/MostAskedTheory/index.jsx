/* eslint-disable no-unused-vars */
import React from "react";

const questions = {
  JavaScript: [
    {
      question: "What is hoisting in JavaScript?",
      answer:
        "Hoisting is JavaScript's behavior of moving declarations to the top of a scope.",
      liner: "Hoisting lifts declarations to the top.",
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "== compares values with type coercion; === compares both value and type.",
      liner: "Use === to avoid type conversion issues.",
    },
    {
      question: "What is a closure?",
      answer:
        "A closure is a function that remembers its outer scope even after the outer function has returned.",
      liner: "Closures capture and use outer variables.",
    },
    {
      question: "Explain event delegation.",
      answer:
        "Event delegation is a technique where a single event listener handles events for multiple child elements.",
      liner: "Use fewer listeners via delegation.",
    },
    {
      question: "What is the 'this' keyword?",
      answer: "'this' refers to the object from which the function was called.",
      liner: "'this' depends on the caller.",
    },
    {
      question: "What are arrow functions?",
      answer:
        "Arrow functions are a shorter syntax for writing functions and do not have their own 'this'.",
      liner: "Arrow functions inherit 'this'.",
    },
    {
      question: "What is the difference between var, let, and const?",
      answer:
        "var is function scoped, let and const are block scoped. const cannot be reassigned.",
      liner: "Use let/const over var for block scope.",
    },
    {
      question: "What is the event loop?",
      answer:
        "The event loop handles asynchronous operations by placing callbacks in the task queue.",
      liner: "Event loop runs async code in order.",
    },
    {
      question: "What is a promise?",
      answer:
        "A promise is an object that represents the eventual completion or failure of an asynchronous operation.",
      liner: "Promise = future value container.",
    },
    {
      question: "What is async/await?",
      answer: "Async/await is a cleaner syntax to work with promises.",
      liner: "async/await makes async code readable.",
    },
    {
      question: "What is a callback function?",
      answer:
        "A callback is a function passed as an argument to another function.",
      liner: "Callback = function in a function.",
    },
    {
      question: "What is the difference between null and undefined?",
      answer:
        "null is an assignment value; undefined means a variable has been declared but not assigned.",
      liner: "undefined is uninitialized; null is intentional.",
    },
    {
      question: "What is NaN?",
      answer:
        "NaN stands for 'Not-a-Number' and is the result of invalid math operations.",
      liner: "NaN shows failed number conversion.",
    },
    {
      question: "What is the use of the 'typeof' operator?",
      answer: "It returns the type of a variable as a string.",
      liner: "typeof tells variable's type.",
    },
    {
      question: "What is a deep copy vs a shallow copy?",
      answer:
        "A shallow copy only copies top-level properties; a deep copy copies all nested levels.",
      liner: "Deep = full clone, Shallow = top-level only.",
    },
    {
      question: "What are template literals?",
      answer:
        "Template literals allow embedded expressions using backticks and ${}.",
      liner: "Use backticks for inline variables.",
    },
    {
      question: "What is destructuring?",
      answer:
        "Destructuring allows you to unpack values from arrays or properties from objects into variables.",
      liner: "Destructuring simplifies variable extraction.",
    },
    {
      question: "What is the spread operator?",
      answer:
        "The spread operator (...) expands elements in arrays or objects.",
      liner: "Spread (...) unpacks items easily.",
    },
    {
      question: "What is the difference between forEach and map?",
      answer:
        "forEach performs an operation on each element, map returns a new array.",
      liner: "Use map when you need a result array.",
    },
    {
      question: "What is a Set in JavaScript?",
      answer: "A Set is a collection of unique values.",
      liner: "Set stores only unique values.",
    },
  ],
  React: [
    {
      question: "What is a component in React?",
      answer: "A component is a reusable piece of UI.",
      liner: "Components build React UIs.",
    },
    {
      question: "What are props in React?",
      answer:
        "Props are inputs to components that are passed from parent to child.",
      liner: "Props are read-only data.",
    },
    {
      question: "What is state in React?",
      answer:
        "State is a built-in object that stores property values that belong to a component.",
      liner: "State changes trigger re-renders.",
    },
    {
      question: "What are hooks in React?",
      answer:
        "Hooks are functions that let you use state and other React features in functional components.",
      liner: "Hooks bring state & logic to functions.",
    },
    {
      question: "What is useEffect used for?",
      answer:
        "useEffect is used to perform side effects like data fetching or subscriptions in functional components.",
      liner: "useEffect runs after render.",
    },
    {
      question: "What is the virtual DOM?",
      answer:
        "The virtual DOM is a lightweight in-memory representation of the real DOM.",
      liner: "Virtual DOM boosts performance.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension that looks like HTML and is used in React components.",
      liner: "JSX = HTML in JS.",
    },
    {
      question:
        "What is the difference between controlled and uncontrolled components?",
      answer:
        "Controlled components use state to control inputs; uncontrolled components use refs.",
      liner: "Controlled = React-managed, Uncontrolled = DOM-managed.",
    },
    {
      question: "What is the useRef hook?",
      answer:
        "useRef is used to persist values between renders and access DOM elements directly.",
      liner: "useRef gives direct DOM access.",
    },
    {
      question: "What is the useState hook?",
      answer: "useState lets you add state to functional components.",
      liner: "useState = local component state.",
    },
    {
      question: "What is React Router?",
      answer: "React Router is a library for routing in React applications.",
      liner: "React Router adds navigation support.",
    },
    {
      question: "What is context in React?",
      answer:
        "Context provides a way to pass data through the component tree without props.",
      liner: "Context avoids prop drilling.",
    },
    {
      question: "What are higher-order components (HOCs)?",
      answer:
        "HOCs are functions that take a component and return a new component.",
      liner: "HOC = component enhancer.",
    },
    {
      question: "What is prop drilling?",
      answer:
        "Prop drilling is passing data through multiple components even if not needed at every level.",
      liner: "Prop drilling = deep prop passing.",
    },
    {
      question: "What is React.memo?",
      answer:
        "React.memo is a HOC that memoizes a component to prevent unnecessary re-renders.",
      liner: "memo prevents useless renders.",
    },
    {
      question: "What is lazy loading in React?",
      answer:
        "Lazy loading is loading components only when they're needed using React.lazy and Suspense.",
      liner: "Lazy loading defers loading.",
    },
    {
      question: "How do you optimize performance in React?",
      answer:
        "By using memoization, code splitting, and avoiding unnecessary re-renders.",
      liner: "Memoize & split code to optimize.",
    },
    {
      question: "What is reconciliation in React?",
      answer:
        "Reconciliation is the process of updating the DOM when state or props change.",
      liner: "React updates DOM via reconciliation.",
    },
    {
      question:
        "What is the difference between class and functional components?",
      answer:
        "Class components use lifecycle methods; functional components use hooks.",
      liner: "Hooks replaced class lifecycle methods.",
    },
    {
      question: "What are fragments in React?",
      answer:
        "Fragments let you group multiple elements without adding extra nodes to the DOM.",
      liner: "Fragments avoid extra DOM nodes.",
    },
  ],
};

export default function MostAskedTheory() {
  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        JavaScript & React Interview Questions (4+ Yrs)
      </h1>
      {Object.entries(questions).map(([category, qaList]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            {category} Questions
          </h2>
          <ul className="space-y-4">
            {qaList.map((qa, index) => (
              <li
                key={index}
                className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-400"
              >
                <p className="font-medium text-gray-800">Q: {qa.question}</p>
                <p className="text-gray-600 mt-1">A: {qa.answer}</p>
                <p className="text-sm text-gray-500 mt-1 italic">
                  ➡️ {qa.liner}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl">
        <h3 className="font-semibold text-yellow-700 mb-2">
          One-liners for Quick Revision:
        </h3>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {Object.entries(questions).flatMap(([_, qaList]) =>
            qaList.map((qa, i) => <li key={i}>{qa.liner}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}
