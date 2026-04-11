import React from "react";

const notes = [
  '[] == "" returns true because [] converts to ""',
  "delete operator returns true if deletion is successful",
  '<div role="button" tabIndex={0}> makes a div behave like a button',
  ":nth-child(even) or :nth-child(odd) helps style alternating children",
  'arguments[0] = "new value" works only in non-strict mode',
  "function getData(a, b, ...rest) or (a = 2, b): arguments.length and getData.length ignore default/rest params",
  "5 types of scope: global, block, function/local, module, script",
  '<script type="module"> makes variables module-scoped (private)',
  "[[1, 2, [3, 4]]] use flat() or toString(); flat() only flattens one level by default",

  "Not everything in JavaScript is an object",
  "Boxing: primitives temporarily convert to objects, then get destroyed",
  "null and undefined do not have methods",
  'Set button type to "button" to avoid accidental form submit',
  "To remove all default styles of a tag, use: all: unset",
  "In arrow functions, this is inherited from parent scope (for example in setTimeout)",
  "Unary plus converts to number: +true === 1",

  'parseInt("100Abhsi") returns 100',
  'parseInt("100+20") returns 100',
  "parseInt(100 + 33) returns 133",

  "npm installs packages globally or locally",
  "npx runs a package without permanently installing it",

  "package.json lists dependencies and scripts, and is editable",
  "package-lock.json locks exact dependency versions and is auto-generated",

  "{ count: 0 } == { count: 0 } is false because object references differ",
  "React uses shallow comparison for state updates (reference change matters)",

  "Avoid inline anonymous arrow functions in JSX when possible for better traceability",

  "React batches state updates",
  "setState/useState updates are asynchronous",
  "React does not track normal variable value changes",

  "Effects mount from child to parent and unmount in reverse order",

  "Prefer primitive values in dependency arrays over objects/arrays when possible",
  "Extract nested primitive values and use those in dependencies",

  "Always use unique and stable keys (prefer IDs over index) in lists",
  "Using index keys in mutable lists can mix up component state",

  "Modern JS engines use JIT (Just-In-Time) compilation",
  "Only var declarations attach to global window scope in browser global context",
  "let creates block scope",

  "3.14.toString() fails due to parser confusion; use (3.14).toString() or String(3.14)",
  "0 == -0 is true",
  "NaN == NaN is false",
  "Use Object.is(0, -0) to distinguish 0 and -0",
  "useState updates are asynchronous",
  "setState/useState updates are asynchronous",
  "Direct values → overwrite each other",
  "Functions → build on each other ********",
  "Effects mount from child to parent and unmount in reverse order",
  "Prefer primitive values in dependency arrays over objects/arrays when possible",
  "Extract nested primitive values and use those in dependencies",
  "Always use unique and stable keys (prefer IDs over index) in lists",
  "Using index keys in mutable lists can mix up component state",
];

const RevisionShorts = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Front-end Master – Shorts #4
        </h2>

        <div className="space-y-4 text-gray-800">
          {notes.map((note, index) => (
            <h3
              key={index}
              className="bg-blue-50 p-3 rounded-md shadow-sm leading-relaxed"
            >
              ✅ {note}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionShorts;
