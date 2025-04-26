Website Structure Suggestion:
Homepage/Landing: Brief intro, links to sections.
Navigation Bar: Links to HTML | CSS | JavaScript | React sections.
Each Section Page (e.g., HTML): Contains a list of Q&A relevant to that technology.
Website Content (Q&A Format):
(Homepage Intro)
Experienced Front-End Developer Theory Cheatsheet
Quickly refresh your understanding of core theory concepts frequently asked in front-end interviews. This guide focuses on HTML, CSS, JavaScript, and React topics relevant to experienced developers.
Navigate: HTML | CSS | JavaScript | React
(HTML Section) <a name="html"></a>
HTML Theory Q&A

Q: Explain the importance of semantic HTML elements. Why use <article>, <aside>, <nav>, <main> over generic <div>s?
A:
Accessibility: Screen readers use semantic elements to understand page structure and provide better navigation for users with disabilities.
SEO: Search engines use semantic tags to better understand the content's structure and importance, potentially improving ranking.
Maintainability: Code becomes more readable and self-documenting, making it easier for developers (including your future self) to understand the purpose of different sections.
Consistency: Provides a standard structure across web development. Using <div> for everything leads to "div soup," which is hard to parse visually and programmatically.

Q: What are ARIA attributes and why are they important for accessibility? Give an example.
A: ARIA (Accessible Rich Internet Applications) attributes enhance HTML semantics where native elements are insufficient, especially for dynamic content and custom UI components (like sliders, tabs, modals). They provide extra information to assistive technologies (like screen readers) about roles, states, and properties of elements.
Importance: Makes web applications usable for people with disabilities who rely on assistive tech. Bridges the gap between standard HTML and complex UI interactions.
Example: A custom button implemented with a <div> might need role="button" and aria-pressed="false" (or true) to convey its purpose and state to a screen reader. <div role="button" aria-pressed="false" tabindex="0">Click Me</div> (tabindex="0" makes it focusable).

Q: Describe the difference between localStorage, sessionStorage, and Cookies.
A:
localStorage: Stores key-value pairs persistently (even after the browser window is closed) within the user's browser for a specific origin. Data does not expire automatically. Capacity is around 5-10MB. Data is not sent with every HTTP request.

sessionStorage: Stores key-value pairs for the duration of the session (until the browser tab/window is closed). Data is not persistent across sessions. Capacity is similar to localStorage. Data is not sent with every HTTP request.

Cookies: Stores small pieces of data (up to 4KB) sent with every HTTP request to the server for that domain. Have an expiration date. Primarily used for session management (server-side tracking), personalization, and tracking. Can be accessed on both server and client.

Q: Explain the purpose and benefits of using async and defer attributes on <script> tags.
A: Both attributes allow the HTML parser to continue parsing the page while the script is being downloaded, improving page load performance compared to a blocking script tag.

async: Downloads the script asynchronously and executes it as soon as it's downloaded, potentially interrupting HTML parsing. The order of execution for multiple async scripts is not guaranteed (depends on download completion). Use for independent scripts (e.g., analytics).

defer: Downloads the script asynchronously but defers execution until after the HTML parsing is complete, just before the DOMContentLoaded event. Scripts with defer execute in the order they appear in the HTML. Use for scripts that need the full DOM or depend on execution order.

Q: What are Web Components (Custom Elements, Shadow DOM, HTML Templates)?
A: A suite of technologies allowing you to create reusable, encapsulated custom HTML elements with their own functionality and styling.

Custom Elements: APIs to define your own HTML tags (e.g., <my-custom-widget>).

Shadow DOM: Provides encapsulation for the element's structure and styles, preventing conflicts with the main document's CSS and JS. Styles inside don't leak out, and global styles don't leak in (mostly).

HTML Templates (<template>): Holds HTML markup that isn't rendered immediately but can be cloned and used later by JavaScript, often used as the basis for custom elements or dynamic content.
(CSS Section) <a name="css"></a>
CSS Theory Q&A

Q: Explain CSS Specificity. How is it calculated? How can you manage it effectively?
A: Specificity is the algorithm browsers use to determine which CSS rule applies if multiple rules target the same element. It's calculated based on the selector's components:
Inline Styles: (e.g., style="...") - Highest specificity (value 1000).
IDs: (e.g., #myId) - (value 0100).
Classes, Attributes, Pseudo-classes: (e.g., .myClass, [type="text"], :hover) - (value 0010).
Elements and Pseudo-elements: (e.g., div, ::before) - (value 0001).
Universal selector (\_) and combinators (+, >, ~, ' ') have no specificity value (0000). :not() itself doesn't add specificity, but its argument does. :where() has zero specificity.
!important overrides all specificity calculations (use sparingly!).
Management: Prefer using classes over IDs for styling. Keep selectors as short and specific as necessary. Avoid overly nested selectors. Use methodologies like BEM to create low-specificity, modular selectors. Avoid !important unless absolutely necessary (e.g., overriding third-party styles). Use :where() to intentionally keep specificity low for utility classes or defaults.

Q: Describe the difference between display: none;, visibility: hidden;, and opacity: 0;.
A:
display: none;: Removes the element completely from the document flow and rendering. It takes up no space, and its descendants are also not rendered. It's not accessible to screen readers (usually). Reflow/repaint occurs when toggled.
visibility: hidden;: Hides the element, but it still occupies its space in the layout. Descendants are also hidden but can be made visible again using visibility: visible;. It's generally not accessible to screen readers. Only repaint (usually) occurs when toggled.
opacity: 0;: Makes the element fully transparent, but it still occupies space and is part of the layout. It remains interactive (clickable, focusable) and is accessible to screen readers. Only affects rendering (compositing layer usually), often smoother for animations.
Q: Explain the CSS Box Model. What is the difference between content-box and border-box?
A: The CSS Box Model describes how elements are rendered as rectangular boxes with properties like content, padding, border, and margin.
content-box (default): The width and height properties apply only to the content area. Padding and border are added outside of this defined width/height, increasing the element's total rendered size. Total Width = width + padding-left + padding-right + border-left + border-right.
border-box: The width and height properties include the content, padding, and border. Padding and border are drawn inside the defined width/height. This often makes layout calculations more intuitive, especially for responsive design. Total Width = width (which includes content, padding, border).
It's common practice to set box-sizing: border-box; globally for easier layout management: _, _::before, \_::after { box-sizing: border-box; }.
Q: When would you use CSS Grid versus Flexbox?
A: Both are powerful layout modules, but they excel in different areas:
Flexbox (Flexible Box Layout): Best suited for laying out items in a single dimension (either a row or a column). Ideal for component-level layout, distributing space along one axis, aligning items within a container (e.g., navigation bars, form controls, card layouts where items flow linearly).
CSS Grid Layout: Best suited for laying out items in two dimensions (rows and columns simultaneously). Ideal for page-level layout, creating complex grid structures, aligning items across both rows and columns independently. Offers more control over placement and overlapping elements.
Synergy: They are not mutually exclusive and often work well together. A common pattern is to use Grid for the overall page structure and Flexbox for the components within grid cells.
Q: What are CSS Custom Properties (Variables) and what are their advantages?
A: CSS Custom Properties allow you to define reusable values (like colors, fonts, sizes) in one place and reference them throughout your CSS. They are defined using -- syntax (e.g., --main-color: #3498db;) and accessed using the var() function (e.g., color: var(--main-color);).
Advantages:
DRY (Don't Repeat Yourself): Reduces repetition, making code easier to maintain and update. Change a value in one place, and it updates everywhere.
Readability: Makes code more understandable by giving semantic names to values.
Theming: Easily change themes (e.g., dark/light mode) by redefining variables within a specific scope (like on the :root or a body class).
Dynamic Updates: Can be accessed and manipulated with JavaScript, allowing for dynamic style changes based on user interaction or application state.
Cascading Nature: Variables cascade and inherit like regular CSS properties.
Q: Explain the concept of the CSS Stacking Context.
A: A stacking context is formed by certain CSS properties (e.g., position: absolute/relative/fixed/sticky with a z-index other than auto, opacity less than 1, transform, filter). Within a stacking context, child elements are stacked according to specific rules (primarily z-index), independent of elements outside that context. An element with a higher z-index isn't always guaranteed to be visually on top of another element; it depends on whether they share the same stacking context or how their parent stacking contexts are ordered. Understanding this is crucial for troubleshooting z-index issues.
(JavaScript Section) <a name="javascript"></a>
JavaScript Theory Q&A
Q: Explain closures in JavaScript. Provide a practical use case.
A: A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function, even after the outer function has finished executing.
How it works: When a function is defined, it captures references to the variables available in its lexical scope (the scope where it was physically defined). If this function is returned or passed around and later executed outside its original scope, it still retains access to those captured variables.
Practical Use Case:
Data Privacy / Encapsulation: Creating "private" variables that can only be accessed or modified through specific methods defined within the closure (Module Pattern).
Event Handlers / Callbacks: Accessing variables from the outer scope within an event listener or callback function (e.g., remembering a loop counter value correctly using let or an IIFE).
Currying / Partial Application: Creating functions that remember some arguments.
Stateful Functions: Functions that maintain state between calls without using global variables.
// Example: Data Privacy
function createCounter() {
let count = 0; // Private variable captured by the closure
return {
increment: function() { count++; console.log(count); },
getCount: function() { return count; }
};
}

const counter = createCounter();
counter.increment(); // Output: 1
counter.increment(); // Output: 2
console.log(counter.count); // Output: undefined (cannot access directly)
console.log(counter.getCount()); // Output: 2
Use code with caution.
JavaScript
Q: Explain the difference between == (loose equality) and === (strict equality). Why is === generally preferred?
A:
== (Loose Equality): Compares two values for equality after performing type coercion if the types are different. This can lead to unexpected results (e.g., 0 == false is true, "" == false is true, null == undefined is true).
=== (Strict Equality): Compares two values for equality without performing type coercion. If the types are different, it immediately returns false.
Preference: === is generally preferred because it's predictable and avoids subtle bugs caused by implicit type coercion. It makes the code's intent clearer – you are comparing both value and type. Use == only when you specifically need type coercion, which is rare and often better handled explicitly.
Q: Explain this keyword in JavaScript and how its value is determined.
A: The this keyword refers to the context in which a function is executed. Its value is determined dynamically at call time, not definition time (except for arrow functions). Key rules:
Global Context: In the global scope (outside any function), this refers to the global object (window in browsers, global in Node.js). In strict mode ('use strict'), global this is undefined.
Function Context (Simple Call): When a regular function is called directly (e.g., myFunc()), this defaults to the global object (window/global) in non-strict mode, or undefined in strict mode.
Method Context: When a function is called as a method of an object (e.g., obj.myMethod()), this refers to the object the method was called on (obj).
Constructor Context: When a function is called with the new keyword (e.g., new MyConstructor()), this refers to the newly created instance object.
Explicit Binding (call, apply, bind): These methods allow you to explicitly set the value of this when calling a function.
func.call(thisArg, arg1, arg2, ...): Calls the function with this set to thisArg and arguments passed individually.
func.apply(thisArg, [argsArray]): Calls the function with this set to thisArg and arguments passed as an array.
func.bind(thisArg): Returns a new function where this is permanently bound to thisArg.
Arrow Functions: Arrow functions (=>) do not have their own this binding. They lexically inherit this from their surrounding (enclosing) non-arrow function scope at the time they are defined. call, apply, and bind have no effect on the this value of an arrow function.
Q: Explain prototypal inheritance in JavaScript.
A: JavaScript uses prototypal inheritance rather than classical inheritance (found in languages like Java or C++). Objects can inherit properties and methods directly from other objects.
Prototype Chain: Every JavaScript object has a hidden internal property (often accessible via **proto** or Object.getPrototypeOf()) that links it to another object called its "prototype". This prototype object also has its own prototype, and so on, forming a chain. The chain ends when a prototype is null.
Property Lookup: When you try to access a property on an object, JavaScript first looks for it directly on the object. If not found, it looks at the object's prototype, then the prototype's prototype, and so on, up the chain until the property is found or the chain ends (null).
Constructors and Prototypes: Functions have a prototype property. When a function is used as a constructor with new, the newly created object's internal prototype link points to the constructor function's prototype object. This is how instances created from the same constructor share methods (defined on the constructor's prototype) efficiently.
ES6 Classes: ES6 class syntax is primarily syntactic sugar over the existing prototypal inheritance mechanism. It provides a clearer, more familiar syntax but doesn't fundamentally change the underlying inheritance model.
Q: Explain Promises and Async/Await. How do they help manage asynchronous operations?
A: They are modern JavaScript features for handling asynchronous operations (like network requests, timers, file system access) more cleanly than traditional callbacks.
Promises: A Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It exists in one of three states:
pending: Initial state, neither fulfilled nor rejected.
fulfilled: The operation completed successfully (resolved).
rejected: The operation failed.
Promises have methods like .then() (for handling fulfillment), .catch() (for handling rejection), and .finally() (executes regardless of outcome). They allow chaining asynchronous operations in a more readable sequence than nested callbacks ("callback hell").
Async/Await: Syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code, which improves readability and maintainability.
async keyword: Placed before a function declaration (async function myFunc() {}) indicates that the function will return a Promise. If the function returns a non-Promise value, it's implicitly wrapped in a resolved Promise.
await keyword: Used inside an async function. It pauses the execution of the async function until the Promise it's waiting for settles (either resolves or rejects). If the Promise resolves, await returns the resolved value. If it rejects, it throws the rejection reason (which can be caught using try...catch).
Benefits: Avoid callback hell, better error handling (using try...catch with await), improved readability and code structure for sequential asynchronous tasks.
Q: What is the Event Loop? Explain how JavaScript handles asynchronous code (e.g., setTimeout, AJAX).
A: The Event Loop is a fundamental concept in JavaScript's concurrency model. JavaScript is single-threaded (meaning it can only execute one piece of code at a time), but it achieves concurrency using the event loop mechanism, typically provided by the hosting environment (browser or Node.js).
Components:
Call Stack: Where function calls are pushed onto and popped off as they execute. Only one function runs at a time.
Web APIs / Node APIs: Provided by the environment (e.g., setTimeout, DOM events, fetch). When an async operation like setTimeout(callback, 1000) is called, the browser/Node starts the timer; the callback is not put on the Call Stack immediately.
Callback Queue (Task Queue): When the async operation completes (e.g., the timer finishes, data arrives from fetch), its associated callback function is placed in the Callback Queue.
Microtask Queue: Holds callbacks for Promises (.then(), .catch(), .finally()) and other microtasks like queueMicrotask(). Microtasks have higher priority than regular tasks (macrotasks) in the Callback Queue.
Event Loop: Continuously checks if the Call Stack is empty. If it is, it takes the first task from the Microtask Queue (if any) and pushes it onto the Call Stack for execution. If the Microtask Queue is empty, it takes the first task from the Callback Queue (if any) and pushes it onto the Call Stack.
Process Example (setTimeout):
setTimeout(myCallback, 1000) is called.
The timer is handed off to the Web API. setTimeout returns, its execution context is popped from the Call Stack.
Other synchronous code runs.
After ~1000ms, the Web API pushes myCallback into the Callback Queue.
When the Call Stack becomes empty, the Event Loop checks the queues.
It finds myCallback in the Callback Queue (assuming Microtask Queue is empty).
myCallback is pushed onto the Call Stack and executed.
Q: Explain Shallow Copy vs. Deep Copy for objects and arrays.
A:
Shallow Copy: Creates a new object or array, but copies only the references to nested objects or arrays, not the nested objects/arrays themselves. If you modify a nested object in the copy, it will also affect the original, because both point to the same nested object in memory. Methods like Object.assign({}, obj), {...obj} (spread syntax), Array.prototype.slice(), [...arr] create shallow copies.
Deep Copy: Creates a completely independent copy of the object or array, including recursively copying all nested objects and arrays. Modifying the copy (even nested parts) will not affect the original. Achieving a true deep copy can be complex. Common methods include:
Using libraries like Lodash (\_.cloneDeep()).
JSON.parse(JSON.stringify(obj)): Simple but has limitations (loses functions, undefined, Dates become strings, cannot handle circular references).
Manual recursive function (complex to get right).
structuredClone(): A modern, built-in browser API designed specifically for deep cloning, handling more data types and circular references correctly.
(React Section) <a name="react"></a>
React Theory Q&A
Q: Explain the Virtual DOM and the reconciliation process in React.
A:
Virtual DOM (VDOM): An in-memory representation (a JavaScript object) of the actual DOM structure. It's a lightweight copy. When state changes in a React component, React first creates a new VDOM tree reflecting the updated state.
Reconciliation: The process React uses to update the actual browser DOM efficiently. It involves:
Diffing: React compares the new VDOM tree with the previous VDOM tree. It uses a heuristic diffing algorithm (optimized for typical UI updates) to find the minimal set of changes required. Key assumptions: different element types produce different trees; developers can hint at stable elements across renders using the key prop in lists.
Batching Updates: React batches multiple DOM updates together and applies them in a single step, minimizing expensive direct DOM manipulations, reflows, and repaints.
Benefit: Direct DOM manipulation is slow. By diffing the VDOM first and batching updates, React minimizes interactions with the real DOM, leading to better performance, especially in complex applications with frequent updates.
Q: What are React Hooks? Explain the rules of Hooks.
A: Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They allow you to use state, context, effects, and more without writing class components. Common hooks include useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef.
Rules of Hooks (Enforced by ESLint plugin):
Only Call Hooks at the Top Level: Don't call Hooks inside loops, conditions, or nested functions. Hooks must be called in the same order on every render to preserve their state correctly.
Only Call Hooks from React Functions: Call Hooks from React functional components or custom Hooks. Don't call them from regular JavaScript functions.
Why Rules? React relies on the consistent call order of Hooks between renders to associate state and effects with the correct Hook call.
Q: Explain useState and useEffect.
A:
useState: A Hook that lets you add state to functional components.
It returns an array with two elements: the current state value and a function to update that state.
const [count, setCount] = useState(0);
Calling the update function (e.g., setCount(newCount)) triggers a re-render of the component with the new state value. State updates may be asynchronous and batched.
useEffect: A Hook that lets you perform side effects in functional components. Side effects include data fetching, setting up subscriptions, manually changing the DOM, logging, setting timers, etc.
It accepts a function (the effect) and optionally a dependency array.
useEffect(() => { /_ effect code _/ }, [dependencies]);
No Dependency Array ([] omitted): Effect runs after every render.
Empty Dependency Array ([]): Effect runs only once after the initial render (componentDidMount equivalent).
Dependency Array with Values ([prop, state]): Effect runs after the initial render and whenever any value in the dependency array changes between renders.
Cleanup Function: The function passed to useEffect can optionally return another function. This cleanup function runs before the component unmounts and also before the effect runs again (if dependencies changed). Used for unsubscribing, clearing timers, etc.
Q: What is the difference between Controlled and Uncontrolled Components in React forms?
A: Relates to how form input state is managed:
Controlled Components: Form input elements (like <input>, <textarea>, <select>) have their value controlled by React state.
The value is set via a value prop linked to component state.
Changes are handled by an onChange handler that updates the React state using the state setter (e.g., setState).
The React state is the "single source of truth" for the input's value. Allows easy validation, formatting, and conditional logic. Generally the recommended approach in React.
Uncontrolled Components: Form input elements manage their own state internally within the DOM.
You don't set the value prop from React state.
To get the value, you typically use a ref to access the DOM node directly when needed (e.g., on form submission).
Simpler for basic forms, can be easier to integrate with non-React code, but makes implementing dynamic validation or conditional inputs harder.
Q: Explain Context API in React. When would you use it over prop drilling or state management libraries like Redux?
A: The Context API provides a way to pass data through the component tree without having to pass props down manually at every level ("prop drilling").
How it works:
React.createContext(defaultValue): Creates a Context object.
<MyContext.Provider value={/_ some value _/}>: A component that wraps part of the tree. It accepts a value prop, making this value available to all consuming components deep down the tree.
useContext(MyContext) Hook / <MyContext.Consumer> Component: Allows components to subscribe to context changes and access the provided value.
When to Use:
Global Data: For data considered "global" for a tree of React components, like current authenticated user, theme, preferred language.
Avoiding Prop Drilling: When you need to pass data deeply through many levels of components.
Context vs. Redux/Zustand/etc.:
Context: Built into React. Good for low-frequency updates of simple state shared across a component tree. Re-renders consumers when the context value changes. Can lead to performance issues if the value is complex or changes frequently, causing many consumers to re-render unnecessarily. Best suited for relatively static data or data that doesn't change rapidly.
Redux/Zustand: External libraries. Offer more features like middleware (for logging, async actions), time-travel debugging (with devtools), more optimized subscription models (components often re-render only if the specific data they selected from the store changes), and well-defined patterns for managing complex, frequently changing application state. Better suited for high-frequency updates or managing large, complex application state.
Q: How can you optimize performance in a React application? Mention a few techniques.
A:
Memoization (React.memo, useMemo, useCallback):
React.memo: A Higher-Order Component that memoizes a functional component, preventing re-renders if its props haven't changed (shallow comparison).
useMemo: Memoizes the result of an expensive calculation. Recalculates only if dependencies change.
useCallback: Memoizes a callback function instance. Useful for passing stable callbacks down to memoized child components (React.memo) to prevent them from re-rendering unnecessarily due to new function instances being created on every parent render.
Code Splitting / Lazy Loading (React.lazy, Suspense): Split your code into smaller chunks that are loaded on demand (e.g., per route or feature) instead of downloading the entire app bundle upfront. React.lazy lets you render a dynamic import as a regular component, and Suspense lets you specify a loading indicator while the lazy component is loading.
Windowing / Virtualization: For long lists or large tables, only render the items currently visible in the viewport (plus a small buffer). Libraries like react-window or react-virtualized help implement this.
Proper Use of key Prop: Use stable, unique key props when rendering lists. This helps React's diffing algorithm efficiently identify which items have changed, been added, or removed, minimizing DOM mutations. Avoid using array index as a key if the list order can change or items can be inserted/deleted.
Avoiding Unnecessary State Updates: Structure state appropriately. Avoid putting derived data directly into state if it can be calculated during render. Debounce/throttle expensive operations triggered by state changes.
Profiling: Use React DevTools Profiler to identify components that render too often or take too long to render. Analyze commit times and component interactions to pinpoint bottlenecks.
Optimize Context: Avoid putting frequently changing, complex objects directly into Context value prop, as it forces all consumers to re-render. Split contexts or use memoization techniques within the provider.
Q: Explain Higher-Order Components (HOCs), Render Props, and Custom Hooks. When might you prefer one pattern over the others for sharing component logic?
A: These are patterns for reusing component logic:
Higher-Order Components (HOCs): A function that takes a component as input and returns a new component, usually injecting additional props or wrapping it with specific behavior/UI. Example: withRouter(MyComponent).
Pros: Reusable logic abstraction.
Cons: Can lead to "wrapper hell" (deeply nested components in DevTools), prop name collisions, less clear where props originate from. Less common now Hooks are available.
Render Props: A pattern where a component receives a function as a prop (often named render or children) that it calls to render something, passing its own internal state or logic results as arguments to that function. Example: <DataProvider render={data => <DisplayComponent data={data} />} or <DataProvider>{data => <DisplayComponent data={data} />}</DataProvider>.
Pros: Explicit about where data/logic comes from (passed as function arguments), avoids wrapper hell.
Cons: Can introduce nesting inside JSX, less elegant syntax than Hooks for some cases.
Custom Hooks: Functions starting with use that encapsulate reusable stateful logic by leveraging built-in Hooks (useState, useEffect, etc.). They allow you to extract component logic into reusable functions. Example: const { data, loading } = useFetch('/api/data');.
Pros: Simplest and cleanest way to share stateful logic, avoids wrapper hell and JSX nesting issues, easy to follow data flow, leverages composition naturally.
Cons: Subject to the Rules of Hooks.
Preference: Custom Hooks are generally the preferred pattern in modern React for sharing stateful logic due to their simplicity and composability. Render Props are still useful, especially for sharing logic related to rendering itself (like in component libraries). HOCs are less favored now but still exist in older codebases or for certain cross-cutting concerns like styling libraries.
(Concluding Remark)
This cheatsheet covers common theoretical concepts. Real-world interviews often blend theory with practical coding challenges and system design questions. Good luck!

////// Interview

1.What is the difference between useContext and Redux?
2.Can we create multiple contexts inside useContext, and why is it not considered ideal for large-scale applications?
3.What is the difference between the Virtual DOM and the Real DOM?
4.What is the difference between State and Props?
5.What are Controlled and Uncontrolled Components? Write an example of an Uncontrolled Component.
6.What is useRef? Create a counter with Increment and Decrement functionality using useRef.
7.What is JSX? Why does the browser not understand JSX, and how does it increase efficiency?
8.What is Webpack and what is Bundling?

Coding Question:
1.Create a traffic light component with green, yellow, and red lights. On clicking a button, the light should change. Initially, it should show green. After 2 minutes, it should automatically switch to red for 30 seconds, then yellow for 10 seconds, and repeat this cycle continuously.
