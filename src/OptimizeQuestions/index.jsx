import React, { useState } from "react";

const FrontendFAQ = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const faqData = [
    {
      category: "Performance Optimization & Scalability",
      questions: [
        {
          question: "How do you handle 10k+ data in a dropdown efficiently?",
          answer:
            "Use virtualization (e.g., `react-virtualized` or `react-window`) to render only visible items, reducing DOM overhead. Alternatively, implement a searchable dropdown with debounced API calls.",
        },
        {
          question:
            "What techniques do you use to optimize frontend performance?",
          answer:
            "Minimize re-renders, use lazy loading, optimize images, leverage browser caching, reduce CSS/JS payload, and use CDNs.",
        },
        {
          question:
            "How do you reduce time to first paint (TTFP) and time to interactive (TTI)?",
          answer:
            "Defer non-critical CSS/JS, inline critical CSS, use server-side rendering (SSR), and optimize asset loading with `preload`/`prefetch`.",
        },
        {
          question:
            "What is virtualization in React, and how does it help in performance?",
          answer:
            "Virtualization renders only the visible portion of a large list, reducing DOM nodes and improving rendering speed (e.g., `react-virtualized`).",
        },
        {
          question:
            "How do you optimize a React application for better rendering performance?",
          answer:
            "Use `React.memo`, `useMemo`, `useCallback`, avoid unnecessary re-renders, and split components with code-splitting.",
        },
        {
          question: "What is lazy loading, and how do you implement it?",
          answer:
            "Lazy loading defers loading of non-critical resources. In React, use `React.lazy` and `Suspense` for components or images.",
        },
        {
          question: "How does debouncing and throttling work in JavaScript?",
          answer:
            "Debouncing delays execution until after a pause (e.g., search input). Throttling limits execution rate (e.g., scroll events). Both reduce unnecessary calls.",
        },
        {
          question:
            "What are service workers, and how do they improve performance?",
          answer:
            "Service workers are scripts that run in the background, enabling caching, offline support, and faster load times via resource interception.",
        },
        {
          question:
            "How do you handle infinite scrolling in a web application?",
          answer:
            "Use Intersection Observer API to detect when the user reaches the bottom, then fetch and append more data dynamically.",
        },
        {
          question:
            "How do you optimize images and assets in a frontend project?",
          answer:
            "Use modern formats (WebP), compress images, implement responsive images with `srcset`, and lazy load offscreen images.",
        },
      ],
    },
    {
      category: "JavaScript & Advanced Concepts",
      questions: [
        {
          question: "What is the difference between var, let, and const?",
          answer:
            "`var` is function-scoped and hoisted, `let` is block-scoped with no hoisting, `const` is block-scoped and immutable (but object properties can change).",
        },
        {
          question: "Explain event delegation and how it works.",
          answer:
            "Event delegation attaches a single listener to a parent element to handle events on descendants, leveraging event bubbling for efficiency.",
        },
        {
          question: "What is hoisting in JavaScript?",
          answer:
            "Hoisting moves variable and function declarations to the top of their scope during compilation, but not their assignments.",
        },
        {
          question: "Explain closures and their use cases.",
          answer:
            "Closures allow a function to retain access to its outer scope after execution. Used in data privacy, callbacks, and memoization.",
        },
        {
          question: "How does the reduce() method work in JavaScript?",
          answer:
            "`reduce()` iterates over an array, accumulating a single value based on a callback (e.g., summing numbers).",
        },
        {
          question: "What are JavaScript promises, and how do they work?",
          answer:
            "Promises represent asynchronous operations with states (pending, fulfilled, rejected), resolved using `.then()` or `.catch()`.",
        },
        {
          question: "How does async/await work?",
          answer:
            "`async` functions return promises, and `await` pauses execution until the promise resolves, simplifying async code.",
        },
        {
          question: "What is memoization, and how does it improve performance?",
          answer:
            "Memoization caches function results for given inputs, reducing redundant computations (e.g., Fibonacci).",
        },
        {
          question:
            "What is the difference between deep copy and shallow copy?",
          answer:
            "Shallow copy duplicates top-level properties, while deep copy recursively clones nested objects.",
        },
        {
          question: "Explain the difference between == and ===.",
          answer:
            "`==` performs type coercion, `===` checks value and type strictly.",
        },
        {
          question: "What is currying in JavaScript?",
          answer:
            "Currying transforms a function with multiple arguments into a sequence of single-argument functions (e.g., `f(a, b)` to `f(a)(b)`).",
        },
        {
          question: "How does the event loop work in JavaScript?",
          answer:
            "The event loop manages the call stack, task queue, and microtask queue, ensuring non-blocking async execution.",
        },
        {
          question: "Explain prototype inheritance in JavaScript.",
          answer:
            "Objects inherit properties/methods via their prototype chain, accessible through `__proto__` or `Object.create()`.",
        },
        {
          question: "What is the difference between call, apply, and bind?",
          answer:
            "`call` invokes with individual args, `apply` with an array, `bind` returns a new function with a fixed `this`.",
        },
        {
          question: "How do you handle memory leaks in JavaScript?",
          answer:
            "Avoid global variables, clean up event listeners, use weak references (e.g., `WeakMap`), and monitor with dev tools.",
        },
      ],
    },
    {
      category: "React & Frontend Frameworks",
      questions: [
        {
          question: "What is the difference between React and Angular?",
          answer:
            "React is a library for UI components with a virtual DOM, Angular is a full framework with two-way binding and dependency injection.",
        },
        {
          question: "Explain the React component lifecycle.",
          answer:
            "Mounting (`constructor`, `render`, `componentDidMount`), Updating (`render`, `componentDidUpdate`), Unmounting (`componentWillUnmount`).",
        },
        {
          question: "What are React hooks, and how do they work?",
          answer:
            "Hooks (e.g., `useState`, `useEffect`) add state and lifecycle features to functional components.",
        },
        {
          question:
            "What is the difference between useEffect and useLayoutEffect?",
          answer:
            "`useEffect` runs async after render, `useLayoutEffect` runs sync before browser paint.",
        },
        {
          question: "What is prop drilling, and how do you avoid it?",
          answer:
            "Prop drilling passes props through multiple layers. Avoid it with Context API or Redux.",
        },
        {
          question: "What is context API, and when should you use it?",
          answer:
            "Context API provides global state without prop drilling, ideal for themes or user data.",
        },
        {
          question:
            "How do you optimize a React application for better performance?",
          answer:
            "Use `React.memo`, `useMemo`, lazy loading, and minimize re-renders.",
        },
        {
          question: "What is React.memo, and when should you use it?",
          answer:
            "`React.memo` prevents re-renders if props don’t change, useful for pure components.",
        },
        {
          question: "What are React portals, and when should you use them?",
          answer:
            "Portals render children outside the parent DOM hierarchy, useful for modals or tooltips.",
        },
        {
          question: "How do you handle state management in React applications?",
          answer:
            "Use `useState` for local state, Context API for small apps, or Redux/MobX for complex apps.",
        },
        {
          question: "What is Redux, and how does it work?",
          answer:
            "Redux is a predictable state container with a single store, actions, and reducers.",
        },
        {
          question:
            "Explain server-side rendering (SSR) and client-side rendering (CSR).",
          answer:
            "SSR renders on the server for faster initial load and SEO, CSR renders in the browser for interactivity.",
        },
        {
          question: "What are React Suspense and React.lazy?",
          answer:
            "`React.lazy` enables lazy loading of components, `Suspense` handles loading states.",
        },
        {
          question: "What is Next.js, and how does it improve performance?",
          answer:
            "Next.js is a React framework with SSR, static site generation, and built-in optimizations.",
        },
        {
          question: "How do you test React components?",
          answer:
            "Use Jest for unit tests and React Testing Library for rendering and interaction tests.",
        },
      ],
    },
    {
      category: "CSS & Styling",
      questions: [
        {
          question: "What are the different positioning techniques in CSS?",
          answer:
            "Static (default), relative (offset from normal), absolute (relative to parent), fixed (viewport), sticky (hybrid).",
        },
        {
          question: "What is CSS Grid, and how does it work?",
          answer:
            "CSS Grid is a 2D layout system using rows and columns, defined with `grid-template` properties.",
        },
        {
          question: "What is the difference between flexbox and grid?",
          answer:
            "Flexbox is 1D (row or column), Grid is 2D (both axes), better for complex layouts.",
        },
        {
          question: "How do you implement a sticky header using CSS?",
          answer: "Use `position: sticky; top: 0;` on the header element.",
        },
        {
          question:
            "What is the difference between absolute, relative, fixed, and sticky positioning?",
          answer:
            "Absolute: relative to nearest positioned ancestor, Relative: offset from itself, Fixed: viewport, Sticky: toggles between relative and fixed.",
        },
        {
          question: "What are CSS pre-processors like SASS and LESS?",
          answer:
            "They extend CSS with variables, nesting, and mixins, compiled to standard CSS.",
        },
        {
          question: "How do you optimize CSS for better performance?",
          answer:
            "Minify CSS, use critical CSS, avoid deep selectors, and reduce reflows.",
        },
        {
          question: "What is critical CSS, and why is it important?",
          answer:
            "Critical CSS is the minimal CSS for above-the-fold content, improving perceived load time.",
        },
        {
          question: "What is the difference between rem, em, vh, vw, and px?",
          answer:
            "`rem` (root font size), `em` (parent font size), `vh/vw` (viewport percentage), `px` (fixed pixels).",
        },
        {
          question:
            "How do you create a responsive design using media queries?",
          answer:
            "Use `@media` rules to adjust styles based on screen size (e.g., `max-width: 768px`).",
        },
      ],
    },
    {
      category: "API Integration & State Management",
      questions: [
        {
          question: "How do you handle large API responses efficiently?",
          answer:
            "Paginate data, use virtualization for rendering, and cache responses.",
        },
        {
          question: "What is debouncing, and how does it help with API calls?",
          answer:
            "Debouncing delays API calls until user input stops, reducing unnecessary requests.",
        },
        {
          question: "How do you handle pagination in frontend applications?",
          answer:
            "Fetch data in chunks, display page controls, and update UI based on user navigation.",
        },
        {
          question:
            "How do you handle authentication and authorization in React apps?",
          answer:
            "Use JWT tokens, store in `localStorage` or cookies, and protect routes with HOCs or hooks.",
        },
        {
          question: "What is the difference between REST API and GraphQL?",
          answer:
            "REST uses fixed endpoints, GraphQL allows flexible queries with a single endpoint.",
        },
        {
          question: "How do you handle caching in frontend applications?",
          answer:
            "Use browser cache (`Cache-Control`), `localStorage`, or libraries like SWR/Redux.",
        },
        {
          question: "What is CORS, and how do you handle it?",
          answer:
            "CORS restricts cross-origin requests. Handle with server-side headers or proxies.",
        },
        {
          question: "What are WebSockets, and how do they work?",
          answer:
            "WebSockets enable real-time, bidirectional communication via a persistent connection.",
        },
        {
          question: "How do you handle error boundaries in React?",
          answer:
            "Use `componentDidCatch` in class components or libraries like `react-error-boundary`.",
        },
        {
          question:
            "What is the difference between localStorage, sessionStorage, and cookies?",
          answer:
            "`localStorage` persists until cleared, `sessionStorage` lasts per session, cookies have expiration and server access.",
        },
      ],
    },
    {
      category: "Browser & Security",
      questions: [
        {
          question:
            "What are Cross-Origin Resource Sharing (CORS) issues, and how do you fix them?",
          answer:
            "CORS blocks unauthorized cross-origin requests. Fix with server-side `Access-Control-Allow-Origin` headers.",
        },
        {
          question:
            "What are same-origin policies, and why are they important?",
          answer:
            "Same-origin policies restrict resource access to the same domain, enhancing security.",
        },
        {
          question: "How do you prevent XSS (Cross-Site Scripting)?",
          answer:
            "Sanitize inputs, use CSP, escape output, and avoid `dangerouslySetInnerHTML`.",
        },
        {
          question:
            "What is CSRF (Cross-Site Request Forgery), and how do you prevent it?",
          answer:
            "CSRF tricks users into unwanted actions. Prevent with tokens, same-site cookies, and validation.",
        },
        {
          question: "What are content security policies (CSP)?",
          answer:
            "CSP restricts resource loading to trusted sources, mitigating XSS risks.",
        },
        {
          question: "What is lazy loading, and how does it help performance?",
          answer:
            "Lazy loading defers non-critical resources, speeding up initial load times.",
        },
        {
          question: "How do you detect and handle memory leaks in the browser?",
          answer:
            "Use Chrome DevTools (Heap Snapshots), remove unused listeners, and avoid large global objects.",
        },
        {
          question: "What is service worker, and how does it help in PWA?",
          answer:
            "Service workers enable caching and offline functionality, enhancing PWA performance.",
        },
        {
          question: "How do you debug frontend performance issues?",
          answer:
            "Use Lighthouse, Chrome DevTools (Performance tab), and analyze network/waterfall charts.",
        },
        {
          question: "What is WebAssembly, and how does it improve performance?",
          answer:
            "WebAssembly runs compiled code in the browser, offering near-native speed for complex tasks.",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Frontend Interview Questions & Answers</h1>
      {faqData.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2
            onClick={() => toggleCategory(section.category)}
            style={{ cursor: "pointer", color: "#007BFF" }}
          >
            {section.category}{" "}
            {expandedCategory === section.category ? "▼" : "▶"}
          </h2>
          {expandedCategory === section.category && (
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {section.questions.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "15px" }}>
                  <div>
                    <div>
                      <strong>{item.question}</strong>
                    </div>
                    <div>{item.answer}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrontendFAQ;
