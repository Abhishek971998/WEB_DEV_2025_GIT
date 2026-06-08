import { useState, useMemo } from "react";

const categories = [
  {
    id: "react-fundamentals",
    label: "React Fundamentals",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "advanced-react",
    label: "Advanced React",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    id: "coding",
    label: "Coding Questions",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "javascript",
    label: "JavaScript",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: "state",
    label: "State Management",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    id: "performance",
    label: "Performance",
    color: "from-lime-500 to-green-500",
    bg: "bg-lime-50",
    border: "border-lime-200",
    badge: "bg-lime-100 text-lime-700",
  },
  {
    id: "system-design",
    label: "System Design",
    color: "from-sky-500 to-indigo-500",
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    id: "debugging",
    label: "Debugging",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    color: "from-fuchsia-500 to-purple-500",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    badge: "bg-fuchsia-100 text-fuchsia-700",
  },
];

const questions = [
  // React Fundamentals
  {
    id: 1,
    category: "react-fundamentals",
    q: "Explain the React rendering lifecycle.",
    a: `React's rendering lifecycle has two main phases:

**Render Phase:** React calls your component function to figure out what the UI should look like. It compares the new output with the previous one (reconciliation). This phase is pure — no side effects happen here.

**Commit Phase:** React applies the changes to the real DOM. After this, it runs useEffect and other side effects.

**What triggers a re-render?**
• State changes (setState)
• Props changing from a parent
• Context value changing
• The parent component re-rendering

**Reconciliation:** React uses a "diffing" algorithm — it compares the old virtual DOM tree with the new one, finds the minimal set of changes, and only updates those parts in the real DOM.`,
    tags: ["lifecycle", "reconciliation", "core"],
  },
  {
    id: 2,
    category: "react-fundamentals",
    q: "What is Virtual DOM?",
    a: `**Virtual DOM** is a lightweight JavaScript object that is a copy of the real DOM. React keeps this in memory.

**Why is it faster?**
Real DOM operations are expensive because they trigger browser reflows and repaints. Virtual DOM lets React batch and minimize those operations.

**How diffing works:**
1. React renders your component → creates a new Virtual DOM tree
2. Compares it with the previous Virtual DOM tree ("diffing")
3. Finds only the parts that changed (the "diff")
4. Updates only those parts in the real DOM

Think of it like: instead of repainting an entire wall, you only touch up the scratched spots.`,
    tags: ["virtual dom", "diffing", "performance"],
  },
  {
    id: 3,
    category: "react-fundamentals",
    q: "Explain React Fiber.",
    a: `**React Fiber** is the internal engine that powers React 16+. It's a complete rewrite of React's core algorithm.

**Why was it introduced?**
The old React engine (called "Stack") worked synchronously — once it started rendering, it couldn't be paused. This caused janky UIs for heavy updates because it blocked the main thread.

**What Fiber enables:**
• **Interruptible rendering** — React can pause work mid-way and resume later
• **Priority levels** — urgent updates (typing) get processed before slow ones (data fetching)
• **Concurrent rendering** — React can work on multiple versions of the UI at once

Think of Fiber as a task scheduler that lets React say: "I'll pause updating this big list and first handle the user's keypress."`,
    tags: ["fiber", "concurrent", "internals"],
  },
  {
    id: 4,
    category: "react-fundamentals",
    q: "Difference between useEffect, useLayoutEffect, useMemo, useCallback, memo",
    a: `**useEffect**
Runs *after* the browser paints. Use for API calls, subscriptions, and most side effects. Non-blocking.

**useLayoutEffect**
Runs *before* the browser paints (synchronously after DOM mutations). Use when you need to measure DOM elements or prevent visual flicker. Blocking — use sparingly.

**useMemo**
Memoizes a *computed value*. Recalculates only when dependencies change.
\`const sorted = useMemo(() => items.sort(), [items])\`
Use when calculation is expensive.

**useCallback**
Memoizes a *function reference*. Returns the same function unless dependencies change.
\`const handleClick = useCallback(() => {}, [dep])\`
Use when passing callbacks to memoized child components.

**React.memo**
A *Higher Order Component* that wraps a component. Prevents re-render if props haven't changed.
\`export default React.memo(MyComponent)\``,
    tags: ["hooks", "memo", "performance"],
  },
  {
    id: 5,
    category: "react-fundamentals",
    q: "Why do React Hooks need to be called at the top level?",
    a: `React tracks hooks by their **call order**. Every time your component renders, hooks must be called in the exact same sequence.

If you put a hook inside an if-statement or loop, the order could change between renders, and React would lose track of which state belongs to which hook.

\`\`\`js
// ❌ BAD — breaks hook order
if (isLoggedIn) {
  const [name, setName] = useState('');
}

// ✅ GOOD
const [name, setName] = useState('');
if (isLoggedIn) { /* use name here */ }
\`\`\`

Think of it like: React has a numbered list of slots. Hook #1 is always state A, Hook #2 is always state B. If you skip one conditionally, everything shifts and gets confused.`,
    tags: ["hooks", "rules", "internals"],
  },
  {
    id: 6,
    category: "react-fundamentals",
    q: "Explain controlled vs uncontrolled components.",
    a: `**Controlled Component**
React controls the form input's value via state. Every keystroke updates state, and the input's value comes from state.
\`\`\`js
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
\`\`\`
✅ Single source of truth. Easy to validate, transform input.

**Uncontrolled Component**
The DOM manages the input's state. You read the value using a ref when needed.
\`\`\`js
const ref = useRef();
<input ref={ref} defaultValue="hello" />
// Read: ref.current.value
\`\`\`
✅ Simpler for integrating non-React libraries or file inputs.

**Rule of thumb:** Use controlled components for most forms. Use uncontrolled for file inputs or when integrating with third-party DOM libraries.`,
    tags: ["forms", "controlled", "uncontrolled"],
  },
  {
    id: 7,
    category: "react-fundamentals",
    q: "What causes infinite re-renders in React?",
    a: `Infinite re-renders happen when something inside the component triggers a state update on every render.

**Common causes:**

1. **setState called directly in render (no useEffect)**
\`\`\`js
// ❌ Renders → setCount → renders → setCount...
const [count, setCount] = useState(0);
setCount(count + 1); // called during render!
\`\`\`

2. **useEffect with wrong/missing dependencies that updates state**
\`\`\`js
useEffect(() => {
  setCount(count + 1); // triggers re-render → runs effect again
}, [count]); // ❌ depends on count, which it updates!
\`\`\`

3. **New object/array as prop or dependency on every render**
\`\`\`js
useEffect(() => { ... }, [{ id: 1 }]); // ❌ new object each render
\`\`\`

4. **Forgetting to memoize callback passed to child**`,
    tags: ["bugs", "re-render", "useEffect"],
  },
  // Advanced React
  {
    id: 8,
    category: "advanced-react",
    q: "Explain React Context API — when to use and when to avoid.",
    a: `**Context API** lets you share data across the component tree without prop drilling.

\`\`\`js
const ThemeContext = createContext('light');
// Provider at top:
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
// Consumer anywhere:
const theme = useContext(ThemeContext);
\`\`\`

**When to use:**
• Theme (dark/light mode)
• Current user / auth info
• Language / locale settings
• Truly global, rarely-changing data

**When to avoid:**
• High-frequency updates (e.g., every keystroke) — every consumer re-renders when context changes
• Large apps with complex state — use Redux or Zustand instead
• Performance-critical trees — prefer state colocation or composition

**Pro tip:** Split context by concern. Don't put all app state in one context.`,
    tags: ["context", "state", "performance"],
  },
  {
    id: 9,
    category: "advanced-react",
    q: "How would you prevent unnecessary re-renders?",
    a: `**React.memo** — Wrap component to skip re-render if props haven't changed:
\`export default React.memo(MyList)\`

**useCallback** — Stable function reference so memo'd children don't re-render:
\`const onClick = useCallback(() => doThing(id), [id])\`

**useMemo** — Prevent expensive recalculations and stable object references:
\`const data = useMemo(() => transform(raw), [raw])\`

**State Colocation** — Move state down to where it's actually used. Parent re-renders don't hurt isolated child state.

**Context Splitting** — Separate frequently-changing context from stable context:
\`\`\`js
// Split UserContext into:
<UserDispatchContext.Provider> // stable
<UserStateContext.Provider>    // updates often
\`\`\`

**Key insight:** Profile first with React DevTools. Don't over-memoize — it adds complexity and has its own cost.`,
    tags: ["performance", "memo", "optimization"],
  },
  {
    id: 10,
    category: "advanced-react",
    q: "What are React Suspense and Concurrent Features?",
    a: `**Suspense** lets a component "wait" for something (data, code) before rendering, and show a fallback UI in the meantime.

\`\`\`js
<Suspense fallback={<Spinner />}>
  <ProfilePage /> {/* waits for data */}
</Suspense>
\`\`\`

**Concurrent Features (React 18+):**

• **useTransition** — Mark an update as non-urgent. UI stays responsive while React works on it in the background.
\`const [isPending, startTransition] = useTransition()\`

• **useDeferredValue** — Like debouncing but React-native. Defers a value so urgent renders go first.

• **Automatic Batching** — Multiple state updates in async code are now batched together (was only in event handlers before).

• **Streaming SSR** — Send HTML in chunks as it's ready, instead of waiting for everything.

The key idea: React can now work on updates in the background without blocking the user.`,
    tags: ["suspense", "concurrent", "react18"],
  },
  {
    id: 11,
    category: "advanced-react",
    q: "Explain code splitting.",
    a: `**Code splitting** means breaking your JavaScript bundle into smaller chunks that load on demand, instead of loading everything upfront.

**With React.lazy + Suspense:**
\`\`\`js
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

The Dashboard code is only downloaded when that component actually needs to render.

**Route-based splitting** is most common:
\`\`\`js
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
\`\`\`

**Result:** Your initial bundle stays small → faster first load. Other chunks load on demand.

**Tools:** Webpack and Vite handle this automatically when you use dynamic imports.`,
    tags: ["code splitting", "lazy", "performance"],
  },
  {
    id: 12,
    category: "advanced-react",
    q: "How does React handle state updates internally?",
    a: `When you call setState (or a state setter from useState), React doesn't update state immediately. Here's what happens:

1. **Enqueue** — React adds your update to a queue for that component
2. **Schedule** — React schedules a re-render (with Fiber priority)
3. **Batch** — React groups multiple state updates together (batching)
4. **Re-render** — React processes the queue and re-renders the component
5. **Commit** — React updates the DOM with the new output

**Key insight — state is a snapshot:**
Inside an event handler, state values are "frozen" at the time of that render. Calling setState multiple times in one handler doesn't stack immediately.

\`\`\`js
setCount(count + 1); // count is still 0
setCount(count + 1); // count is still 0! Only increments once
// Use functional form to stack:
setCount(prev => prev + 1); // always uses latest
\`\`\``,
    tags: ["state", "internals", "batching"],
  },
  {
    id: 13,
    category: "advanced-react",
    q: "Why is state immutable in React?",
    a: `React uses **reference equality** to detect changes. If you mutate state directly (modify the object in place), the reference stays the same, and React thinks nothing changed — so it won't re-render.

\`\`\`js
// ❌ Mutating — React won't notice!
state.name = 'John';
setState(state); // same reference, no re-render

// ✅ Immutable — new reference, React re-renders
setState({ ...state, name: 'John' });
\`\`\`

**Benefits of immutability:**
• **Predictability** — state only changes through setState, making data flow easy to trace
• **Time-travel debugging** — you can keep old snapshots of state
• **Pure component optimization** — shallow comparison works correctly
• **Concurrent mode safety** — React can safely work on multiple state snapshots

Think of each state update as creating a new version of state, not editing the old one.`,
    tags: ["immutability", "state", "fundamentals"],
  },
  {
    id: 14,
    category: "advanced-react",
    q: "Explain batching in React 18.",
    a: `**Batching** means React groups multiple state updates into a single re-render for performance.

**Before React 18:** Only batched inside React event handlers.
\`\`\`js
// In a click handler — batched (1 re-render) ✅
setName('John');
setAge(30);

// In setTimeout/fetch — NOT batched (2 re-renders) ❌
setTimeout(() => {
  setName('John'); // re-render
  setAge(30);      // re-render again
}, 0);
\`\`\`

**React 18 — Automatic Batching:** All updates are batched everywhere — inside setTimeout, Promises, native event handlers, etc.
\`\`\`js
// React 18: setTimeout — now batched! ✅ (1 re-render)
setTimeout(() => {
  setName('John');
  setAge(30);
}, 0);
\`\`\`

**Opt out** if needed: \`flushSync(() => setState(...))\`

This means fewer re-renders and better performance with zero code changes.`,
    tags: ["batching", "react18", "performance"],
  },
  {
    id: 15,
    category: "advanced-react",
    q: "Difference between setCount(count+1) and setCount(prev => prev+1)",
    a: `Both increment count, but they behave differently when updates are batched or stale.

**\`setCount(count + 1)\`**
Uses the value of \`count\` captured at the time of that render (a snapshot).

\`\`\`js
// count = 0
setCount(count + 1); // schedules: set to 0+1 = 1
setCount(count + 1); // schedules: set to 0+1 = 1 (again!)
// Final: count = 1 (not 2!)
\`\`\`

**\`setCount(prev => prev + 1)\`**
Uses the *latest queued value*, not a stale snapshot. React passes you the most up-to-date value.

\`\`\`js
// count = 0
setCount(prev => prev + 1); // prev=0 → 1
setCount(prev => prev + 1); // prev=1 → 2
// Final: count = 2 ✅
\`\`\`

**Rule:** Always use the functional form when the new state depends on the previous state. It's safe in async code, timeouts, and stacked updates.`,
    tags: ["state", "functional update", "stale closure"],
  },
  // Coding Questions
  {
    id: 16,
    category: "coding",
    q: "Build a Todo App (Add, Delete, Edit, Filter, localStorage)",
    a: `\`\`\`jsx
function TodoApp() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos') || '[]')
  );
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all|active|done
  const [editId, setEditId] = useState(null);

  const save = (next) => {
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
  };

  const add = () => {
    if (!input.trim()) return;
    save([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const remove = (id) => save(todos.filter(t => t.id !== id));

  const toggle = (id) =>
    save(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const edit = (id, text) =>
    save(todos.map(t => t.id === id ? { ...t, text } : t));

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  return ( /* render filtered todos with input */ );
}
\`\`\`

**Key concepts used:**
• Lazy initializer for localStorage (\`() => JSON.parse(...)\`)
• Immutable updates with spread/filter/map
• Lifted state (no external library needed for small apps)
• Controlled input for the text field`,
    tags: ["coding", "todo", "hooks", "localStorage"],
  },
  {
    id: 17,
    category: "coding",
    q: "Build a Search Autocomplete (debounce, API, keyboard nav)",
    a: `\`\`\`jsx
function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(-1);
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    if (!debounced) return setResults([]);
    fetch(\`/api/search?q=\${debounced}\`)
      .then(r => r.json())
      .then(setResults);
  }, [debounced]);

  const onKey = (e) => {
    if (e.key === 'ArrowDown') setActive(a => Math.min(a+1, results.length-1));
    if (e.key === 'ArrowUp')   setActive(a => Math.max(a-1, 0));
    if (e.key === 'Enter' && active >= 0) select(results[active]);
    if (e.key === 'Escape') setResults([]);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={onKey} />
      {results.map((r, i) => (
        <div key={r.id} className={i === active ? 'highlighted' : ''} onClick={() => select(r)}>
          {r.label}
        </div>
      ))}
    </div>
  );
}
\`\`\`

**Key concepts:**
• **Debounce** avoids an API call on every single keystroke
• **useEffect on debounced value** — only fires after user stops typing
• **active index** tracks keyboard cursor position`,
    tags: ["coding", "autocomplete", "debounce", "ux"],
  },
  {
    id: 18,
    category: "coding",
    q: "Create a Custom Hook: useDebounce(value, delay)",
    a: `\`\`\`js
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on each change
  }, [value, delay]);

  return debounced;
}

// Usage:
const debouncedSearch = useDebounce(searchQuery, 500);
useEffect(() => {
  fetchResults(debouncedSearch);
}, [debouncedSearch]);
\`\`\`

**How it works:**
1. Every time \`value\` changes, a new timeout is set
2. The cleanup function cancels the previous timeout
3. Only when the user stops changing value for \`delay\` ms, does \`debounced\` update
4. This means: only the last value after a pause triggers the expensive operation

**Other useful custom hooks to know:**
• \`useLocalStorage(key, default)\`
• \`useFetch(url)\`
• \`useWindowSize()\`
• \`useOnClickOutside(ref, handler)\``,
    tags: ["custom hooks", "debounce", "coding"],
  },
  {
    id: 19,
    category: "coding",
    q: "Build an Infinite Scroll Component",
    a: `Use **Intersection Observer API** — the modern, performant way.

\`\`\`jsx
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef(null); // invisible div at bottom

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage(p => p + 1); // load next page when visible
      }
    });
    if (sentinel.current) observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    fetchPage(page).then(data => {
      setItems(prev => [...prev, ...data]);
      setLoading(false);
    });
  }, [page]);

  return (
    <div>
      {items.map(item => <ItemCard key={item.id} item={item} />)}
      <div ref={sentinel} /> {/* trigger point */}
      {loading && <Spinner />}
    </div>
  );
}
\`\`\`

Intersection Observer fires when the sentinel div enters the viewport, triggering the next page load.`,
    tags: ["coding", "infinite scroll", "intersection observer"],
  },
  {
    id: 20,
    category: "coding",
    q: "Build a Reusable Modal Component",
    a: `\`\`\`jsx
function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>,
    document.body // renders outside the component tree
  );
}

// Usage:
<Modal isOpen={show} onClose={() => setShow(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
\`\`\`

**Key features:**
• **createPortal** — renders in document.body, avoids z-index/overflow issues
• **Escape key** closes modal
• **Backdrop click** closes modal (stopPropagation prevents modal click from bubbling)`,
    tags: ["coding", "modal", "portal", "accessibility"],
  },
  {
    id: 21,
    category: "coding",
    q: "Implement Pagination",
    a: `\`\`\`jsx
function usePagination(totalItems, itemsPerPage = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const offset = (page - 1) * itemsPerPage;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return { page, totalPages, offset, canPrev, canNext,
    prev: () => setPage(p => p - 1),
    next: () => setPage(p => p + 1),
    goTo: (n) => setPage(Math.max(1, Math.min(n, totalPages))),
  };
}

// In component:
const { page, totalPages, offset, prev, next } = usePagination(data.length, 10);
const pageData = data.slice(offset, offset + 10);

// Server-side: send page number to API instead of slicing
\`\`\`

**Two approaches:**
• **Client-side** — fetch all data once, slice for each page. Good for small datasets.
• **Server-side** — fetch only the current page from API. Required for large datasets.

**URL-based pagination** is SEO-friendly: \`/products?page=3\` — use the URL as the source of truth for page number.`,
    tags: ["coding", "pagination", "ux"],
  },
  {
    id: 22,
    category: "coding",
    q: "Build a Multi-Step Form",
    a: `\`\`\`jsx
const STEPS = ['Personal', 'Address', 'Review'];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', email: '', city: '' });

  const update = (fields) => setData(d => ({ ...d, ...fields }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    await api.post('/submit', data);
    // handle success
  };

  return (
    <div>
      {/* Progress indicator */}
      {STEPS.map((label, i) => (
        <span key={i} className={i <= step ? 'active' : ''}>{label}</span>
      ))}

      {step === 0 && <PersonalStep data={data} onChange={update} />}
      {step === 1 && <AddressStep data={data} onChange={update} />}
      {step === 2 && <ReviewStep data={data} />}

      <button onClick={back} disabled={step === 0}>Back</button>
      {step < STEPS.length - 1
        ? <button onClick={next}>Next</button>
        : <button onClick={submit}>Submit</button>}
    </div>
  );
}
\`\`\`

**Key pattern:** Lift all form data to parent state. Each step receives data and an onChange handler. Validation can happen before calling \`next()\`.`,
    tags: ["coding", "form", "multi-step", "ux"],
  },
  {
    id: 23,
    category: "coding",
    q: "Implement a Drag-and-Drop List",
    a: `Use **@dnd-kit/core** — the modern, accessible DnD library for React.

\`\`\`jsx
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform) }}
      {...attributes} {...listeners}>
      {id}
    </div>
  );
}

function DragList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems(prev => arrayMove(prev,
        prev.indexOf(active.id), prev.indexOf(over.id)
      ));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items}>
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  );
}
\`\`\``,
    tags: ["coding", "drag and drop", "dnd-kit"],
  },
  // JavaScript
  {
    id: 24,
    category: "javascript",
    q: "Explain the event loop.",
    a: `JavaScript is **single-threaded** — it can only do one thing at a time. The event loop is what makes async code possible.

**The pieces:**
• **Call Stack** — where your synchronous code runs (LIFO)
• **Web APIs** — browser handles async work (setTimeout, fetch, DOM events)
• **Callback Queue (Macro-task)** — setTimeout, setInterval callbacks wait here
• **Microtask Queue** — Promise callbacks (.then), queueMicrotask wait here

**Order of operations:**
1. Run all synchronous code on the call stack
2. Run ALL microtasks (Promises) until queue is empty
3. Run ONE macro-task (setTimeout callback)
4. Back to step 2

\`\`\`js
console.log('1');          // sync
setTimeout(() => console.log('2'), 0); // macro-task
Promise.resolve().then(() => console.log('3')); // microtask
console.log('4');          // sync

// Output: 1, 4, 3, 2
\`\`\`

Microtasks always beat macro-tasks!`,
    tags: ["event loop", "async", "fundamentals"],
  },
  {
    id: 25,
    category: "javascript",
    q: "Difference between setTimeout, Promise, and queueMicrotask",
    a: `All three schedule code to run later, but at different priority levels:

**setTimeout(fn, delay)**
• Macro-task queue
• Runs after current code + all microtasks + at least \`delay\` ms
• Even setTimeout(fn, 0) is lower priority than Promises

**Promise.then(fn)**
• Microtask queue
• Runs immediately after the current task completes
• Higher priority than setTimeout
• Used for async/await under the hood

**queueMicrotask(fn)**
• Microtask queue (same as Promise)
• Simpler than creating a Promise just to schedule work
• Useful for deferring work until after current sync code, but before I/O

**Priority order:**
\`Sync code → Microtasks (Promise/.then, queueMicrotask) → Macro-tasks (setTimeout)\`

\`\`\`js
setTimeout(() => console.log('setTimeout'));     // last
queueMicrotask(() => console.log('microtask')); // second
Promise.resolve().then(() => console.log('promise')); // second (same queue)
console.log('sync'); // first
// Output: sync → microtask → promise → setTimeout
\`\`\``,
    tags: ["async", "event loop", "promises"],
  },
  {
    id: 26,
    category: "javascript",
    q: "Explain closures.",
    a: `A **closure** is a function that remembers variables from its outer scope even after that scope has finished executing.

\`\`\`js
function outer() {
  let count = 0; // in outer's scope
  return function inner() { // inner "closes over" count
    count++;
    return count;
  };
}

const counter = outer(); // outer() runs and returns
counter(); // 1 — still remembers count!
counter(); // 2
counter(); // 3
\`\`\`

The inner function keeps a reference to \`count\` — it doesn't copy it, it references the actual variable.

**Real-world uses:**
• **Encapsulation** — private variables (like above)
• **Memoization** — cache results in a closure
• **Event handlers** — remember which item was clicked
• **Partial application** — pre-fill function arguments

\`\`\`js
// Classic closure bug with var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 ❌
}
// Fix: use let (block scope) or wrap in IIFE
\`\`\``,
    tags: ["closures", "scope", "fundamentals"],
  },
  {
    id: 27,
    category: "javascript",
    q: "Explain prototypal inheritance.",
    a: `In JavaScript, objects can inherit from other objects via the **prototype chain**.

Every object has a hidden \`[[Prototype]]\` link to another object. When you access a property, JS looks on the object first, then follows the chain upward until it finds it or hits null.

\`\`\`js
const animal = {
  speak() { return \`\${this.name} speaks\`; }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.name = 'Rex';
dog.speak(); // "Rex speaks" — found on prototype!
\`\`\`

**With classes (ES6 syntax — same thing under the hood):**
\`\`\`js
class Animal {
  speak() { return \`\${this.name} speaks\`; }
}
class Dog extends Animal {
  bark() { return 'Woof!'; }
}
const d = new Dog();
d.speak(); // inherited from Animal via prototype chain
\`\`\`

**Key insight:** Classes in JS are syntactic sugar. Under the hood, it's still prototype chains. \`Dog.prototype\` is linked to \`Animal.prototype\`.`,
    tags: ["prototype", "inheritance", "oop"],
  },
  {
    id: 28,
    category: "javascript",
    q: "What is hoisting?",
    a: `**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope before code executes.

**var declarations** are hoisted and initialized to \`undefined\`:
\`\`\`js
console.log(x); // undefined (not an error!)
var x = 5;
// JS sees it as: var x = undefined; ... x = 5;
\`\`\`

**let / const** are hoisted but NOT initialized (Temporal Dead Zone):
\`\`\`js
console.log(y); // ❌ ReferenceError!
let y = 5;
\`\`\`

**Function declarations** are fully hoisted (both declaration AND body):
\`\`\`js
greet(); // ✅ works! "Hello"
function greet() { console.log("Hello"); }
\`\`\`

**Function expressions / arrow functions** are NOT hoisted:
\`\`\`js
greet(); // ❌ TypeError
const greet = () => "Hello";
\`\`\`

**Best practice:** Always declare variables at the top of their scope and use \`let\`/\`const\` to avoid hoisting surprises.`,
    tags: ["hoisting", "var", "let", "const"],
  },
  {
    id: 29,
    category: "javascript",
    q: "Difference between var, let, and const",
    a: `| | var | let | const |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisted | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | ✅ Yes | ❌ No | ❌ No |
| Re-assign | ✅ Yes | ✅ Yes | ❌ No |

\`\`\`js
// var — function scoped, leaks out of blocks
if (true) { var a = 1; }
console.log(a); // 1 — accessible outside if!

// let — block scoped, stays inside {}
if (true) { let b = 2; }
console.log(b); // ❌ ReferenceError

// const — must be initialized, can't reassign
const c = 3;
c = 4; // ❌ TypeError

// BUT: const objects are mutable!
const obj = { x: 1 };
obj.x = 2; // ✅ fine — obj reference didn't change
obj = {};  // ❌ can't reassign the reference
\`\`\`

**Rule:** Use \`const\` by default. Use \`let\` when you need to reassign. Avoid \`var\`.`,
    tags: ["var", "let", "const", "scope"],
  },
  {
    id: 30,
    category: "javascript",
    q: "Explain call, apply, bind.",
    a: `All three explicitly set what \`this\` refers to inside a function.

**call** — invoke immediately, pass args one by one:
\`\`\`js
function greet(greeting, punct) {
  return \`\${greeting}, \${this.name}\${punct}\`;
}
const user = { name: 'Alice' };
greet.call(user, 'Hello', '!'); // "Hello, Alice!"
\`\`\`

**apply** — invoke immediately, pass args as an array:
\`\`\`js
greet.apply(user, ['Hi', '?']); // "Hi, Alice?"
// Useful when args are already in an array
\`\`\`

**bind** — returns a NEW function with \`this\` locked in (doesn't call it):
\`\`\`js
const boundGreet = greet.bind(user, 'Hey');
boundGreet('!'); // "Hey, Alice!" — call later
\`\`\`

**Memory trick:** 
• **c**all — **c**omma-separated args
• **a**pply — **a**rray of args
• **b**ind — **b**ookmarks \`this\` for later

Common use: fixing \`this\` in event handlers or callbacks where context is lost.`,
    tags: ["this", "call", "apply", "bind"],
  },
  {
    id: 31,
    category: "javascript",
    q: "Implement Array.prototype.map",
    a: `\`\`\`js
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // handle sparse arrays
      result[i] = callback(this[i], i, this);
      //    callback(currentValue, index, array)
    }
  }
  return result;
};

// Test:
[1, 2, 3].myMap(x => x * 2); // [2, 4, 6]
['a','b'].myMap((v, i) => \`\${i}:\${v}\`); // ['0:a', '1:b']
\`\`\`

**Key points the interviewer wants to see:**
• Returns a **new array** (doesn't mutate original)
• Passes **3 args** to callback: value, index, array
• Handles **sparse arrays** (\`i in this\` check)
• \`this\` refers to the array (it's called as \`arr.myMap()\`)

The same pattern applies to **filter** (push conditionally) and **reduce** (accumulate single value).`,
    tags: ["coding", "map", "polyfill", "arrays"],
  },
  {
    id: 32,
    category: "javascript",
    q: "Implement debounce()",
    a: `\`\`\`js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);                    // cancel previous
    timer = setTimeout(() => {
      fn.apply(this, args);                 // run after quiet period
    }, delay);
  };
}

// Usage:
const search = debounce((query) => fetchAPI(query), 300);
input.addEventListener('input', e => search(e.target.value));
\`\`\`

**How it works:**
1. User types → debounced function called → timer set
2. User types again → previous timer cleared → new timer set
3. User stops typing → timer runs → original function fires once

**Debounce vs Throttle:**
• **Debounce** — waits for quiet period, fires *after* last call
• **Throttle** — fires at most once per interval, fires *during* calls

**Use debounce for:** search input, window resize handlers, form validation
**Use throttle for:** scroll events, mouse move, game loop updates`,
    tags: ["debounce", "coding", "performance"],
  },
  {
    id: 33,
    category: "javascript",
    q: "Implement throttle()",
    a: `\`\`\`js
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
    // else: ignore this call
  };
}

// Usage:
const onScroll = throttle(() => updatePosition(), 100);
window.addEventListener('scroll', onScroll);
\`\`\`

**Alternative — flag-based:**
\`\`\`js
function throttle(fn, delay) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => waiting = false, delay);
    }
  };
}
\`\`\`

**Key difference from debounce:**
• Throttle fires the function **immediately** then ignores calls for \`limit\` ms
• Great for scroll/resize: you get regular updates, not just the final one
• Debounce fires only **after** the user stops`,
    tags: ["throttle", "coding", "performance"],
  },
  {
    id: 34,
    category: "javascript",
    q: "Deep clone an object.",
    a: `**Several approaches, each with tradeoffs:**

**1. structuredClone (modern, recommended):**
\`\`\`js
const clone = structuredClone(obj);
// ✅ Handles nested objects, arrays, Date, Map, Set
// ❌ Doesn't handle functions or class instances
\`\`\`

**2. JSON trick (simple but limited):**
\`\`\`js
const clone = JSON.parse(JSON.stringify(obj));
// ❌ Loses: functions, undefined, Date, circular refs
\`\`\`

**3. Recursive custom implementation:**
\`\`\`js
function deepClone(val) {
  if (val === null || typeof val !== 'object') return val;
  if (Array.isArray(val)) return val.map(deepClone);
  return Object.fromEntries(
    Object.entries(val).map(([k, v]) => [k, deepClone(v)])
  );
}
\`\`\`
⚠️ Doesn't handle circular references or special types.

**4. Lodash \`_.cloneDeep(obj)\`** — handles everything, battle-tested.

**Best answer for interviews:** Use \`structuredClone\` for modern code. Use \`_.cloneDeep\` if Lodash is available. Explain JSON limitations if asked.`,
    tags: ["deep clone", "objects", "coding"],
  },
  {
    id: 35,
    category: "javascript",
    q: "Flatten nested arrays — [1,[2,[3,4]]] → [1,2,3,4]",
    a: `**Multiple approaches:**

**1. Built-in flat() — best for known depths:**
\`\`\`js
[1,[2,[3,4]]].flat(Infinity); // [1,2,3,4]
// flat(1) → one level, flat(Infinity) → all levels
\`\`\`

**2. Recursive — classic interview answer:**
\`\`\`js
function flatten(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item)
      ? [...acc, ...flatten(item)] // recurse into nested arrays
      : [...acc, item],
    []
  );
}
flatten([1,[2,[3,4]]]); // [1,2,3,4]
\`\`\`

**3. Iterative with a stack:**
\`\`\`js
function flatten(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const val = stack.pop();
    if (Array.isArray(val)) stack.push(...val);
    else result.unshift(val);
  }
  return result;
}
\`\`\`

**Pro tip:** For interviews, code the recursive solution, then mention \`flat(Infinity)\` as the idiomatic one-liner.`,
    tags: ["arrays", "recursion", "coding"],
  },
  // State Management
  {
    id: 36,
    category: "state",
    q: "Why Redux? When do you need it?",
    a: `Redux solves the problem of **shared global state** in large apps.

**Problems Redux solves:**
• Prop drilling — passing data through many layers of components
• Multiple components needing the same state (e.g., user auth, cart)
• Predictable state updates — all changes go through reducers
• Time-travel debugging with Redux DevTools

**When you NEED Redux (or similar):**
• Many components share state across different parts of the UI
• State logic is complex (multiple actors changing same data)
• You need strict auditability of what changed and why

**When you DON'T need Redux:**
• Small-medium app with mostly local state
• Data fetching (use React Query / SWR instead)
• UI state that only one component needs

**Redux alternatives:**
• **Zustand** — simpler, less boilerplate, popular for new projects
• **Jotai / Recoil** — atomic state model
• **Context + useReducer** — built-in, works for medium complexity

**Honest answer:** For most new apps, start with local state + React Query. Add Zustand or Redux only when you actually need global state.`,
    tags: ["redux", "state management", "architecture"],
  },
  {
    id: 37,
    category: "state",
    q: "Explain Redux flow.",
    a: `Redux has a strict **unidirectional data flow**:

\`\`\`
UI Event
  → dispatch(action)
    → Reducer(currentState, action) → newState
      → Store updates
        → Connected components re-render
\`\`\`

**The pieces:**
• **Store** — single JS object holding all app state
• **Action** — plain object describing what happened: \`{ type: 'INCREMENT', payload: 1 }\`
• **Reducer** — pure function: \`(state, action) => newState\` (no mutations!)
• **dispatch** — the only way to trigger a state change
• **Selector** — function to read specific data from the store

\`\`\`js
// Action
const increment = (amount) => ({ type: 'INCREMENT', payload: amount });

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + action.payload;
    default: return state;
  }
}

// Dispatch
dispatch(increment(5));
\`\`\`

**Why unidirectional?** Easy to trace bugs — every state change is explicit and logged.`,
    tags: ["redux", "flow", "reducer", "action"],
  },
  {
    id: 38,
    category: "state",
    q: "Difference between Redux Toolkit and plain Redux",
    a: `**Plain Redux problems:**
• Too much boilerplate (action types, action creators, reducers)
• Easy to accidentally mutate state
• Need to configure DevTools and middleware manually
• Async logic requires extra middleware (redux-thunk)

**Redux Toolkit (RTK)** is the official, modern way to write Redux. It solves all the above:

\`\`\`js
// RTK Slice — replaces action types + action creators + reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; }, // ✅ "mutations" OK — Immer handles it
    addAmount: (state, action) => { state.value += action.payload; }
  }
});

export const { increment, addAmount } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

**RTK includes:**
• **Immer** — write "mutating" code that's actually immutable under the hood
• **createAsyncThunk** — async actions with pending/fulfilled/rejected
• **RTK Query** — data fetching + caching (like React Query)
• DevTools configured automatically

**Conclusion:** Always use Redux Toolkit. Plain Redux is just historical context.`,
    tags: ["redux", "rtk", "toolkit"],
  },
  {
    id: 39,
    category: "state",
    q: "What problem does Redux Toolkit solve?",
    a: `Redux Toolkit was created because plain Redux had too much boilerplate and too many footguns.

**Problem 1: Too much code for simple things**
Plain Redux needed: action type constants + action creators + reducer with switch statements.
RTK: One \`createSlice\` generates all three.

**Problem 2: Accidental state mutation**
Plain Redux: you had to manually spread (\`{ ...state, x: newX }\`) everywhere.
RTK: Uses **Immer** under the hood so you write \`state.x = newX\` and it creates an immutable copy automatically.

**Problem 3: Async logic was complicated**
Plain Redux: install redux-thunk separately, write boilerplate for loading/error/success states.
RTK: \`createAsyncThunk\` generates pending/fulfilled/rejected action types automatically.

**Problem 4: Store setup was verbose**
RTK: \`configureStore\` sets up DevTools and middleware in 2 lines.

\`\`\`js
const store = configureStore({
  reducer: { counter: counterReducer, user: userReducer }
}); // DevTools + thunk middleware auto-configured ✅
\`\`\`

**Bottom line:** RTK lets you write Redux with 60-80% less code.`,
    tags: ["rtk", "redux", "boilerplate"],
  },
  {
    id: 40,
    category: "state",
    q: "How would you handle API caching? (RTK Query, React Query, SWR)",
    a: `Manual fetch + useEffect works but becomes painful: loading states, error handling, deduplication, refetching — you reinvent the wheel.

**React Query (TanStack Query) — most popular:**
\`\`\`js
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000 // cache for 5 minutes
});
\`\`\`
✅ Automatic caching, background refetch, deduplication, pagination support.

**SWR (from Vercel) — lightweight:**
\`\`\`js
const { data, error } = useSWR(\`/api/user/\${id}\`, fetcher);
\`\`\`
✅ Simpler API, great for basic caching needs.

**RTK Query — if you're already using Redux:**
\`\`\`js
const { data } = useGetUserQuery(userId);
// Auto-generates hooks, handles cache invalidation
\`\`\`

**When to use which:**
• **React Query** — best for most apps, no Redux required
• **SWR** — simpler needs, Next.js projects
• **RTK Query** — already using Redux Toolkit

The key value: **automatic deduplication** (two components requesting same data = one request), **stale-while-revalidate**, and **cache invalidation**.`,
    tags: ["caching", "react query", "swr", "rtk query"],
  },
  // Performance
  {
    id: 41,
    category: "performance",
    q: "Your React page takes 5 seconds to load. How do you debug?",
    a: `Systematic approach — measure first, optimize second:

**Step 1 — Lighthouse (Chrome DevTools)**
Run a Lighthouse audit. Look at:
• **First Contentful Paint (FCP)** — when does anything show?
• **Total Blocking Time (TBT)** — how long is JS blocking the main thread?
• **Largest Contentful Paint (LCP)** — when does main content appear?

**Step 2 — Network tab**
• Is the JavaScript bundle too large?
• Are there waterfalled requests (requests waiting for other requests)?
• Are there large uncompressed images?

**Step 3 — Bundle Analyzer**
\`\`\`bash
npx webpack-bundle-analyzer
# or with Vite: rollup-plugin-visualizer
\`\`\`
Find what's taking up space. Common culprits: moment.js, lodash (full import), chart libraries.

**Step 4 — Chrome Performance Tab**
Record the page load. Look for long tasks (>50ms) on the main thread.

**Step 5 — React DevTools Profiler**
If it loads but renders slowly, profile which components are slow.

**Common fixes:** Code splitting, lazy loading, image optimization, removing unused dependencies.`,
    tags: ["performance", "debugging", "lighthouse"],
  },
  {
    id: 42,
    category: "performance",
    q: "Explain lazy loading.",
    a: `**Lazy loading** means deferring the loading of a resource until it's actually needed, instead of loading everything upfront.

**Code lazy loading (JavaScript):**
\`\`\`js
// Without lazy loading — all code in initial bundle
import HeavyChart from './HeavyChart';

// With lazy loading — loaded only when rendered
const HeavyChart = lazy(() => import('./HeavyChart'));
\`\`\`

**Image lazy loading:**
\`\`\`html
<!-- Browser only loads this when near viewport -->
<img src="photo.jpg" loading="lazy" alt="Photo" />
\`\`\`

**Route-based lazy loading (most impactful):**
Load each page's code only when the user navigates to it.

\`\`\`js
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
\`\`\`

**Benefits:**
• Smaller initial bundle → faster first load
• Users only download code for pages they actually visit
• Critical path (main page) loads first

**In Next.js:** \`next/dynamic\` is the equivalent with SSR support.`,
    tags: ["lazy loading", "performance", "code splitting"],
  },
  {
    id: 43,
    category: "performance",
    q: "Explain tree shaking.",
    a: `**Tree shaking** is the process of removing unused code (dead code) from your final bundle during the build step.

The name comes from "shaking a tree and dead leaves fall off."

\`\`\`js
// You import only what you need:
import { debounce } from 'lodash-es'; // only debounce is bundled

// vs:
import _ from 'lodash'; // ENTIRE lodash is bundled (70KB+)
\`\`\`

**How it works:**
1. Bundler (Webpack/Rollup/Vite) analyzes your imports
2. Traces which exported functions are actually used
3. Removes everything else from the output

**Requirements for tree shaking:**
• ES Modules (\`import/export\`) — NOT CommonJS (\`require\`)
• Library must be side-effect free (package.json: \`"sideEffects": false\`)

**Common mistakes that break tree shaking:**
\`\`\`js
import * as utils from './utils'; // imports EVERYTHING
import _ from 'lodash';           // CJS — not tree-shakeable
\`\`\`

**Fix:**
\`\`\`js
import { debounce } from 'lodash-es'; // ESM version
\`\`\``,
    tags: ["tree shaking", "bundle", "performance"],
  },
  {
    id: 44,
    category: "performance",
    q: "How to reduce bundle size of a React application?",
    a: `**1. Analyze first**
\`\`\`bash
npx vite-bundle-visualizer
\`\`\`
Find the biggest culprits before optimizing blindly.

**2. Code splitting + lazy loading**
Split by route so each page only loads its own code.

**3. Replace heavy libraries**
• moment.js (67KB) → **date-fns** or **dayjs** (2KB)
• lodash (70KB) → lodash-es with named imports
• Full chart library → lighter alternative

**4. Tree shaking**
Use named imports: \`import { Button } from 'library'\` not \`import lib from 'library'\`

**5. Compress and optimize images**
Use WebP format, proper sizes, lazy loading.

**6. Externalize large dependencies (CDN)**
Load React, ReactDOM from CDN. Your app bundle doesn't need to include them.

**7. Enable gzip/Brotli compression**
Server-side compression. Typically reduces JS by 60-70%.

**8. Remove dev dependencies from production**
Ensure NODE_ENV=production is set (removes React dev warnings, etc.)

**Impact priority:** Code splitting > library replacement > image optimization > compression`,
    tags: ["bundle size", "performance", "optimization"],
  },
  {
    id: 45,
    category: "performance",
    q: "Why does React.memo sometimes not work?",
    a: `\`React.memo\` does a **shallow comparison** of props. It fails when props are new references on every render, even if the content is the same.

**Problem 1: Object/array props created inline**
\`\`\`jsx
// ❌ New array reference every render → memo useless
<List items={[1, 2, 3]} />

// ✅ Stable reference
const items = useMemo(() => [1, 2, 3], []);
<List items={items} />
\`\`\`

**Problem 2: Callback props not memoized**
\`\`\`jsx
// ❌ New function every render → memo useless
<Button onClick={() => handleClick(id)} />

// ✅ Stable reference
const onClick = useCallback(() => handleClick(id), [id]);
<Button onClick={onClick} />
\`\`\`

**Problem 3: Context changes**
If a memoized component reads from Context, it still re-renders when that context changes.

**Problem 4: children prop**
JSX children are new objects every render:
\`\`\`jsx
<Memo><span>text</span></Memo> // ❌ children is always new
\`\`\`

**Rule:** \`React.memo\` only helps when combined with stable prop references (useMemo + useCallback).`,
    tags: ["react.memo", "performance", "re-render"],
  },
  // System Design
  {
    id: 46,
    category: "system-design",
    q: "Design a News Feed",
    a: `**Core requirements:** Infinite scroll, performance with large lists, caching.

**Data fetching:**
Use React Query or SWR with cursor-based pagination:
\`\`\`js
useInfiniteQuery({ queryKey: ['feed'], 
  queryFn: ({ pageParam }) => fetchFeed(pageParam) })
\`\`\`

**Virtualization (critical for performance):**
Don't render 1000 feed items. Use **TanStack Virtual** or **react-window** to render only what's visible:
\`\`\`js
const virtualizer = useVirtualizer({ count: posts.length, 
  getScrollElement: () => ref.current, estimateSize: () => 200 })
\`\`\`

**Caching strategy:**
• Stale-while-revalidate: show cached content instantly, update in background
• Optimistic updates: like a post → update UI immediately, sync in background

**Image optimization:**
• Lazy load images with \`loading="lazy"\`
• Use CDN with proper srcset for different screen sizes
• Skeleton screens while loading

**Architecture:**
\`FeedContainer (data) → VirtualList → FeedItem (memo'd) → MediaContent\`

**Key discussion points:** Infinite scroll vs pagination, virtualization trade-offs, optimistic UI.`,
    tags: ["system design", "news feed", "virtualization"],
  },
  {
    id: 47,
    category: "system-design",
    q: "Design a Chat Application",
    a: `**Core requirements:** Real-time messages, typing indicators, message sync.

**Real-time with WebSockets:**
\`\`\`js
const ws = new WebSocket('wss://api.example.com/chat');
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  addMessage(msg); // update React state
};
ws.send(JSON.stringify({ type: 'message', text, roomId }));
\`\`\`

**Typing indicators:**
Debounce the typing event to avoid flooding the server:
\`\`\`js
ws.send({ type: 'typing', roomId }); // on keypress
// Server broadcasts to other room members
// Auto-clear after 3s of no typing events
\`\`\`

**Message synchronization:**
• **Optimistic UI:** show sent message immediately before server confirms
• On reconnect, fetch messages since last seen message ID
• Use message IDs + timestamps for ordering

**State structure:**
\`\`\`js
{ rooms: { [roomId]: { messages: [], members: [], typing: [] } } }
\`\`\`

**Performance:**
• Virtualize message list (only render visible messages)
• Paginate old messages (load more on scroll up)
• Compress WebSocket payloads

**Reconnection logic:** Exponential backoff with jitter.`,
    tags: ["system design", "chat", "websockets", "real-time"],
  },
  {
    id: 48,
    category: "system-design",
    q: "Design Google Docs-like Collaboration",
    a: `**This is one of the hardest frontend system design questions.**

**Core challenge:** Multiple users editing the same document simultaneously.

**Approach 1 — Operational Transformation (OT):**
Used by Google Docs. Each operation (insert/delete) is transformed against concurrent operations. Complex but battle-tested.

**Approach 2 — CRDTs (Conflict-free Replicated Data Types):**
Used by Figma, Notion. Operations can be applied in any order and converge to same state. Libraries: **Yjs**, **Automerge**.

**With Yjs (recommended for interviews):**
\`\`\`js
const doc = new Y.Doc();
const yText = doc.getText('content');

// Sync with WebSocket provider
const wsProvider = new WebsocketProvider(wsUrl, 'room1', doc);

// User awareness (cursors)
wsProvider.awareness.setLocalState({
  user: { name, color },
  cursor: { index, length }
});
\`\`\`

**Key topics to cover:**
• **Presence** — show where other cursors are in real time
• **Undo/redo** — must be per-user, not global
• **Offline support** — buffer changes locally, sync on reconnect
• **Permissions** — read-only vs edit access`,
    tags: ["system design", "collaboration", "crdt", "websockets"],
  },
  {
    id: 49,
    category: "system-design",
    q: "Design an E-commerce Product Listing Page",
    a: `**Requirements:** Filtering, sorting, caching, SEO.

**URL-first design (critical for SEO):**
All filter/sort state lives in URL params:
\`\`\`
/products?category=shoes&color=red&sort=price&page=2
\`\`\`
This makes pages shareable, bookmarkable, and indexable by search engines.

**Filtering & Sorting:**
\`\`\`js
const [params, setParams] = useSearchParams();
// Read: params.get('category')
// Write: setParams({ ...Object.fromEntries(params), category: 'shoes' })
\`\`\`

**Data fetching with caching:**
React Query with the filter params as query key:
\`\`\`js
useQuery({ queryKey: ['products', filters], queryFn: () => fetchProducts(filters) })
\`\`\`
Changing filters auto-refetches; previous filter results stay cached.

**Performance:**
• Virtualize long product lists
• Optimistic filter application (show loading state fast)
• Image lazy loading + WebP

**SEO considerations:**
• Server-side render first page with Next.js
• Proper meta tags for each filtered view
• Structured data (JSON-LD) for products

**Architecture:** FilterSidebar + ProductGrid (virtualized) + PaginationBar`,
    tags: ["system design", "e-commerce", "filtering", "seo"],
  },
  {
    id: 50,
    category: "system-design",
    q: "Design a Large Data Table",
    a: `**The core challenge:** Rendering 10,000+ rows without killing browser performance.

**Virtualization — the essential technique:**
Only render rows visible in the viewport. 10,000 rows → render ~20 at a time.

\`\`\`js
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 40, // row height in px
});

return (
  <div ref={scrollRef} style={{ height: '600px', overflow: 'auto' }}>
    <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>
      {virtualizer.getVirtualItems().map(vRow => (
        <Row key={vRow.index} style={{ position: 'absolute', top: vRow.start }}
          data={rows[vRow.index]} />
      ))}
    </div>
  </div>
);
\`\`\`

**Other optimizations:**
• **Memoize rows** with React.memo to avoid re-rendering unchanged rows
• **Server-side pagination** — only fetch the current page
• **Column virtualization** if hundreds of columns
• **Debounce** column resize and sort events

**Libraries:** TanStack Table (headless) + TanStack Virtual.`,
    tags: ["system design", "table", "virtualization", "performance"],
  },
  // Debugging
  {
    id: 51,
    category: "debugging",
    q: "Find the bug — useEffect causing infinite re-renders",
    a: `\`\`\`jsx
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // 🐛 BUG HERE
  }, [count]);

  return <div>{count}</div>;
}
\`\`\`

**The bug:** The effect depends on \`count\`, and it updates \`count\` → triggering the effect again → infinite loop.

\`count: 0\` → effect runs → \`setCount(1)\` → re-render → \`count: 1\` → effect runs → \`setCount(2)\` → ... ∞

**Fixes depending on intent:**

**Run once on mount:**
\`\`\`js
useEffect(() => {
  setCount(1);
}, []); // empty deps — run once
\`\`\`

**Increment without the dependency:**
\`\`\`js
useEffect(() => {
  setCount(prev => prev + 1); // functional update — no need to list count as dep
}, []); // run once
\`\`\`

**Key rule:** If your effect both reads AND writes a piece of state, you almost certainly have an infinite loop. Use the functional form of setState to break the dependency.`,
    tags: ["debugging", "useEffect", "infinite loop"],
  },
  {
    id: 52,
    category: "debugging",
    q: "Why is this component re-rendering repeatedly?",
    a: `Common causes of unexpected repeated re-renders:

**1. Object/array created inline in JSX**
\`\`\`jsx
// ❌ New object on every render = always "changed"
<Component config={{ theme: 'dark' }} />
// ✅ Fix: move outside component or useMemo
const config = useMemo(() => ({ theme: 'dark' }), []);
\`\`\`

**2. Unstable context value**
\`\`\`jsx
// ❌ New object every render — all consumers re-render
<Context.Provider value={{ user, setUser }}>
// ✅ Fix: useMemo
const value = useMemo(() => ({ user, setUser }), [user]);
\`\`\`

**3. Parent re-rendering unnecessarily**
Use React DevTools "Highlight updates" to see what's re-rendering and why.

**4. Missing key or wrong key**
Wrong keys cause React to unmount/remount instead of update.

**Debugging process:**
1. Open React DevTools → Profiler
2. Record a session
3. Click on a component to see "why did this render"
4. Look for: "parent re-rendered", "context changed", "props changed"

Then apply React.memo, useCallback, useMemo as appropriate.`,
    tags: ["debugging", "re-render", "performance"],
  },
  {
    id: 53,
    category: "debugging",
    q: "Why is Context causing performance issues?",
    a: `**The problem:** Every component that consumes a Context re-renders when ANY value in that context changes — even if they don't use the changed part.

\`\`\`jsx
// ❌ One big context
const AppContext = createContext({ user, theme, cart, notifications });

// If user changes → ALL consumers re-render
// Even components that only use theme!
\`\`\`

**Fix 1 — Split contexts by update frequency:**
\`\`\`jsx
<UserContext.Provider value={user}>    {/* changes on login */}
<ThemeContext.Provider value={theme}>  {/* rarely changes */}
<CartContext.Provider value={cart}>    {/* changes often */}
\`\`\`

**Fix 2 — Memoize the context value:**
\`\`\`jsx
const value = useMemo(() => ({ user, setUser }), [user]);
<UserContext.Provider value={value}>
\`\`\`

**Fix 3 — Split state from dispatch:**
\`\`\`jsx
<StateContext.Provider value={state}>     {/* changes */}
<DispatchContext.Provider value={dispatch}> {/* stable */}
\`\`\`
Components that only dispatch never re-render on state changes.

**Fix 4 — Use Zustand** — subscriptions are per-selector, not per-store.`,
    tags: ["debugging", "context", "performance"],
  },
  {
    id: 54,
    category: "debugging",
    q: "Why is useEffect firing twice in development?",
    a: `**Answer: React Strict Mode.**

In React 18 development mode, Strict Mode intentionally mounts, unmounts, and remounts every component once. This means \`useEffect\` runs twice.

\`\`\`jsx
// index.js — this causes the double firing:
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`\`\`

**Why does React do this?**
To help you find effects that don't clean up properly. If your effect breaks when run twice, it means it has a cleanup problem.

**This only happens in development — not in production.**

**The right fix:** Write proper cleanup functions:
\`\`\`js
useEffect(() => {
  const subscription = api.subscribe();
  return () => subscription.unsubscribe(); // ✅ cleanup
}, []);
\`\`\`

\`\`\`js
useEffect(() => {
  let active = true;
  fetchData().then(data => {
    if (active) setData(data); // ✅ ignore stale response after unmount
  });
  return () => { active = false; };
}, [id]);
\`\`\`

**Wrong fix:** Removing Strict Mode. That hides the real problem.`,
    tags: ["debugging", "useEffect", "strict mode"],
  },
  // Behavioral
  {
    id: 55,
    category: "behavioral",
    q: "Tell me about a challenging React project.",
    a: `**Framework for answering (STAR method):**

**Situation:** Describe the project scope and what made it technically challenging.
Example: "We were building a real-time analytics dashboard that needed to display live data for 10,000+ data points without UI lag."

**Task:** What was your specific role and responsibility?
"I was responsible for the frontend architecture and ensuring the dashboard stayed performant as we scaled."

**Action:** What specific technical decisions did you make?
• "I introduced TanStack Virtual to virtualize large lists — reduced render time by 80%"
• "Moved to WebSocket subscriptions with delta updates instead of polling"
• "Implemented useDeferredValue to keep filters responsive while heavy charts updated"

**Result:** Quantifiable outcome.
"Dashboard went from 4s render time to under 400ms, and we scaled to 50k concurrent users."

**Tips:**
• Have a specific technical challenge ready (performance, state sync, complex UI)
• Mention mistakes you made and what you learned
• Show you can measure impact (metrics, before/after)
• Focus on the problem-solving process, not just the happy path`,
    tags: ["behavioral", "interview", "star method"],
  },
  {
    id: 56,
    category: "behavioral",
    q: "Describe a production issue you fixed.",
    a: `**What interviewers want to hear:** Debugging process, how you stayed calm, what you learned.

**Good structure:**
1. What was the symptom users reported?
2. How did you detect/reproduce it?
3. How did you root-cause it?
4. What was the fix?
5. What did you do to prevent recurrence?

**Example answer:**
"We had a memory leak in production — the app would slow down after 30+ minutes of use. Users on the dashboard complained it became unresponsive.

I used Chrome's Memory tab to take heap snapshots over time. The heap kept growing. I traced it to a WebSocket event listener being added on every re-render but never removed — a missing cleanup in useEffect.

Fixed it by adding the disconnect in the return function. Added a monitoring alert for abnormal memory growth. Also wrote a test that mounted/unmounted the component 100 times and checked for listener leaks."

**Key themes to hit:**
• You used data/tools to find root cause (not guesswork)
• You had a methodical approach
• You added prevention (monitoring, tests)
• You communicated with stakeholders`,
    tags: ["behavioral", "debugging", "production"],
  },
  {
    id: 57,
    category: "behavioral",
    q: "Tell me about a performance optimization you implemented.",
    a: `**Structure: Problem → Measurement → Solution → Impact**

**Template answer:**
"The product listing page on our e-commerce app had a 4-second TTI (Time to Interactive). Users were dropping off before the page loaded.

**Measurement first:** I used Lighthouse and the Webpack Bundle Analyzer. Found that:
• Our bundle was 2.4MB (uncompressed)
• We were importing all of moment.js (230KB) just for date formatting
• The entire product grid rendered on initial load even though users saw only 12 items

**Solutions:**
1. Replaced moment.js with date-fns tree-shaken imports → saved 180KB
2. Added code splitting on routes with React.lazy → initial bundle dropped from 2.4MB to 600KB
3. Added react-window to virtualize the product grid → 1,000 items rendered at DOM cost of ~15

**Result:** TTI improved from 4s to 1.1s on 3G. Bounce rate dropped 23%."

**Tips:**
• Always mention measuring first
• Give concrete numbers (before/after)
• Show you know the right tools`,
    tags: ["behavioral", "performance", "optimization"],
  },
  {
    id: 58,
    category: "behavioral",
    q: "How did you reduce bundle size in a project?",
    a: `**The answer should show a systematic approach:**

**Step 1: Measure**
"I started by running webpack-bundle-analyzer (or vite-bundle-visualizer) to see what was in our bundle. Never optimize blindly."

**Step 2: Identify big wins**
Common findings:
• Moment.js, lodash, or full chart library included entirely
• Development-only dependencies in production build
• Large images or fonts bundled in JS

**Step 3: Apply optimizations**
• **Route-level code splitting** with React.lazy — biggest win usually
• **Replace heavy libraries:** moment → date-fns, full lodash → specific lodash-es functions
• **Tree shaking:** switch from \`import lib from 'lib'\` to \`import { fn } from 'lib'\`
• **Dynamic imports** for rarely-used features (e.g., PDF export module)
• **Externalize from CDN** for React, ReactDOM if appropriate

**Step 4: Verify**
Re-run bundle analyzer. Check Lighthouse before/after. Track in CI with size-limit:
\`\`\`json
"size-limit": [{ "path": "dist/app.js", "limit": "200 KB" }]
\`\`\`

**Result example:** "Reduced from 2.1MB to 480KB. First load time improved from 5s to 1.4s on 3G."`,
    tags: ["behavioral", "bundle size", "performance"],
  },
  {
    id: 59,
    category: "behavioral",
    q: "Describe a disagreement with a backend developer.",
    a: `**What they're testing:** Communication, technical judgment, collaboration, maturity.

**Structure:**
1. What was the technical disagreement?
2. How did you make your case?
3. How was it resolved?
4. What did you learn?

**Example answer:**
"I disagreed with a backend developer about our API response structure. They wanted to return deeply nested objects (5 levels) to match the database schema. I argued for flatter, frontend-optimized responses.

I didn't just say 'this is bad.' I prepared data: showed how the deep nesting required complex transformation logic on the frontend that would run on every render, and pulled benchmarks showing the difference.

We had a meeting where I proposed a specific alternative structure. I acknowledged their concern about extra backend work, and offered to help define the contracts.

We landed on a compromise: a normalized response format (similar to what RTK Query or JSON:API uses). Both teams owned the schema definition.

The new API was cleaner on both sides and we documented it in OpenAPI."

**Key points:**
• You used data, not just opinions
• You listened to their concerns
• You found a shared solution
• No "I was right, they were wrong" energy`,
    tags: ["behavioral", "collaboration", "communication"],
  },
  {
    id: 60,
    category: "behavioral",
    q: "Explain a technical decision you made and defended.",
    a: `**What they're testing:** Technical leadership, conviction backed by data, ability to communicate tradeoffs.

**Structure:**
1. Context — what decision was needed?
2. What were the options?
3. What did you recommend and why?
4. What resistance did you face?
5. How did you defend it?
6. Outcome?

**Example answer:**
"We needed to choose a state management library for a new app. The team defaulted to Redux because that's what we'd always used. I proposed Zustand instead.

My reasoning: Redux Toolkit was still 3x more boilerplate than Zustand for our use case. We had no strict need for Redux DevTools time-travel. Our state was not highly normalized.

Some senior engineers pushed back — 'Redux is industry standard.' I ran a proof-of-concept and demoed the same feature in both. Zustand: 40 lines. RTK: 120 lines. Same behavior, same DevTools support.

I also researched adoption: Zustand passed 3M weekly npm downloads, used at major companies.

We adopted Zustand. 6 months later, new engineers ramp up on it faster, and our state code is significantly more readable. I'd defend the decision again."

**Show:** You did research. You listened. You had conviction AND flexibility.`,
    tags: ["behavioral", "technical decision", "leadership"],
  },
];

const difficultyMap = {
  "react-fundamentals": "Intermediate",
  "advanced-react": "Advanced",
  coding: "Coding",
  javascript: "Intermediate",
  state: "Intermediate",
  performance: "Advanced",
  "system-design": "Advanced",
  debugging: "Intermediate",
  behavioral: "Soft Skills",
};

const difficultyColor = {
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-rose-100 text-rose-700",
  Coding: "bg-emerald-100 text-emerald-700",
  "Soft Skills": "bg-purple-100 text-purple-700",
};

function CodeBlock({ code }) {
  return (
    <pre
      className="
        my-4
        overflow-x-auto
        rounded-2xl
        border
        border-zinc-200
        bg-zinc-950
        p-5
        text-[13px]
        leading-7
        text-zinc-100
        font-mono
        shadow-sm
      "
    >
      <code>{code}</code>
    </pre>
  );
}

function AnswerBlock({ text }) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div
      className="
        text-[15px]
        leading-8
        text-zinc-600
        tracking-[-0.01em]
        space-y-4
      "
    >
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/```[a-z]*\n?/, "").replace(/```$/, "");

          return <CodeBlock key={i} code={code} />;
        }

        const lines = part.split("\n").filter(Boolean);

        return (
          <div key={i} className="space-y-3">
            {lines.map((line, j) => {
              if (
                line.startsWith("**") &&
                line.endsWith("**") &&
                line.length > 4 &&
                !line.slice(2, -2).includes("**")
              ) {
                return (
                  <h3
                    key={j}
                    className="
                      text-xl
                      font-semibold
                      text-zinc-900
                      tracking-tight
                      mt-8
                      first:mt-0
                    "
                  >
                    {line.slice(2, -2)}
                  </h3>
                );
              }

              if (line.startsWith("• ")) {
                return (
                  <div
                    key={j}
                    className="
                      flex
                      items-start
                      gap-3
                      py-0.5
                    "
                  >
                    <span
                      className="
                        mt-[10px]
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-zinc-400
                        flex-shrink-0
                      "
                    />

                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .slice(2)
                          .replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="font-semibold text-zinc-900">$1</strong>',
                          )
                          .replace(
                            /`(.*?)`/g,
                            '<code class="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-zinc-200">$1</code>',
                          ),
                      }}
                    />
                  </div>
                );
              }

              return (
                <p
                  key={j}
                  className="text-zinc-600"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-semibold text-zinc-900">$1</strong>',
                      )
                      .replace(
                        /`(.*?)`/g,
                        '<code class="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-zinc-200">$1</code>',
                      ),
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function QuestionCard({ q, cat }) {
  const [open, setOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`
      relative
      overflow-hidden
      rounded-3xl
      border
      ${cat.border}
      ${open ? `bg-gradient-to-br ${cat.bg}` : "bg-white"}
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-0.5
      transition-all
      duration-300
    `}
    >
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-3"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${cat.color} text-white text-xs font-bold flex items-center justify-center mt-0.5`}
        >
          {q.id}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm leading-snug">
            {q.q}
          </p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[difficultyMap[q.category]]}`}
            >
              {difficultyMap[q.category]}
            </span>
            {q.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className={`p-1 rounded-full transition-colors ${bookmarked ? "text-amber-500" : "text-gray-300 hover:text-amber-400"}`}
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked((b) => !b);
            }}
            title="Bookmark"
          >
            <svg
              className="w-4 h-4"
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-dashed border-gray-200 mt-1 pt-4">
          <AnswerBlock text={q.a} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchCat =
        activeCategory === "all" || q.category === activeCategory;
      const matchSearch =
        !search ||
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const catForQ = (q) => categories.find((c) => c.id === q.category);
  const totalByCategory = (id) =>
    questions.filter((q) => q.category === id).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight">
                React Interview Prep
              </h1>
              <p className="text-xs text-gray-400">
                60 Questions · Google, Meta, Microsoft
              </p>
            </div>
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="pl-8 pr-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 w-48"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-1.5">
            <span className="text-xs text-gray-500 font-medium">
              {filtered.length} shown
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Total Questions",
              val: 60,
              color: "from-blue-500 to-indigo-500",
            },
            {
              label: "Categories",
              val: 9,
              color: "from-violet-500 to-purple-500",
            },
            {
              label: "Coding Challenges",
              val: 8,
              color: "from-emerald-500 to-teal-500",
            },
            {
              label: "System Design",
              val: 5,
              color: "from-sky-500 to-blue-500",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}
              >
                {s.val}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === "all" ? "bg-gray-900 text-white shadow" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
          >
            All ({questions.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === c.id ? `bg-gradient-to-r ${c.color} text-white shadow` : `bg-white text-gray-600 border border-gray-200 hover:border-gray-300`}`}
            >
              {c.label} ({totalByCategory(c.id)})
            </button>
          ))}
        </div>

        {/* Questions */}
        {/* Questions */}
        {activeCategory === "all" && !search ? (
          categories.map((cat) => {
            const catQs = filtered.filter((q) => q.category === cat.id);
            if (!catQs.length) return null;

            return (
              <section
                key={cat.id}
                className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${cat.color}`}
                    />

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {cat.label}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Frequently asked questions
                      </p>
                    </div>
                  </div>

                  <span
                    className="
              rounded-full
              border border-slate-200
              bg-slate-50
              px-3 py-1
              text-xs
              font-medium
              text-slate-600
            "
                  >
                    {catQs.length} questions
                  </span>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {catQs.map((q) => (
                    <QuestionCard key={q.id} q={q} cat={cat} />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <QuestionCard key={q.id} q={q} cat={catForQ(q)} />
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-20">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-2xl">🔍</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  No questions found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try adjusting your search or selecting another category
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-400 pb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
            <span>🎯</span>
            <span>
              Target: 40% JavaScript · 35% React · 15% System Design · 10%
              Behavioral
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
