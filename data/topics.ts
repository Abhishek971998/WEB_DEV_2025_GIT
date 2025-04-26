import { Topic } from "../types";

export const topics: Topic[] = [
  {
    id: "this-keyword",
    title: "this Keyword & Bindings",
    category: "javascript",
    summary:
      'The "this" keyword in JavaScript refers to the current execution context. Its value depends on how and where a function is called, not where it\'s defined.',
    codeExamples: [
      {
        title: "Different Types of Bindings",
        code: `// Default Binding
const showThis = function() {
  console.log(this); // window/global in non-strict, undefined in strict
};
showThis();

// Implicit Binding
const user = {
  name: 'John',
  greet() {
    console.log(\`Hello, \${this.name}!\`);
  }
};
user.greet(); // "Hello, John!"

// Explicit Binding
function introduce(age) {
  console.log(\`I'm \${this.name}, \${age} years old\`);
}
const person = { name: 'Alice' };
introduce.call(person, 30); // "I'm Alice, 30 years old"
introduce.apply(person, [30]); // Same result
const boundIntroduce = introduce.bind(person);
boundIntroduce(30); // Same result`,
        explanation:
          "This example shows the four ways this can be bound: default binding, implicit binding, explicit binding (call/apply), and hard binding (bind).",
      },
      {
        title: "Arrow Functions and this",
        code: `const obj = {
  name: 'Object',
  regularMethod: function() {
    console.log('Regular:', this.name);
    
    setTimeout(function() {
      console.log('Callback:', this.name); // undefined
    }, 100);
    
    setTimeout(() => {
      console.log('Arrow:', this.name); // 'Object'
    }, 100);
  }
};

obj.regularMethod();`,
        explanation:
          "Arrow functions inherit this from their enclosing scope, making them useful for callbacks and event handlers where you want to preserve the outer this context.",
      },
    ],
    qa: [
      {
        question:
          "How does this behave differently in arrow functions versus regular functions?",
        answer:
          "Regular functions have their own this binding which is determined by how they are called. Arrow functions inherit this from their enclosing scope and cannot be rebound using call, apply, or bind.",
      },
      {
        question: "What are the common pitfalls with this in event handlers?",
        answer:
          "In event handlers, this typically refers to the DOM element that triggered the event. To maintain component context, you either need to bind the handler in the constructor, use an arrow function, or use class fields syntax.",
      },
    ],
  },
  {
    id: "es6-features",
    title: "ES6+ Features",
    category: "javascript",
    summary:
      "Modern JavaScript (ES6+) introduced many powerful features including destructuring, spread/rest operators, optional chaining, and more.",
    codeExamples: [
      {
        title: "Destructuring & Spread",
        code: `// Object Destructuring
const user = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

const { name, age, address: { city } } = user;
console.log(name, age, city); // John 30 New York

// Array Destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first, second, rest); // 1 2 [3, 4, 5]

// Spread Operator
const newUser = {
  ...user,
  age: 31, // Override specific properties
  role: 'admin' // Add new properties
};

const combined = [...numbers, 6, 7, 8];`,
        explanation:
          "Destructuring provides a concise way to extract values from objects and arrays. The spread operator allows for easy object/array copying and merging.",
      },
      {
        title: "Optional Chaining & Nullish Coalescing",
        code: `const response = {
  data: {
    user: {
      posts: null
    }
  }
};

// Optional Chaining
const postCount = response?.data?.user?.posts?.length ?? 0;

// Nullish Coalescing
const username = response?.data?.user?.name ?? 'Anonymous';

// Traditional vs Modern
const traditional = response && 
  response.data && 
  response.data.user && 
  response.data.user.posts;

const modern = response?.data?.user?.posts;`,
        explanation:
          "Optional chaining (?.) safely accesses nested properties, while nullish coalescing (??) provides a default value when a value is null or undefined.",
      },
    ],
    qa: [
      {
        question: "What are the advantages of using destructuring?",
        answer:
          "Destructuring makes code more readable and concise, allows for default values, enables easy property/value extraction, and facilitates working with complex data structures.",
      },
      {
        question:
          "When should you use nullish coalescing (??) vs logical OR (||)?",
        answer:
          "Use ?? when you want to fall back to a default value only for null or undefined. Use || when you want to fall back for any falsy value (including empty string, 0, false).",
      },
    ],
  },
  {
    id: "functional-programming",
    title: "Functional Programming",
    category: "javascript",
    summary:
      "Functional programming in JavaScript involves using pure functions, higher-order functions, and methods like map, filter, and reduce to transform data immutably.",
    codeExamples: [
      {
        title: "Array Methods (Map, Filter, Reduce)",
        code: `const numbers = [1, 2, 3, 4, 5];

// Map: Transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter: Keep elements that pass a test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Reduce: Accumulate a single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Chaining methods
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, curr) => acc + curr, 0);
console.log(result); // 12`,
        explanation:
          "These array methods provide a declarative way to transform data without mutating the original array.",
      },
      {
        title: "Pure Functions & Immutability",
        code: `// Pure Function
function addTodo(todos, newTodo) {
  return [...todos, newTodo];
}

// Impure Function (Avoid)
function addTodoImpure(todos, newTodo) {
  todos.push(newTodo); // Mutates original array
  return todos;
}

// Immutable Updates
const state = {
  user: {
    name: 'John',
    preferences: {
      theme: 'light'
    }
  }
};

// Immutable update (good)
const newState = {
  ...state,
  user: {
    ...state.user,
    preferences: {
      ...state.user.preferences,
      theme: 'dark'
    }
  }
};`,
        explanation:
          "Pure functions always produce the same output for the same input and have no side effects. Immutability helps prevent bugs and makes state changes predictable.",
      },
    ],
    qa: [
      {
        question: "What are the benefits of functional programming?",
        answer:
          "Functional programming leads to more predictable code, easier testing, better debugging, and improved maintainability. It also helps avoid common bugs related to state mutations.",
      },
      {
        question: "When should you use reduce vs. other array methods?",
        answer:
          "Use reduce when you need to transform an array into a single value (number, string, object, or new array). For simpler transformations, map or filter might be more readable.",
      },
    ],
  },
  {
    id: "hoisting",
    title: "Hoisting & Scope",
    category: "javascript",
    summary:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope. Understanding scope is crucial for managing variable accessibility and avoiding naming conflicts.",
    codeExamples: [
      {
        title: "Variable Hoisting",
        code: `console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 5;

console.log(z); // ReferenceError
const z = 5;

// Function hoisting
sayHello(); // Works!
function sayHello() {
  console.log('Hello!');
}

sayGoodbye(); // TypeError
var sayGoodbye = function() {
  console.log('Goodbye!');
};`,
        explanation:
          "Only function declarations and var declarations are hoisted. let and const declarations are hoisted but not initialized (temporal dead zone).",
      },
      {
        title: "Scope Types",
        code: `// Global Scope
var globalVar = 'I am global';

function example() {
  // Function Scope
  var functionVar = 'I am function-scoped';
  
  if (true) {
    // Block Scope
    let blockVar = 'I am block-scoped';
    const alsoBlockScoped = 'Me too';
    var notBlockScoped = 'I leak to function scope';
  }
  
  console.log(notBlockScoped); // Works
  console.log(blockVar); // ReferenceError
}

// Closure scope
function createCounter() {
  let count = 0; // Closure scope
  
  return {
    increment() { count++; },
    getCount() { return count; }
  };
}`,
        explanation:
          "JavaScript has global scope, function scope, block scope (let/const), and closure scope. Understanding these helps prevent variable leaks and naming conflicts.",
      },
    ],
    qa: [
      {
        question: "Why is var considered problematic in modern JavaScript?",
        answer:
          "var variables are function-scoped instead of block-scoped, can be redeclared, and are hoisted with an initial value of undefined. This can lead to bugs and makes code harder to reason about.",
      },
      {
        question: "What is the temporal dead zone?",
        answer:
          "The temporal dead zone is the period between entering a scope and the actual declaration being reached. Accessing let/const variables during this period throws a ReferenceError.",
      },
    ],
  },
  {
    id: "context-api",
    title: "Context API vs Redux",
    category: "react",
    summary:
      "Context API provides a way to pass data through the component tree without prop drilling. Redux is a state management library for predictable state updates in larger applications.",
    codeExamples: [
      {
        title: "Context API Implementation",
        code: `// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}`,
        explanation:
          "Context API is built into React and is great for simple state management needs like themes, user authentication, or localization.",
      },
      {
        title: "Redux Implementation",
        code: `// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Component
function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  
  useEffect(() => {
    dispatch(setLoading(true));
    fetchUser()
      .then(data => dispatch(setUser(data)))
      .catch(err => dispatch(setError(err)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return <div>{/* Render user data */}</div>;
}`,
        explanation:
          "Redux provides a more structured approach with actions, reducers, and a single store. It's beneficial for complex state management and when you need strong dev tools.",
      },
    ],
    qa: [
      {
        question: "When should you use Context API vs Redux?",
        answer:
          "Use Context API for simple state that doesn't change often (themes, auth) and when you want to avoid prop drilling. Use Redux for complex state logic, frequent updates, or when you need powerful debugging and middleware capabilities.",
      },
      {
        question: "What are the performance implications of Context API?",
        answer:
          "Context triggers a re-render for all components that use that context when the value changes. For frequent updates, consider using multiple contexts, state splitting, or Redux for better performance.",
      },
    ],
  },
  {
    id: "react-memo",
    title: "React.memo & Performance",
    category: "react",
    summary:
      "React.memo is a higher-order component that can prevent unnecessary re-renders of functional components by memoizing the rendered output.",
    codeExamples: [
      {
        title: "Basic Memoization",
        code: `import React, { useState, memo } from 'react';

// Without memo
function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.value}</div>
      ))}
    </div>
  );
}

// With memo
const MemoizedExpensive = memo(ExpensiveComponent);

// Parent component
function Parent() {
  const [count, setCount] = useState(0);
  const [data] = useState([
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' }
  ]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <MemoizedExpensive data={data} />
    </div>
  );
}`,
        explanation:
          "React.memo prevents re-renders when props haven't changed. In this example, ExpensiveComponent won't re-render when count changes.",
      },
      {
        title: "Custom Comparison",
        code: `const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.data.length === nextProps.data.length &&
    prevProps.data.every((item, index) => 
      item.id === nextProps.data[index].id
    )
  );
};

const MemoizedList = memo(function List({ data }) {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
}, areEqual);

// Usage with useMemo and useCallback
function OptimizedComponent({ onItemClick }) {
  const [items, setItems] = useState([]);
  
  const memoizedItems = useMemo(() => 
    items.map(item => ({
      ...item,
      computed: expensiveComputation(item)
    })),
    [items]
  );
  
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <MemoizedList 
      data={memoizedItems} 
      onItemClick={handleClick}
    />
  );
}`,
        explanation:
          "Custom comparison functions give fine-grained control over when components should re-render. useMemo and useCallback help prevent unnecessary re-renders due to reference changes.",
      },
    ],
    qa: [
      {
        question: "When should you use React.memo?",
        answer:
          "Use React.memo for expensive components that re-render frequently with the same props, or when a component receives complex objects/arrays as props. Don't use it for simple components as the overhead might exceed the benefits.",
      },
      {
        question: "What's the difference between React.memo and useMemo?",
        answer:
          "React.memo memoizes an entire component render output based on its props. useMemo memoizes a value computation within a component. Use React.memo for component optimization and useMemo for expensive calculations.",
      },
    ],
  },
  {
    id: "custom-hooks",
    title: "Custom Hooks",
    category: "react",
    summary:
      'Custom Hooks are JavaScript functions that start with "use" and may call other Hooks. They allow you to extract component logic into reusable functions.',
    codeExamples: [
      {
        title: "Basic Custom Hook",
        code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');

  return (
    <input
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}`,
        explanation:
          "This custom hook abstracts localStorage logic into a reusable function with a similar API to useState.",
      },
      {
        title: "Advanced Custom Hook",
        code: `function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // The execute function wraps asyncFunction and
  // handles state changes
  const execute = useCallback(async (...params) => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  // Call execute if we want to fire it right away
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

// Usage
function UserProfile({ userId }) {
  const {
    data: user,
    error,
    isLoading,
    execute: fetchUser
  } = useAsync(
    () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    true
  );

  if (isLoading) return 'Loading...';
  if (error) return 'Error!';
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => fetchUser()}>
        Refresh
      </button>
    </div>
  );
}`,
        explanation:
          "This more complex hook manages async operations with loading, error, and success states. It's reusable across any async operation in your app.",
      },
    ],
    qa: [
      {
        question: "What are the rules for custom hooks?",
        answer:
          'Custom hooks must start with "use", can only be called from React function components or other custom hooks, and must follow the rules of hooks (call in same order every render, no conditional hook calls).',
      },
      {
        question: "How do custom hooks help with code reuse?",
        answer:
          "Custom hooks allow you to extract stateful logic and side effects into reusable functions, sharing code between components without adding more components to the tree. They help avoid render props and higher-order components.",
      },
    ],
  },
  {
    id: "suspense",
    title: "React Suspense & Error Boundaries",
    category: "react",
    summary:
      "Suspense lets components wait for something before rendering. Error Boundaries are React components that catch JavaScript errors in their child component tree.",
    codeExamples: [
      {
        title: "Suspense for Code Splitting",
        code: `import React, { Suspense, lazy } from 'react';

// Lazy load components
const HomePage = lazy(() => import('./HomePage'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
    </div>
  );
}`,
        explanation:
          "Suspense wraps lazy-loaded components and shows a fallback while they're loading. This enables code splitting and better loading states.",
      },
      {
        title: "Error Boundary Implementation",
        code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-ui">
          <h1>Something went wrong</h1>
          <button 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/dashboard" 
              element={
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              } 
            />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}`,
        explanation:
          "Error Boundaries catch errors during rendering, in lifecycle methods, and in constructors. They're useful for graceful error handling in production.",
      },
    ],
    qa: [
      {
        question: "What types of errors can Error Boundaries catch?",
        answer:
          "Error Boundaries catch rendering errors, lifecycle errors, and errors in constructors of the whole tree below them. They don't catch errors in event handlers, async code, or server-side rendering.",
      },
      {
        question: "When should you use Suspense vs. regular loading states?",
        answer:
          "Use Suspense when you want to declaratively specify loading states for code splitting or data fetching. Use regular loading states for simpler cases or when you need more control over the loading UI.",
      },
    ],
  },
  {
    id: "synthetic-events",
    title: "Event Handling & Synthetic Events",
    category: "react",
    summary:
      "React wraps browser events in SyntheticEvent objects to ensure consistent behavior across browsers and provide additional functionality.",
    codeExamples: [
      {
        title: "Event Handling Basics",
        code: `function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    // Access native event if needed
    console.log(e.nativeEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        onClick={(e) => e.currentTarget.select()}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        explanation:
          "React's synthetic events provide a consistent interface across browsers and include all standard DOM event properties.",
      },
      {
        title: "Event Delegation & Performance",
        code: `function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);

  // Event handler is attached to parent
  const handleClick = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    const todoId = Number(button.dataset.todoId);
    
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <ul onClick={handleClick}>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button data-todo-id={todo.id}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// Custom Event Components
function CustomButton({ 
  onClick, 
  children 
}: {
  onClick: (e: React.MouseEvent) => void,
  children: React.ReactNode
}) {
  const handleClick = (e: React.MouseEvent) => {
    // Custom logic before calling parent handler
    console.log('Button clicked');
    onClick(e);
  };

  return (
    <button 
      onClick={handleClick}
      className="custom-button"
    >
      {children}
    </button>
  );
}`,
        explanation:
          "Event delegation in React is handled automatically through synthetic events, making it efficient to handle many similar events.",
      },
    ],
    qa: [
      {
        question: "What are the advantages of Synthetic Events?",
        answer:
          "Synthetic Events provide cross-browser consistency, automatic event delegation for better performance, and a predictable event object interface. They also pool events to reduce garbage collection.",
      },
      {
        question: "How do you handle async operations in event handlers?",
        answer:
          "For async operations, you need to call e.persist() if you want to access the event object later, or extract needed values immediately. React reuses event objects for performance.",
      },
    ],
  },
  {
    id: "react-fiber",
    title: "React Fiber & Reconciliation",
    category: "react",
    summary:
      "React Fiber is the reconciliation engine introduced in React 16. It enables incremental rendering of the virtual DOM and better scheduling of updates.",
    codeExamples: [
      {
        title: "Priority-based Updates",
        code: `import { useTransition, useDeferredValue } from 'react';

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  useEffect(() => {
    startTransition(() => {
      // Low priority update
      const newResults = searchDatabase(query);
      setResults(newResults);
    });
  }, [query]);

  return (
    <div>
      {isPending && <Spinner />}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

function AutoComplete({ value }) {
  // Defer updating suggestions until after other updates
  const deferredValue = useDeferredValue(value);
  
  return <Suggestions query={deferredValue} />;
}`,
        explanation:
          "React Fiber enables features like useTransition and useDeferredValue for better control over update priorities and user experience.",
      },
      {
        title: "Reconciliation Process",
        code: `// Virtual DOM representation
const vdom = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello'
        }
      },
      {
        type: 'p',
        props: {
          children: 'Text'
        }
      }
    ]
  }
};

// Component with key prop for efficient updates
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id} // Help reconciliation
          todo={todo}
        />
      ))}
    </ul>
  );
}

// Component that might cause reconciliation issues
function BadComponent({ data }) {
  return (
    <div>
      {/* Don't do this - new function every render */}
      <button onClick={() => handleClick(data)}>
        Click
      </button>
      
      {/* Better - memoized callback */}
      <button onClick={useCallback(
        () => handleClick(data),
        [data]
      )}>
        Click
      </button>
    </div>
  );
}`,
        explanation:
          "Understanding how React reconciles changes helps write more efficient components. Keys help React track items in lists, and proper callback handling prevents unnecessary re-renders.",
      },
    ],
    qa: [
      {
        question: "What problems does React Fiber solve?",
        answer:
          "React Fiber enables incremental rendering, allowing React to pause and resume work, prioritize updates, and return to in-progress rendering. This improves responsiveness for large component trees and enables features like Suspense and Concurrent Mode.",
      },
      {
        question: "How does React's reconciliation algorithm work?",
        answer:
          "React compares the virtual DOM with the actual DOM, identifying the minimum number of changes needed. It uses heuristics like different component types indicating different subtrees and keys helping track items in lists. This process is now incremental with Fiber.",
      },
    ],
  },
  // ...topics
];
