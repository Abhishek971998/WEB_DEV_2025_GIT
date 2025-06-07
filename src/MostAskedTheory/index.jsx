/* eslint-disable no-unused-vars */
import React from "react";

const questions = {
  JavaScript: [
    {
      question: "Hoisting:",
      answer:
        "JavaScript's behavior of moving declarations to the top of a scope.",
      liner: "Hoisting lifts declarations to the top.",
    },
    {
      question: "== vs ===:",
      answer:
        "== compares values with type coercion; === compares both value and type.",
      liner: "Use === to avoid type conversion issues.",
    },
    {
      question: "Closures:",
      answer:
        "Functions that remember their outer scope even after the outer function has returned.",
      liner: "Closures capture and use outer variables.",
    },
    {
      question: "Event Delegation:",
      answer:
        "Technique where a single event listener handles events for multiple child elements.",
      liner: "Use fewer listeners via delegation.",
    },
    {
      question: "'this' keyword:",
      answer: "Refers to the object from which the function was called.",
      liner: "'this' depends on the caller.",
    },
    {
      question: "Arrow Functions:",
      answer:
        "Shorter syntax for functions that don't have their own 'this' binding.",
      liner: "Arrow functions inherit 'this'.",
    },
    {
      question: "var, let, const:",
      answer:
        "var is function scoped, let and const are block scoped. const cannot be reassigned.",
      liner: "Use let/const over var for block scope.",
    },
    {
      question: "Event Loop:",
      answer:
        "Handles asynchronous operations by placing callbacks in the task queue.",
      liner: "Event loop runs async code in order.",
    },
    {
      question: "Promises:",
      answer:
        "Objects representing the eventual completion or failure of an asynchronous operation.",
      liner: "Promise = future value container.",
    },
    {
      question: "Async/Await:",
      answer:
        "Cleaner syntax to work with promises, making async code look synchronous.",
      liner: "async/await makes async code readable.",
    },
    {
      question: "Callbacks:",
      answer: "Functions passed as arguments to other functions.",
      liner: "Callback = function in a function.",
    },
    {
      question: "null vs undefined:",
      answer:
        "null is an assignment value; undefined means a variable has been declared but not assigned.",
      liner: "undefined is uninitialized; null is intentional.",
    },
    {
      question: "NaN:",
      answer:
        "Stands for 'Not-a-Number' and is the result of invalid math operations.",
      liner: "NaN shows failed number conversion.",
    },
    {
      question: "typeof operator:",
      answer: "Returns the type of a variable as a string.",
      liner: "typeof tells variable's type.",
    },
    {
      question: "Shallow vs Deep Copy:",
      answer:
        "Shallow copy only copies top-level properties; deep copy copies all nested levels.",
      liner: "Deep = full clone, Shallow = top-level only.",
    },
    {
      question: "Template Literals:",
      answer: "Allow embedded expressions using backticks and ${}.",
      liner: "Use backticks for inline variables.",
    },
    {
      question: "Destructuring:",
      answer:
        "Unpack values from arrays or properties from objects into variables.",
      liner: "Destructuring simplifies variable extraction.",
    },
    {
      question: "Spread Operator:",
      answer: "Expands elements in arrays or objects.",
      liner: "Spread (...) unpacks items easily.",
    },
    {
      question: "forEach vs map:",
      answer:
        "forEach performs an operation on each element, map returns a new array.",
      liner: "Use map when you need a result array.",
    },
    {
      question: "Set:",
      answer: "Collection of unique values.",
      liner: "Set stores only unique values.",
    },
    {
      question: "let, const, var:",
      answer:
        "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned. Always prefer const by default, then let if needed, and avoid var.",
      liner: "const > let > var for variable declarations.",
    },
    {
      question: "this in JavaScript:",
      answer:
        "'this' refers to the object that is currently executing the code. Its value depends on how a function is called: global context, object method, constructor, or with call/apply/bind.",
      liner: "'this' context depends on function invocation.",
    },
    {
      question: "Promises and how they work:",
      answer:
        "Promises are objects representing the eventual completion or failure of an asynchronous operation. They have three states: pending, fulfilled, and rejected. They help avoid callback hell and provide better error handling.",
      liner: "Promises handle async operations elegantly.",
    },
    {
      question: "Async/Await vs Promises:",
      answer:
        "Async/await is syntactic sugar over Promises that makes asynchronous code look synchronous. It uses Promises under the hood but provides a more readable and maintainable way to write async code.",
      liner: "Async/await = cleaner Promise syntax.",
    },
    {
      question: "Event bubbling and capturing:",
      answer:
        "Event bubbling is when an event triggers on the innermost element and bubbles up through its parents. Event capturing is the opposite - the event starts from the outermost element and moves inward. The third phase is the target phase.",
      liner: "Events bubble up, capture down.",
    },
    {
      question: "Temporal Dead Zone (TDZ):",
      answer:
        "TDZ is the period between entering scope and variable declaration where the variable exists but cannot be accessed. It occurs with let and const declarations, preventing access before initialization.",
      liner: "TDZ prevents accessing let/const before declaration.",
    },
    {
      question: "== vs ===:",
      answer:
        "== performs type coercion before comparison, while === (strict equality) checks both value and type without coercion. Always use === to avoid unexpected type conversions.",
      liner: "=== checks type and value, == coerces types.",
    },
    {
      question: "null vs undefined:",
      answer:
        "undefined means a variable has been declared but not assigned a value. null is an explicit assignment of 'no value'. typeof null is 'object' while typeof undefined is 'undefined'.",
      liner: "undefined = uninitialized, null = intentional empty.",
    },
    {
      question: "map, filter, reduce:",
      answer:
        "map transforms each element and returns a new array, filter creates a new array with elements that pass a test, reduce accumulates array elements into a single value. They're chainable and don't mutate the original array.",
      liner: "map transforms, filter selects, reduce accumulates.",
    },
    {
      question: "Function Declaration vs Function Expression:",
      answer:
        "Function declarations are hoisted and can be called before declaration. Function expressions are not hoisted and must be defined before use. Arrow functions are a type of function expression.",
      liner: "Declarations hoist, expressions don't.",
    },
    {
      question: "Shallow vs Deep Copy:",
      answer:
        "A shallow copy creates a new object but references nested objects. A deep copy creates a completely new object with all nested objects copied. Use Object.assign() or spread for shallow, JSON.parse(JSON.stringify()) or structuredClone() for deep.",
      liner: "Shallow = nested references, Deep = complete copy.",
    },
    {
      question: "call, apply, bind:",
      answer:
        "call invokes function with given this and arguments as comma-separated values. apply takes arguments as an array. bind returns a new function with fixed this and optional initial arguments.",
      liner: "call(comma), apply(array), bind(new function).",
    },
    {
      question: "setTimeout vs setInterval:",
      answer:
        "setTimeout executes a function once after a specified delay. setInterval repeatedly executes a function at specified intervals until cleared. Both return an ID that can be used to cancel the execution.",
      liner: "setTimeout = once, setInterval = repeatedly.",
    },
    {
      question: "for...in vs for...of loops:",
      answer:
        "for...in iterates over enumerable properties of an object, including inherited ones. for...of iterates over values of iterable objects (arrays, strings, etc.). Use for...in for objects, for...of for arrays.",
      liner: "for...in = properties, for...of = values.",
    },
    {
      question: "Object.freeze() vs Object.seal():",
      answer:
        "Object.freeze() makes an object immutable (can't add, modify, or delete properties). Object.seal() prevents adding or deleting properties but allows modifying existing ones. Both prevent adding new properties.",
      liner: "freeze = immutable, seal = no add/delete.",
    },
    {
      question: "Array.map() vs Array.forEach():",
      answer:
        "map creates a new array with results of calling a function on every element. forEach executes a function for each element but doesn't return anything. Use map when you need a new array, forEach for side effects.",
      liner: "map = new array, forEach = side effects.",
    },
    {
      question: "Object.keys() vs Object.getOwnPropertyNames():",
      answer:
        "Object.keys() returns an array of enumerable property names. Object.getOwnPropertyNames() returns all property names (enumerable and non-enumerable) except Symbol properties.",
      liner: "keys = enumerable, getOwnPropertyNames = all.",
    },
    {
      question: "Array.splice() vs Array.slice():",
      answer:
        "splice modifies the original array by removing/replacing elements and returns removed elements. slice creates a new array with a portion of the original array without modifying it.",
      liner: "splice = modify, slice = copy portion.",
    },
    {
      question: "Object.create() vs new operator:",
      answer:
        "Object.create() creates a new object with specified prototype and properties. new operator creates an instance of a constructor function. Object.create() is more flexible for inheritance.",
      liner: "create = flexible, new = constructor instance.",
    },
    {
      question: "Array.reduce() vs Array.reduceRight():",
      answer:
        "reduce processes array from left to right, reduceRight from right to left. Both accumulate array elements into a single value. Use reduceRight when order matters.",
      liner: "reduce = left→right, reduceRight = right→left.",
    },
    {
      question: "Object.defineProperty() vs Object.defineProperties():",
      answer:
        "defineProperty defines a single property with descriptors. defineProperties defines multiple properties at once. Both allow setting property attributes like enumerable, configurable, and writable.",
      liner: "defineProperty = one, defineProperties = many.",
    },
    {
      question: "Array.some() vs Array.every():",
      answer:
        "some returns true if at least one element passes the test. every returns true only if all elements pass the test. Both stop iterating when the result is determined.",
      liner: "some = any true, every = all true.",
    },
    {
      question: "Object.assign() vs spread operator:",
      answer:
        "Object.assign() modifies the target object and returns it. Spread operator creates a new object. Both perform shallow copies. Spread is more readable and can't modify existing objects.",
      liner: "assign = modify, spread = new object.",
    },
    {
      question: "Array.find() vs Array.filter():",
      answer:
        "find returns the first element that passes the test. filter returns an array of all elements that pass the test. find stops after first match, filter checks all elements.",
      liner: "find = first match, filter = all matches.",
    },
    {
      question: "Object.getPrototypeOf() vs Object.setPrototypeOf():",
      answer:
        "getPrototypeOf returns the prototype of an object. setPrototypeOf sets the prototype of an object. Both are used for prototype manipulation, but setPrototypeOf can impact performance.",
      liner: "getPrototypeOf = read, setPrototypeOf = write.",
    },
    {
      question: "Array.includes() vs Array.indexOf():",
      answer:
        "includes returns a boolean indicating if an element exists. indexOf returns the index of the element or -1 if not found. includes is more readable and handles NaN correctly.",
      liner: "includes = boolean, indexOf = position.",
    },
    {
      question: "Object.is() vs === operator:",
      answer:
        "Object.is() is similar to === but handles special cases better. It considers +0 and -0 different and NaN equal to itself. === is more commonly used for general equality checks.",
      liner: "Object.is = special cases, === = general.",
    },
    {
      question: "Array.flat() vs Array.flatMap():",
      answer:
        "flat creates a new array with all sub-array elements concatenated. flatMap maps each element to an array and flattens the result. flatMap is more efficient than map followed by flat.",
      liner: "flat = flatten, flatMap = map + flatten.",
    },
    {
      question:
        "Object.getOwnPropertyDescriptor() vs Object.getOwnPropertyDescriptors():",
      answer:
        "getOwnPropertyDescriptor returns property descriptor for a single property. getOwnPropertyDescriptors returns descriptors for all properties. Both are useful for property inspection.",
      liner: "getOwnPropertyDescriptor = one, getOwnPropertyDescriptors = all.",
    },
    {
      question: "Array.from() vs Array.of():",
      answer:
        "Array.from() creates an array from array-like or iterable objects. Array.of() creates an array from its arguments. from is more flexible, of is simpler for fixed values.",
      liner: "from = iterable, of = arguments.",
    },
  ],
  React: [
    {
      question: "Components:",
      answer:
        "Reusable pieces of UI that can contain their own logic and state.",
      liner: "Components build React UIs.",
    },
    {
      question: "Props:",
      answer:
        "Read-only inputs to components that are passed from parent to child.",
      liner: "Props are read-only data.",
    },
    {
      question: "State:",
      answer:
        "Built-in object that stores property values belonging to a component.",
      liner: "State changes trigger re-renders.",
    },
    {
      question: "Hooks:",
      answer:
        "Functions that let you use state and other React features in functional components.",
      liner: "Hooks bring state & logic to functions.",
    },
    {
      question: "useEffect:",
      answer:
        "Used to perform side effects like data fetching or subscriptions in functional components.",
      liner: "useEffect runs after render.",
    },
    {
      question: "Virtual DOM:",
      answer: "Lightweight in-memory representation of the real DOM.",
      liner: "Virtual DOM boosts performance.",
    },
    {
      question: "JSX:",
      answer:
        "Syntax extension that looks like HTML and is used in React components.",
      liner: "JSX = HTML in JS.",
    },
    {
      question: "Controlled vs Uncontrolled Components:",
      answer:
        "Controlled components use state to control inputs; uncontrolled components use refs.",
      liner: "Controlled = React-managed, Uncontrolled = DOM-managed.",
    },
    {
      question: "useRef:",
      answer:
        "Used to persist values between renders and access DOM elements directly.",
      liner: "useRef gives direct DOM access.",
    },
    {
      question: "useState:",
      answer: "Lets you add state to functional components.",
      liner: "useState = local component state.",
    },
    {
      question: "React Router:",
      answer: "Library for routing in React applications.",
      liner: "React Router adds navigation support.",
    },
    {
      question: "Context:",
      answer:
        "Provides a way to pass data through the component tree without props.",
      liner: "Context avoids prop drilling.",
    },
    {
      question: "Higher-Order Components (HOCs):",
      answer: "Functions that take a component and return a new component.",
      liner: "HOC = component enhancer.",
    },
    {
      question: "Prop Drilling:",
      answer:
        "Passing data through multiple components even if not needed at every level.",
      liner: "Prop drilling = deep prop passing.",
    },
    {
      question: "React.memo:",
      answer:
        "HOC that memoizes a component to prevent unnecessary re-renders.",
      liner: "memo prevents useless renders.",
    },
    {
      question: "Lazy Loading:",
      answer:
        "Loading components only when they're needed using React.lazy and Suspense.",
      liner: "Lazy loading defers loading.",
    },
    {
      question: "Performance Optimization:",
      answer:
        "Using memoization, code splitting, and avoiding unnecessary re-renders.",
      liner: "Memoize & split code to optimize.",
    },
    {
      question: "Reconciliation:",
      answer: "Process of updating the DOM when state or props change.",
      liner: "React updates DOM via reconciliation.",
    },
    {
      question: "Class vs Functional Components:",
      answer:
        "Class components use lifecycle methods; functional components use hooks.",
      liner: "Hooks replaced class lifecycle methods.",
    },
    {
      question: "Fragments:",
      answer:
        "Let you group multiple elements without adding extra nodes to the DOM.",
      liner: "Fragments avoid extra DOM nodes.",
    },
    {
      question: "Controlled vs Uncontrolled Components:",
      answer:
        "Controlled components have their state managed by React through props and callbacks. Uncontrolled components maintain their own state internally using refs. Controlled components are preferred for form handling.",
      liner: "Controlled = React state, Uncontrolled = DOM state.",
    },
    {
      question: "useCallback and useMemo:",
      answer:
        "useCallback memoizes functions to prevent unnecessary re-renders of child components. useMemo memoizes computed values to optimize performance. Both help prevent expensive calculations on every render.",
      liner: "useCallback = memoized function, useMemo = memoized value.",
    },
    {
      question: "useLayoutEffect:",
      answer:
        "Runs synchronously after DOM mutations but before browser paint. Use useLayoutEffect when you need to measure DOM or prevent visual flicker.",
      liner: "useLayoutEffect = before paint, useEffect = after paint.",
    },
    {
      question: "React.memo and when should you use it:",
      answer:
        "React.memo is a HOC that memoizes a component to prevent re-renders if props haven't changed. Use it for expensive components or when you want to optimize performance by preventing unnecessary renders.",
      liner: "React.memo prevents unnecessary re-renders.",
    },
    {
      question: "useRef vs useState:",
      answer:
        "useState triggers re-renders when value changes, useRef doesn't. useRef persists between renders and can be used to store mutable values or reference DOM elements. useState is for values that should trigger UI updates.",
      liner: "useState = re-render, useRef = no re-render.",
    },
    {
      question: "React.lazy and Suspense:",
      answer:
        "React.lazy enables code-splitting by loading components only when needed. Suspense shows a fallback while the lazy component is loading. They help improve initial load time by splitting the bundle.",
      liner: "Lazy loading = load components on demand.",
    },
    {
      question: "useReducer vs useState:",
      answer:
        "useReducer is better for complex state logic with multiple sub-values or when next state depends on previous state. useState is simpler and better for basic state management. useReducer follows Redux pattern.",
      liner: "useReducer = complex state, useState = simple state.",
    },
    {
      question: "React Context:",
      answer:
        "Provides a way to pass data through the component tree without prop drilling. It's useful for global state like themes, user authentication, or language preferences. useContext hook is used to consume context.",
      liner: "Context = global state without prop drilling.",
    },
    {
      question: "Class vs Functional Components:",
      answer:
        "Class components use lifecycle methods and this keyword, while functional components use hooks. Functional components are simpler, more reusable, and have better performance. Hooks replaced lifecycle methods.",
      liner: "Functional + Hooks > Class components.",
    },
    {
      question: "React.forwardRef:",
      answer:
        "Allows a component to take a ref and pass it to a child component. It's useful when you need to access DOM elements of child components or when building reusable component libraries.",
      liner: "forwardRef = pass refs to child components.",
    },
    {
      question: "useImperativeHandle:",
      answer:
        "Customizes the instance value exposed to parent components when using ref. useRef creates a mutable ref object. useImperativeHandle is used with forwardRef for controlled ref exposure.",
      liner: "useImperativeHandle = controlled ref exposure.",
    },
    {
      question: "React.memo vs useMemo:",
      answer:
        "React.memo is a HOC that memoizes a component. useMemo is a hook that memoizes a value. Use React.memo for component memoization, useMemo for expensive calculations.",
      liner: "React.memo = component, useMemo = value.",
    },
    {
      question: "useLayoutEffect vs useEffect:",
      answer:
        "useLayoutEffect runs synchronously after DOM mutations but before browser paint. useEffect runs asynchronously after render is committed to screen. Use useLayoutEffect to prevent visual flicker.",
      liner: "useLayoutEffect = before paint, useEffect = after paint.",
    },
    {
      question: "React.lazy vs dynamic import:",
      answer:
        "React.lazy is a React-specific way to implement code-splitting. dynamic import is a JavaScript feature. React.lazy works with Suspense, dynamic import is more flexible but requires manual handling.",
      liner: "React.lazy = React-specific, dynamic import = general.",
    },
    {
      question: "useReducer vs Redux:",
      answer:
        "useReducer is a built-in hook for local state management. Redux is a state management library for global state. useReducer is simpler, Redux provides more features and middleware.",
      liner: "useReducer = local, Redux = global state.",
    },
    {
      question: "React.PureComponent vs React.memo:",
      answer:
        "PureComponent is for class components, React.memo is for function components. Both prevent unnecessary re-renders by shallow comparison of props. React.memo is more flexible with custom comparison.",
      liner: "PureComponent = class, React.memo = function.",
    },
    {
      question: "useCallback vs useMemo:",
      answer:
        "useCallback memoizes functions, useMemo memoizes values. Both prevent unnecessary re-renders. Use useCallback for functions passed as props, useMemo for expensive calculations.",
      liner: "useCallback = function, useMemo = value.",
    },
    {
      question: "React.forwardRef vs useImperativeHandle:",
      answer:
        "forwardRef passes refs to child components. useImperativeHandle customizes the ref value exposed to parent components. They're often used together for controlled ref exposure.",
      liner: "forwardRef = pass, useImperativeHandle = customize.",
    },
    {
      question: "React.lazy vs React.Suspense:",
      answer:
        "React.lazy enables code-splitting by loading components on demand. Suspense shows a fallback while lazy components are loading. They work together for better loading UX.",
      liner: "lazy = load, Suspense = show loading state.",
    },
    {
      question: "useRef vs useState:",
      answer:
        "useRef persists between renders without causing re-renders. useState triggers re-renders when value changes. Use useRef for values that shouldn't trigger updates, useState for values that should.",
      liner: "useRef = no re-render, useState = re-render.",
    },
    {
      question: "React.memo vs shouldComponentUpdate:",
      answer:
        "React.memo is for function components, shouldComponentUpdate is for class components. Both prevent unnecessary re-renders. React.memo is simpler, shouldComponentUpdate offers more control.",
      liner: "React.memo = function, shouldComponentUpdate = class.",
    },
    {
      question: "useReducer vs useState:",
      answer:
        "useReducer is better for complex state logic with multiple sub-values. useState is simpler for basic state management. useReducer follows Redux pattern, useState is more straightforward.",
      liner: "useReducer = complex, useState = simple.",
    },
    {
      question: "React.lazy vs React.lazy with Suspense:",
      answer:
        "React.lazy alone just enables code-splitting. With Suspense, it provides a better loading experience with fallback UI. Suspense is recommended for better UX.",
      liner: "lazy = split, lazy + Suspense = better UX.",
    },
    {
      question: "useCallback vs useMemo:",
      answer:
        "useCallback memoizes functions to prevent unnecessary re-renders of child components. useMemo memoizes computed values. Both help optimize performance by preventing expensive calculations.",
      liner: "useCallback = function, useMemo = value.",
    },
    {
      question: "React.memo vs useMemo:",
      answer:
        "React.memo is a HOC that memoizes a component. useMemo is a hook that memoizes a value. Use React.memo for component memoization, useMemo for expensive calculations.",
      liner: "React.memo = component, useMemo = value.",
    },
    {
      question: "useLayoutEffect vs useEffect:",
      answer:
        "useLayoutEffect runs synchronously after DOM mutations but before browser paint. useEffect runs asynchronously after render is committed to screen. Use useLayoutEffect to prevent visual flicker.",
      liner: "useLayoutEffect = before paint, useEffect = after paint.",
    },
    {
      question: "React.lazy vs dynamic import:",
      answer:
        "React.lazy is a React-specific way to implement code-splitting. dynamic import is a JavaScript feature. React.lazy works with Suspense, dynamic import is more flexible but requires manual handling.",
      liner: "React.lazy = React-specific, dynamic import = general.",
    },
    {
      question: "useReducer vs Redux:",
      answer:
        "useReducer is a built-in hook for local state management. Redux is a state management library for global state. useReducer is simpler, Redux provides more features and middleware.",
      liner: "useReducer = local, Redux = global state.",
    },
    {
      question: "React.PureComponent vs React.memo:",
      answer:
        "PureComponent is for class components, React.memo is for function components. Both prevent unnecessary re-renders by shallow comparison of props. React.memo is more flexible with custom comparison.",
      liner: "PureComponent = class, React.memo = function.",
    },
    {
      question: "useCallback vs useMemo:",
      answer:
        "useCallback memoizes functions, useMemo memoizes values. Both prevent unnecessary re-renders. Use useCallback for functions passed as props, useMemo for expensive calculations.",
      liner: "useCallback = function, useMemo = value.",
    },
    {
      question: "React.forwardRef vs useImperativeHandle:",
      answer:
        "forwardRef passes refs to child components. useImperativeHandle customizes the ref value exposed to parent components. They're often used together for controlled ref exposure.",
      liner: "forwardRef = pass, useImperativeHandle = customize.",
    },
  ],
};

export default function MostAskedTheory() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-500">📚</span>
            JavaScript & React Interview Questions
            <span className="text-sm font-normal text-gray-500 ml-2">
              (4+ Yrs)
            </span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {Object.entries(questions).map(([category, qaList]) => (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {category} Questions
              </h2>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {qaList.length} Questions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qaList.map((qa, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 rounded-lg shadow-sm border border-indigo-100/50 hover:shadow-md transition-all duration-200 hover:border-indigo-200 hover:-translate-y-0.5"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-xs text-white font-medium shadow-sm">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
                          <span className="text-indigo-500">⚡</span>
                          {qa.question.split(":")[0]}:
                        </h3>
                        <p className="text-sm text-slate-700 mb-3 leading-relaxed font-bold">
                          {qa.answer}
                        </p>
                        <div className="flex items-center gap-2 text-xs bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-3 py-1.5 rounded-full w-fit">
                          <span className="text-indigo-500">💡</span>
                          <span className="italic font-medium">{qa.liner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Revision Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold text-blue-700">
              Quick Revision Guide
            </h3>
            <span className="text-blue-500">📝</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(questions).map(([category, qaList]) => (
              <div key={category} className="bg-white rounded-lg p-3 shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2 text-sm">
                  {category} One-liners:
                </h4>
                <ul className="space-y-1.5">
                  {qaList.map((qa, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600 font-medium">
                        {qa.liner}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
