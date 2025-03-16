# JavaScript & React Cheatsheet

## JavaScript Fundamentals

### Variables & Data Types

```javascript
// Variable declaration
let name = "John";      // Block-scoped, can be reassigned
const age = 30;         // Block-scoped, cannot be reassigned
var legacy = true;      // Function-scoped (avoid using)

// Data types
let string = "Hello";                  // String
let number = 42;                       // Number
let boolean = true;                    // Boolean
let nullValue = null;                  // Null
let undefinedValue;                    // Undefined
let array = [1, 2, 3];                 // Array
let object = { name: "John", age: 30 }; // Object
let symbol = Symbol("id");             // Symbol
let bigInt = 9007199254740991n;        // BigInt
```

### Functions

```javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function(a, b) {
  return a - b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Default parameters
const greet = (name = "Guest") => `Hello, ${name}!`;

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Closure
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
```

### Array Methods

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

// Adding/removing elements
fruits.push("Date");      // Add to end
fruits.pop();             // Remove from end
fruits.unshift("Avocado"); // Add to beginning
fruits.shift();           // Remove from beginning
fruits.splice(1, 1, "Blueberry"); // Remove and insert

// Iteration
fruits.forEach(fruit => console.log(fruit));
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
const longFruits = fruits.filter(fruit => fruit.length > 5);
const allLong = fruits.every(fruit => fruit.length > 3);
const someLong = fruits.some(fruit => fruit.length > 6);
const cherry = fruits.find(fruit => fruit === "Cherry");
const bananaIndex = fruits.findIndex(fruit => fruit === "Banana");

// Other useful methods
const joined = fruits.join(", ");
const sorted = [...fruits].sort();
const reversed = [...fruits].reverse();
const sliced = fruits.slice(1, 3);
```

### Object Manipulation

```javascript
const person = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA"
  }
};

// Object methods
const keys = Object.keys(person);            // ["name", "age", "address"]
const values = Object.values(person);        // ["John", 30, {city, country}]
const entries = Object.entries(person);      // [["name", "John"], ["age", 30], ...]
const merged = Object.assign({}, person, { job: "Developer" });

// Spread operator
const personCopy = { ...person };
const updated = { ...person, age: 31 };

// Destructuring
const { name, age, address: { city } } = person;
```

### Promises & Async/Await

```javascript
// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ data: "Success!" });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
};

// Using Promises
fetchData()
  .then(response => console.log(response))
  .catch(error => console.error(error))
  .finally(() => console.log("Operation completed"));

// Async/Await
const getData = async () => {
  try {
    const response = await fetchData();
    console.log(response);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operation completed");
  }
};
```

### ES6+ Features

```javascript
// Template literals
const greeting = `Hello, ${name}!`;

// Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks!`;
  }
}

// Optional chaining
const city = person?.address?.city;

// Nullish coalescing
const username = user?.name ?? "Anonymous";

// Logical assignment
let config = {};
config.debug ??= true;  // Set only if undefined or null

// Destructuring with renaming
const { name: fullName } = person;
```

## React Essentials

### Component Types

```jsx
// Functional Component (preferred)
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Class Component (legacy)
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

### Hooks

```jsx
// useState - State management
function Form() {
  const [username, setUsername] = useState('');
  
  return (
    <input 
      value={username} 
      onChange={(e) => setUsername(e.target.value)} 
    />
  );
}

// useEffect - Side effects
function Profile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Run on mount and when userId changes
    fetchUser(userId).then(data => setUser(data));
    
    return () => {
      // Cleanup function (runs before effect re-runs or on unmount)
      console.log('Cleaning up');
    };
  }, [userId]);  // Dependency array
  
  // Empty array [] - runs once on mount
  // No array - runs on every render
  // [dep1, dep2] - runs when dependencies change
}

// useContext - Context consumption
const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}

// useRef - DOM references and mutable values
function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

// useReducer - Complex state logic
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');
  
  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', text });
    setText('');
  };
  
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

// useMemo - Memoized values
function ExpensiveCalculation({ a, b }) {
  
  const result = useMemo(() => {
    console.log('Calculating...');
    return a * b * 1000;
  }, [a, b]);  // Only recalculate when a or b changes
  
  return <p>Result: {result}</p>;
}

// useCallback - Memoized callbacks
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Function is the same reference between renders
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);  // Empty dependency array = stable reference
  
  return <ChildComponent onClick={handleClick} />;
}
```

### Props & State

```jsx
// Props passing
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Alice" />

// Props destructuring
function Profile({ name, age, isAdmin = false }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <p>Admin User</p>}
    </div>
  );
}

// Children prop
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="Welcome">
  <p>This is the card content</p>
  <button>Click me</button>
</Card>

// State updates
function Counter() {
  const [count, setCount] = useState(0);
  
  // Correct way to update state based on previous state
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  // Multiple state values
  const [user, setUser] = useState({ name: '', email: '' });
  
  const updateEmail = (email) => {
    setUser(prevUser => ({ ...prevUser, email }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <input 
        value={user.email} 
        onChange={e => updateEmail(e.target.value)} 
      />
    </div>
  );
}
```

### Component Lifecycle

```jsx
// Functional Component Lifecycle with Hooks
function ComponentLifecycle() {
  console.log("1. Render phase");
  
  // ComponentDidMount (empty dependency array)
  useEffect(() => {
    console.log("2. Component mounted");
    
    // ComponentWillUnmount (return a cleanup function)
    return () => {
      console.log("4. Component will unmount");
    };
  }, []);
  
  // ComponentDidUpdate (with dependencies)
  useEffect(() => {
    console.log("3. Component updated or mounted");
  });
  
  return <div>Lifecycle Component</div>;
}
```

### Event Handling

```jsx
function EventHandling() {
  const handleClick = (e) => {
    // e is a synthetic event
    e.preventDefault();
    console.log("Button clicked");
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      
      {/* Inline function with parameters */}
      <button onClick={(e) => {
        e.stopPropagation();
        console.log("Another button clicked");
      }}>
        Another Button
      </button>
      
      {/* Binding parameters */}
      <button onClick={() => handleClick(42)}>
        Button with Params
      </button>
    </div>
  );
}
```

### Forms

```jsx
function SimpleForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
    agreement: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>
          <input
            name="agreement"
            type="checkbox"
            checked={formData.agreement}
            onChange={handleChange}
          />
          I agree to terms
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Conditional Rendering

```jsx
function ConditionalRendering({ isLoggedIn, role, items }) {
  // If/else
  if (!isLoggedIn) {
    return <LoginForm />;
  }
  
  return (
    <div>
      {/* Ternary operator */}
      <div>
        {role === 'admin' 
          ? <AdminPanel /> 
          : <UserPanel />}
      </div>
      
      {/* Logical AND */}
      {items.length > 0 && (
        <ItemList items={items} />
      )}
      
      {/* Element variables */}
      {(() => {
        switch (role) {
          case 'admin':
            return <AdminPanel />;
          case 'moderator':
            return <ModeratorPanel />;
          default:
            return <UserPanel />;
        }
      })()}
      
      {/* Null pattern for hiding */}
      {isLoggedIn ? <LogoutButton /> : null}
    </div>
  );
}
```

### Lists and Keys

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        // Always use unique keys when mapping
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// With index as fallback (not recommended if list order changes)
function StringList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### Context API

```jsx
// 1. Create Context
const ThemeContext = React.createContext('light');

// 2. Create Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // The value prop contains what will be available to consumers
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume context in components
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: theme === 'dark' ? '#333' : '#f0f0f0',
        color: theme === 'dark' ? '#fff' : '#000'
      }}
    >
      Toggle Theme
    </button>
  );
}

// 4. Wrap application or section
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
```

### Error Boundaries

```jsx
// Error Boundary (class component only)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

### React Router (v6)

```jsx
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  Outlet
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Nested routes */}
        <Route path="/users" element={<UserLayout />}>
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserDetail />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Outlet is where nested routes render
function UserLayout() {
  return (
    <div className="user-section">
      <h1>User Section</h1>
      <Outlet />
    </div>
  );
}

// Using URL parameters
function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1); // Go back one page
  };
  
  const goToSettings = () => {
    navigate('/users/settings'); // Programmatic navigation
  };
  
  return (
    <div>
      <h2>User Details for {userId}</h2>
      <button onClick={goBack}>Back</button>
      <button onClick={goToSettings}>User Settings</button>
    </div>
  );
}
```

### Performance Optimization

```jsx
// React.memo - Prevent unnecessary re-renders
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Only re-renders if props change
  return <div>{props.name}</div>;
});

// Custom comparison function
const areEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
};

const MemoizedWithCustomComparison = React.memo(MyComponent, areEqual);

// lazy loading with Suspense
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```

### Custom Hooks

```jsx
// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  return {
    values,
    errors,
    handleChange,
    resetForm,
    setValues,
    setErrors
  };
}

// Usage
function RegisterForm() {
  const { values, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation logic here
    console.log('Submitting:', values);
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={values.username}
        onChange={handleChange}
      />
      {/* Other inputs */}
      <button type="submit">Register</button>
    </form>
  );
}
```

## State Management

### Redux

```jsx
// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

// Reducer
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}

// Store setup with Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

// Modern Redux with Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: []
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;

// React-Redux hooks
import { useSelector, useDispatch } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos.list);
  const dispatch = useDispatch();
  
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo.id))}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### React Query (TanStack Query)

```jsx
import { 
  QueryClient, 
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

// Setup
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

// Data fetching
function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Mutations (create, update, delete)
function AddTodo() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newTodo) => 
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
      }).then(res => res.json()),
    onSuccess: () => {
      // Invalidate and refetch after successful mutation
      queryClient.invalidateQueries(['todos']);
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.todo.value;
    mutation.mutate({ text, completed: false });
    e.target.reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="todo" />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}
```
