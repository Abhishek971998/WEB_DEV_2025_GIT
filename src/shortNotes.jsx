import { useState, useMemo } from "react";

const notes = [
  {
    cat: "js",
    text: '<code>[] == ""</code> returns <code>true</code> because <code>[]</code> coerces to <code>""</code>',
  },
  {
    cat: "js",
    text: "<code>delete</code> operator returns <code>true</code> if deletion is successful",
  },
  {
    cat: "js",
    text: '<code>parseInt("100Abhsi")</code> returns <code>100</code> — stops at first non-numeric char',
  },
  {
    cat: "js",
    text: '<code>parseInt("100+20")</code> returns <code>100</code>; <code>parseInt(100+33)</code> returns <code>133</code>',
  },
  {
    cat: "js",
    text: "<code>3.14.toString()</code> fails — use <code>(3.14).toString()</code> or <code>String(3.14)</code>",
  },
  {
    cat: "js",
    text: "<code>0 == -0</code> is <code>true</code>; use <code>Object.is(0, -0)</code> to distinguish them",
  },
  {
    cat: "js",
    text: "<code>NaN == NaN</code> is <code>false</code>; use <code>Number.isNaN()</code> to check",
  },
  {
    cat: "js",
    text: 'Unary plus converts to number: <code>+true === 1</code>, <code>+"3" === 3</code>',
  },
  {
    cat: "js",
    text: "Boxing: primitives temporarily convert to objects to access methods, then get destroyed",
  },
  {
    cat: "js",
    text: "<code>null</code> and <code>undefined</code> have no methods — accessing them throws TypeError",
  },
  {
    cat: "js",
    text: "<code>{ count: 0 } == { count: 0 }</code> is <code>false</code> — object equality checks reference, not value",
  },
  {
    cat: "js",
    text: 'Use <code>??</code> (nullish coalescing) when the value might be <code>null</code> or <code>undefined</code> — unlike <code>||</code>, it won\'t catch falsy values like <code>0</code> or <code>""</code>',
  },
  {
    cat: "js",
    text: "Modern JS engines use JIT (Just-In-Time) compilation — code is compiled at runtime, not ahead of time",
  },
  {
    cat: "js",
    text: "Only <code>var</code> declarations attach to the global <code>window</code> object in browsers. <code>let</code> and <code>const</code> do not",
  },
  {
    cat: "js",
    text: '<code>arguments[0] = "new value"</code> works only in non-strict mode; in strict mode <code>arguments</code> is not linked to params',
  },
  {
    cat: "js",
    text: "<code>getData.length</code> ignores default params and rest params; <code>arguments.length</code> reflects actual args passed",
  },
  {
    cat: "js",
    text: "A <strong>closure</strong> is a function that retains access to its outer scope even after the outer function has returned",
    isNew: true,
  },
  {
    cat: "js",
    text: "Every JS object has a hidden <code>[[Prototype]]</code> link. Property lookup walks the chain until <code>null</code> is reached",
    isNew: true,
  },
  {
    cat: "js",
    text: "The <strong>event loop</strong>: synchronous code runs first → microtasks (Promises, queueMicrotask) → macrotasks (setTimeout, setInterval)",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>Promise.all()</code> rejects if any promise rejects; <code>Promise.allSettled()</code> always resolves with all outcomes",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>async/await</code> is syntactic sugar over Promises — errors must be caught with <code>try/catch</code>",
    isNew: true,
  },
  {
    cat: "js",
    text: "<strong>Debounce</strong>: delays function execution until after a pause. <strong>Throttle</strong>: limits execution to once per interval",
    isNew: true,
  },
  {
    cat: "js",
    text: '<code>typeof null === "object"</code> — a historical bug in JS, not an actual object',
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>==</code> does type coercion; <code>===</code> does not. Always prefer <code>===</code>",
    isNew: true,
  },
  {
    cat: "js",
    text: "<strong>Spread</strong> (<code>...</code>) creates a shallow copy — nested objects are still shared by reference",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>Map</code> preserves insertion order and allows any type as key. <code>Object</code> keys are always strings/Symbols",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>WeakMap</code> / <code>WeakSet</code> hold weak references — entries are garbage collected when key has no other references",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>Symbol()</code> always creates a unique value — useful as object keys to avoid name collisions",
    isNew: true,
  },
  {
    cat: "js",
    text: "Generators (<code>function*</code>) return an iterator. <code>yield</code> pauses execution and returns a value lazily",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>structuredClone(obj)</code> performs a true deep clone (no JSON round-trip hack needed)",
    isNew: true,
  },

  {
    cat: "scope",
    text: "5 types of scope: global, block, function/local, module, script",
  },
  {
    cat: "scope",
    text: '<code>&lt;script type="module"&gt;</code> makes variables module-scoped — not accessible from other files or <code>window</code>',
  },
  {
    cat: "scope",
    text: "In arrow functions, <code>this</code> is inherited from the enclosing scope (lexical). Useful inside <code>setTimeout</code> or callbacks",
  },
  {
    cat: "scope",
    text: "<code>let</code> creates block scope — not accessible outside the <code>{}</code> it was declared in",
  },
  {
    cat: "scope",
    text: "<code>this</code> in a regular function depends on how it is called: method call → object, standalone call → global/<code>undefined</code> (strict)",
    isNew: true,
  },
  {
    cat: "scope",
    text: "<code>call(ctx, a, b)</code>, <code>apply(ctx, [a,b])</code>, and <code>bind(ctx)</code> all explicitly set <code>this</code>",
    isNew: true,
  },
  {
    cat: "scope",
    text: "The Temporal Dead Zone (TDZ): <code>let</code>/<code>const</code> are hoisted but not initialized — accessing before declaration throws ReferenceError",
    isNew: true,
  },
  {
    cat: "scope",
    text: "<code>var</code> is hoisted and initialized as <code>undefined</code>. <code>function</code> declarations are fully hoisted",
    isNew: true,
  },
  {
    cat: "scope",
    text: "IIFE (Immediately Invoked Function Expression) creates a private scope: <code>(function(){ ... })()</code>",
    isNew: true,
  },

  {
    cat: "react",
    text: "React uses shallow comparison for state updates — reference change matters, not value",
  },
  {
    cat: "react",
    text: "React batches state updates (React 18+ batches all updates, even inside setTimeout/events)",
  },
  {
    cat: "react",
    text: "<code>useState</code> updates are asynchronous — the new value is not immediately available after calling the setter",
  },
  {
    cat: "react",
    text: "Direct value updates overwrite each other. Functional updates (<code>prev => prev + 1</code>) build on each other correctly",
  },
  {
    cat: "react",
    text: "Effects mount from child to parent; cleanup runs in reverse order",
  },
  {
    cat: "react",
    text: "Prefer primitive values in dependency arrays. Extract nested values rather than passing whole objects",
  },
  {
    cat: "react",
    text: "Use stable, unique keys (prefer IDs over index). Index keys in mutable lists can mix up component state",
  },
  {
    cat: "react",
    text: "Avoid inline anonymous arrow functions in JSX when possible — harder to trace in stack traces and profiler",
  },
  {
    cat: "react",
    text: "<code>useEffect</code> cleanup prevents state updates after unmount and avoids race conditions in async operations",
  },
  {
    cat: "react",
    text: 'Set <code>&lt;button type="button"&gt;</code> to avoid accidental form submissions',
  },
  {
    cat: "react",
    text: "<code>useMemo</code> memoizes a computed value. <code>useCallback</code> memoizes a function reference. Both only help when the cost of recomputing exceeds the cost of caching",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>React.memo()</code> skips re-rendering a component if props haven't changed (shallow comparison)",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>useRef</code> persists a value across renders without causing a re-render. Also used to reference DOM elements",
    isNew: true,
  },
  {
    cat: "react",
    text: "<strong>Lifting state up</strong>: move shared state to the nearest common ancestor instead of duplicating it",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>useContext</code> avoids prop drilling, but overusing it can make components harder to reuse and test",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>useReducer</code> is preferable to <code>useState</code> when next state depends on complex logic or multiple sub-values",
    isNew: true,
  },
  {
    cat: "react",
    text: "Controlled input: value comes from state. Uncontrolled input: DOM manages its own value via <code>ref</code>",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>key</code> prop forces React to unmount and remount a component when it changes — useful to reset state",
    isNew: true,
  },
  {
    cat: "react",
    text: "Avoid storing derived data in state — compute it from existing state during render instead",
    isNew: true,
  },
  {
    cat: "react",
    text: "<code>Suspense</code> shows a fallback while lazy-loaded components or data are loading",
    isNew: true,
  },

  {
    cat: "css",
    text: '<code>div[role="button"][tabIndex="0"]</code> makes a div keyboard-accessible like a button — but prefer a real <code>&lt;button&gt;</code>',
  },
  {
    cat: "css",
    text: "<code>:nth-child(even)</code> / <code>:nth-child(odd)</code> styles alternating children",
  },
  {
    cat: "css",
    text: "<code>all: unset</code> removes all default browser styles from an element",
  },
  {
    cat: "css",
    text: "<strong>Specificity order</strong>: inline styles > ID > class/attribute/pseudo-class > element/pseudo-element. <code>!important</code> overrides all",
    isNew: true,
  },
  {
    cat: "css",
    text: "<code>position: sticky</code> acts like <code>relative</code> until it hits a scroll threshold, then like <code>fixed</code>",
    isNew: true,
  },
  {
    cat: "css",
    text: "<code>z-index</code> only works on positioned elements (<code>relative</code>, <code>absolute</code>, <code>fixed</code>, <code>sticky</code>)",
    isNew: true,
  },
  {
    cat: "css",
    text: "<strong>Stacking context</strong>: created by <code>position + z-index</code>, <code>opacity &lt; 1</code>, <code>transform</code>, etc. Children cannot escape their stacking context",
    isNew: true,
  },
  {
    cat: "css",
    text: "<code>em</code> is relative to the element's own font-size; <code>rem</code> is relative to the root (<code>html</code>) font-size",
    isNew: true,
  },
  {
    cat: "css",
    text: "<code>display: flex</code> lays children out in one direction. <code>display: grid</code> lays them out in two dimensions",
    isNew: true,
  },
  {
    cat: "css",
    text: "<code>will-change: transform</code> hints the browser to promote an element to its own GPU layer — use sparingly",
    isNew: true,
  },

  {
    cat: "npm",
    text: "<code>npm install</code> adds packages to <code>node_modules</code> and records them in <code>package.json</code>",
  },
  {
    cat: "npm",
    text: "<code>npx</code> runs a package without permanently installing it",
  },
  {
    cat: "npm",
    text: "<code>package.json</code> lists dependencies and scripts — manually editable",
  },
  {
    cat: "npm",
    text: "<code>package-lock.json</code> locks exact dependency versions — auto-generated, do not hand-edit",
  },
  {
    cat: "npm",
    text: "<code>npm install --save-dev</code> adds to <code>devDependencies</code> — tools only needed during development, not in production",
    isNew: true,
  },
  {
    cat: "npm",
    text: "<code>~1.2.3</code> allows patch updates; <code>^1.2.3</code> allows minor + patch updates in <code>package.json</code> semver ranges",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code>If promise have setimeout they behave the same as they behave global scope</code> ",
    isNew: true,
  },
  {
    cat: "js",
    text: "<code> Arrow functions ignore call, apply, bind</code> ",
    isNew: true,
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "js", label: "JS" },
  { id: "react", label: "React" },
  { id: "scope", label: "Scope/This" },
  { id: "css", label: "CSS" },
  { id: "npm", label: "npm" },
  { id: "new", label: "✦ New" },
];

const TAG_STYLES = {
  js: { bg: "#dbeafe", color: "#1e40af" },
  react: { bg: "#ede9fe", color: "#4c1d95" },
  scope: { bg: "#fee2e2", color: "#7f1d1d" },
  css: { bg: "#d1fae5", color: "#064e3b" },
  npm: { bg: "#fef3c7", color: "#78350f" },
};

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "").toLowerCase();
}

export default function NotesApp() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return notes.filter((n) => {
      const matchQ = !q || stripHtml(n.text).includes(q);
      const matchCat =
        activeFilter === "all" ||
        (activeFilter === "new" && n.isNew) ||
        n.cat === activeFilter;
      return matchQ && matchCat;
    });
  }, [query, activeFilter]);

  return (
    <div style={styles.root}>
      {/* toolbar */}
      <div style={styles.toolbar}>
        <input
          style={styles.search}
          placeholder="Search notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                ...styles.filterBtn,
                ...(activeFilter === f.id ? styles.filterBtnActive : {}),
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p style={styles.count}>
        {filtered.length} note{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* grid */}
      <div style={styles.grid}>
        {filtered.map((note, i) => (
          <NoteCard key={i} note={note} />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ note }) {
  const tag = TAG_STYLES[note.cat] || TAG_STYLES.js;
  const label = note.cat === "scope" ? "scope/this" : note.cat;

  return (
    <div
      style={{
        ...styles.card,
        ...(note.isNew ? styles.cardNew : {}),
      }}
    >
      <div style={styles.cardHeader}>
        <span
          style={{
            ...styles.tag,
            background: tag.bg,
            color: tag.color,
          }}
        >
          {label}
        </span>
        {note.isNew && <span style={styles.newBadge}>new</span>}
      </div>
      <p
        style={styles.noteText}
        dangerouslySetInnerHTML={{
          __html: note.text
            .replace(/<strong>/g, "<b>")
            .replace(/<\/strong>/g, "</b>"),
        }}
      />
    </div>
  );
}

const styles = {
  root: {
    // fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
    padding: "1.5rem 1rem",
    maxWidth: 960,
    margin: "0 auto",
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: "1rem",
  },
  search: {
    width: "100%",
    height: 38,
    padding: "0 14px",
    fontSize: 18,
    fontFamily: "inherit",
    border: "1.5px solid #d1d5db",
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    color: "#111",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  filterBtn: {
    height: 28,
    padding: "0 12px",
    fontSize: 12,
    fontFamily: "inherit",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "transparent",
    color: "#6b7280",
    cursor: "pointer",
    transition: "all 0.15s",
    fontWeight: 500,
  },
  filterBtnActive: {
    background: "#1e40af",
    color: "#fff",
    borderColor: "#1e40af",
  },
  count: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: "0.75rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10,
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "0.85rem 1rem",
  },
  cardNew: {
    borderLeft: "3px solid #059669",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  tag: {
    display: "inline-block",
    fontSize: 11,
    padding: "2px 8px",
    borderRadius: 5,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  newBadge: {
    fontSize: 10,
    fontWeight: 600,
    background: "#d1fae5",
    color: "#065f46",
    padding: "2px 7px",
    borderRadius: 5,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  noteText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#1f2937",
    margin: 0,
  },
};
