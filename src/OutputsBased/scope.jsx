/************************************************************
  JAVASCRIPT HOISTING + SCOPE + CLOSURE PRACTICE QUESTIONS
  Practice:
  1. Predict output
  2. Predict errors
  3. Then run
************************************************************/

/******************** 1. Basic Hoisting ********************/

console.log("--------- Q1 ---------");

console.log(q1_a);
var q1_a = 10;

console.log(q1_b);
let q1_b = 20;

/******************** 2. Function Scope vs Global Scope ********************/

console.log("--------- Q2 ---------");

var q2_x = 1;

function q2_test() {
  console.log(q2_x);

  var q2_x = 2;

  console.log(q2_x);
}

q2_test();

console.log(q2_x);

/******************** 3. let vs var Inside Block ********************/

console.log("--------- Q3 ---------");

var q3_a = 100;

{
  console.log(q3_a);

  let q3_a = 200;

  console.log(q3_a);
}

/******************** 4. Function Hoisting ********************/

console.log("--------- Q4 ---------");

q4_abc();

function q4_abc() {
  console.log("Function Declaration");
}

q4_xyz();

var q4_xyz = function () {
  console.log("Function Expression");
};

/******************** 5. Nested Scope Challenge ********************/

console.log("--------- Q5 ---------");

var q5_a = 10;

function q5_outer() {
  var q5_a = 20;

  function q5_inner() {
    console.log(q5_a);

    var q5_a = 30;

    console.log(q5_a);
  }

  q5_inner();
}

q5_outer();

/******************** 6. Closures + Loop ********************/

console.log("--------- Q6 ---------");

for (var q6_i = 0; q6_i < 3; q6_i++) {
  setTimeout(() => {
    console.log(q6_i);
  }, 100);
}

/******************** 7. Temporal Dead Zone ********************/

console.log("--------- Q7 ---------");

let q7_a = 10;

function q7_test() {
  console.log(q7_a);

  let q7_a = 20;
}

q7_test();

/******************** 8. Scope Chain ********************/

console.log("--------- Q8 ---------");

var q8_a = 1;

function q8_one() {
  var q8_a = 2;

  function q8_two() {
    console.log(q8_a);
  }

  q8_two();
}

q8_one();

/******************** 9. Tricky var Redeclaration ********************/

console.log("--------- Q9 ---------");

var q9_a = 1;

function q9_test() {
  console.log(q9_a);

  if (false) {
    var q9_a = 5;
  }

  console.log(q9_a);
}

q9_test();

/******************** 10. Parameter vs Variable ********************/

console.log("--------- Q10 ---------");

function q10_test(q10_a) {
  console.log(q10_a);

  var q10_a = 20;

  console.log(q10_a);
}

q10_test(10);

/******************** 11. Function Declaration Inside Function ********************/

console.log("--------- Q11 ---------");

function q11_test() {
  console.log(q11_a);

  function q11_a() {}

  var q11_a = 10;

  console.log(q11_a);
}

q11_test();

/******************** 12. Lexical Scope ********************/

console.log("--------- Q12 ---------");

function q12_x() {
  var q12_a = 10;

  function q12_y() {
    console.log(q12_a);
  }

  return q12_y;
}

const q12_z = q12_x();

q12_z();

/******************** 13. Mutation vs Reassignment ********************/

console.log("--------- Q13 ---------");

const q13_obj = {
  name: "JS",
};

q13_obj.name = "React";

console.log(q13_obj);

q13_obj = {};

/******************** 14. Event Loop + Hoisting Combo ********************/

console.log("--------- Q14 ---------");

console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/******************** 15. Ultimate Interview Combo ********************/

console.log("--------- Q15 ---------");

var q15_a = 100;

function q15_demo() {
  console.log(q15_a);

  var q15_a = 10;

  function q15_inner() {
    console.log(q15_a);

    var q15_a = 20;
  }

  q15_inner();

  console.log(q15_a);
}

q15_demo();

console.log(q15_a);

/******************** 16. Advanced Mixed Scope ********************/

console.log("--------- Q16 ---------");

var q16_a = 1;

function q16_x() {
  console.log(q16_a);

  var q16_a = 2;

  function q16_y() {
    console.log(q16_a);

    var q16_a = 3;

    console.log(q16_a);
  }

  q16_y();

  console.log(q16_a);
}

q16_x();

console.log(q16_a);

/******************** 17. var Inside Block ********************/

console.log("--------- Q17 ---------");

var q17_a = 50;

if (true) {
  var q17_a = 100;
}

console.log(q17_a);

/******************** 18. let Inside Block ********************/

console.log("--------- Q18 ---------");

let q18_a = 50;

if (true) {
  let q18_a = 100;
  console.log(q18_a);
}

console.log(q18_a);

/******************** 19. Function Expression Hoisting ********************/

console.log("--------- Q19 ---------");

console.log(q19_test);

var q19_test = function () {
  console.log("Hello");
};

console.log(q19_test);

/******************** 20. Closures with setTimeout ********************/

console.log("--------- Q20 ---------");

function q20_outer() {
  for (let q20_i = 0; q20_i < 3; q20_i++) {
    setTimeout(() => {
      console.log(q20_i);
    }, 100);
  }
}

q20_outer();

/******************** 21. Shadowing ********************/

console.log("--------- Q21 ---------");

let q21_a = "global";

function q21_test() {
  let q21_a = "local";

  console.log(q21_a);
}

q21_test();

console.log(q21_a);

/******************** 22. Illegal Shadowing ********************/

console.log("--------- Q22 ---------");

let q22_a = 10;

function q22_test() {
  // Uncomment to test illegal shadowing

  var q22_a = 20;

  console.log("Check illegal shadowing");
}

q22_test();

/******************** 23. Closures Counter ********************/

console.log("--------- Q23 ---------");

function q23_counter() {
  let q23_count = 0;

  return function () {
    q23_count++;

    console.log(q23_count);
  };
}

const q23_increment = q23_counter();

q23_increment();
q23_increment();
q23_increment();

/******************** 24. Arrow Function + this ********************/

console.log("--------- Q24 ---------");

const q24_obj = {
  name: "JavaScript",

  regularFunction: function () {
    console.log(this.name);
  },

  arrowFunction: () => {
    console.log(this.name);
  },
};

q24_obj.regularFunction();
q24_obj.arrowFunction();

/******************** 25. Final Boss ********************/

console.log("--------- Q25 ---------");

var q25_name = "Global";

function q25_outer() {
  console.log(q25_name);

  var q25_name = "Outer";

  function q25_inner() {
    console.log(q25_name);

    let q25_name = "Inner";

    console.log(q25_name);
  }

  q25_inner();

  console.log(q25_name);
}

q25_outer();

console.log(q25_name);

////////claude

// ============================================================
// FRONTEND INTERVIEW PRACTICE FILE
// React Tricky Questions | Machine Coding | JS Output MCQs
// All variable names are unique for easy practice/search
// ============================================================

// ════════════════════════════════════════════════════════════
// SECTION 1 — REACT TRICKY INTERVIEW QUESTIONS
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// Q1. Why does this NOT re-render even after setState?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: React does a shallow comparison for objects in useState.
  If you mutate the existing object (same reference), React skips re-render.
*/
import React, { useState } from "react";

function ComponentMutatedState() {
  const [userProfile, setUserProfile] = useState({ name: "Alice", age: 25 });

  const handleBirthdayBug = () => {
    userProfile.age += 1; // ❌ mutates existing object — same reference
    setUserProfile(userProfile); // React sees same ref → NO re-render
  };

  const handleBirthdayFix = () => {
    setUserProfile({ ...userProfile, age: userProfile.age + 1 }); // ✅ new object
  };

  return (
    <div>
      <p>Age: {userProfile.age}</p>
      <button onClick={handleBirthdayBug}>Bug (no re-render)</button>
      <button onClick={handleBirthdayFix}>Fix</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Q2. Stale closure inside useEffect — classic trap
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: The interval callback closes over the initial value of staleCounter
  because the effect runs only once ([] deps). staleCounter is always 0 inside.
*/
import { useEffect, useRef } from "react";

function ComponentStaleCounter() {
  const [staleCounter, setStaleCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("staleCounter inside interval:", staleCounter); // always 0 ❌
      setStaleCounter(staleCounter + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // ← staleCounter missing from deps

  // FIX: use functional update form — no closure dependency needed
  useEffect(() => {
    const intervalIdFixed = setInterval(() => {
      setStaleCounter((prev) => prev + 1); // ✅ always correct
    }, 1000);
    return () => clearInterval(intervalIdFixed);
  }, []);

  return <p>Counter: {staleCounter}</p>;
}

// ─────────────────────────────────────────────────────────────
// Q3. useEffect cleanup — what gets logged and when?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: Cleanup runs BEFORE the next effect, not after unmount only.
  Order: mount → effect A → [re-render] → cleanup A → effect B → unmount → cleanup B
*/
function ComponentEffectCleanup() {
  const [toggleFlag, setToggleFlag] = useState(false);

  useEffect(() => {
    console.log("effect ran, toggleFlag =", toggleFlag);
    return () => {
      console.log("cleanup ran, toggleFlag =", toggleFlag); // logs OLD value
    };
  }, [toggleFlag]);

  return <button onClick={() => setToggleFlag((f) => !f)}>Toggle</button>;
}

// ─────────────────────────────────────────────────────────────
// Q4. Keys and reconciliation — why does state reset?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: When the `key` prop changes, React destroys and remounts the component.
  Its internal state is completely reset. Useful trick, but bites you if accidental.
*/
function ChildWithOwnInput() {
  const [inputText, setInputText] = useState("");
  return (
    <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
  );
}

function ParentKeyDemo() {
  const [keyIndex, setKeyIndex] = useState(0);
  return (
    <div>
      {/* Changing key resets ChildWithOwnInput's inputText state */}
      <ChildWithOwnInput key={keyIndex} />
      <button onClick={() => setKeyIndex((k) => k + 1)}>
        Reset child state via key
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Q5. Batched state updates — how many re-renders?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: React 18 auto-batches ALL setState calls (even in setTimeout/promises).
  Pre-React-18: only batched inside React event handlers.
  Answer: ONE re-render for the block below in React 18.
*/
function ComponentBatchedUpdates() {
  const [batchCount, setBatchCount] = useState(0);
  const [batchLabel, setBatchLabel] = useState("initial");

  const handleBatchClick = () => {
    setBatchCount((c) => c + 1); // \
    setBatchCount(0); // \

    setBatchLabel("updated"); //  }--> batched: only 1 re-render (React 18)
    setBatchCount((c) => c + 1); // /
    // Total batchCount after click: 2
  };

  return (
    <button onClick={handleBatchClick}>
      {batchLabel}: {batchCount}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Q6. useCallback and referential equality
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: Without useCallback, a new function reference is created every render.
  React.memo on the child won't help because the prop (callback) always changes.
*/
import { useCallback, memo } from "react";

const MemoizedChildButton = memo(function ChildButton({ onAction }) {
  console.log("MemoizedChildButton re-rendered"); // logs every parent render without useCallback
  return <button onClick={onAction}>Action</button>;
});

function ParentWithCallback() {
  const [parentCount, setParentCount] = useState(0);

  // ❌ new reference every render — MemoizedChildButton WILL re-render
  const unstableCallback = () => console.log("action");

  // ✅ stable reference — MemoizedChildButton skips re-render
  const stableCallback = useCallback(() => console.log("action"), []);

  return (
    <div>
      <p>{parentCount}</p>
      <button onClick={() => setParentCount((c) => c + 1)}>
        Increment parent
      </button>
      <MemoizedChildButton onAction={stableCallback} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Q7. useMemo — when does it recompute?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: useMemo is a performance hint, not a guarantee.
  React MAY discard cached values. Don't use it for side effects.
*/
import { useMemo } from "react";

function ComponentExpensiveCalc({ itemList, filterText }) {
  const filteredItems = useMemo(() => {
    console.log("expensive filter running");
    return itemList.filter((item) => item.includes(filterText));
  }, [itemList, filterText]); // recomputes ONLY when these change

  return (
    <ul>
      {filteredItems.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// Q8. forwardRef — passing refs to custom components
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: You cannot pass ref as a regular prop to a function component.
  Must use React.forwardRef, otherwise ref is null.
*/
import { forwardRef } from "react";

const FancyTextInput = forwardRef(function FancyTextInput(props, forwardedRef) {
  return (
    <input
      ref={forwardedRef}
      {...props}
      style={{ border: "2px solid coral" }}
    />
  );
});

function ParentFocusDemo() {
  const inputRef = useRef(null);
  return (
    <div>
      <FancyTextInput
        ref={inputRef}
        placeholder="I can be focused programmatically"
      />
      <button onClick={() => inputRef.current?.focus()}>Focus input</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Q9. useLayoutEffect vs useEffect — timing difference
// ─────────────────────────────────────────────────────────────
/*
  TRICKY:
  useEffect    → fires AFTER paint (async) — use for data fetching, subscriptions
  useLayoutEffect → fires AFTER DOM mutation but BEFORE paint (sync) — use for DOM measurements
  SSR: useLayoutEffect causes a warning on server; useEffect does not.
*/
import { useLayoutEffect } from "react";

function ComponentMeasureBox() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Safe to read layout here — runs before browser paint
    const rect = boxRef.current.getBoundingClientRect();
    console.log("Box width before paint:", rect.width);
  }, []);

  return <div ref={boxRef}>Measure me</div>;
}

// ─────────────────────────────────────────────────────────────
// Q10. Context re-render trap
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: Every consumer re-renders whenever the context VALUE changes.
  If value is a new object on every render (e.g. `value={{ user, logout }}`),
  ALL consumers re-render even if data is the same.
  FIX: memoize the value object.
*/
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

function AuthProviderOptimized({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const authContextValue = useMemo(
    () => ({ authUser, logout: () => setAuthUser(null) }),
    [authUser], // ✅ stable reference unless authUser actually changes
  );

  const authContextValue_ = { authUser, logout: () => setAuthUser(null) };

  // ✅ stable reference unless authUser actually changes
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

function ComponentUsingAuth() {
  const { authUser } = useContext(AuthContext);
  return <p>Logged in as: {authUser?.name ?? "guest"}</p>;
}

// ─────────────────────────────────────────────────────────────
// Q11. What is the output order? (render + commit phases)
// ─────────────────────────────────────────────────────────────
/*
  OUTPUT ORDER:
  "ParentPhase render"
  "ChildPhase render"
  "ChildPhase effect"    ← children effects run first (bottom-up)
  "ParentPhase effect"
*/
function ChildPhaseComponent() {
  useEffect(() => {
    console.log("ChildPhase effect"); //3
  }, []);
  console.log("ChildPhase render"); //2
  return <span>child</span>;
}

function ParentPhaseComponent() {
  useEffect(() => {
    console.log("ParentPhase effect"); //4
  }, []);
  console.log("ParentPhase render"); //1
  return <ChildPhaseComponent />;
}

// ─────────────────────────────────────────────────────────────
// Q12. Controlled vs uncontrolled — why is the value stale?
// ─────────────────────────────────────────────────────────────
/*
  TRICKY: If you set defaultValue but later try to control with value={...},
  React ignores subsequent value changes for uncontrolled inputs.
  Pick one mode: controlled (value + onChange) OR uncontrolled (defaultValue + ref).
*/
function ControlledVsUncontrolled() {
  const [controlledVal, setControlledVal] = useState("hello");
  const uncontrolledRef = useRef(null);

  return (
    <div>
      {/* Controlled: React owns the value */}
      <input
        value={controlledVal}
        onChange={(e) => setControlledVal(e.target.value)}
        placeholder="controlled"
      />
      {/* Uncontrolled: DOM owns the value, read via ref */}
      <input
        defaultValue="world"
        ref={uncontrolledRef}
        placeholder="uncontrolled"
      />
      <button onClick={() => console.log(uncontrolledRef.current.value)}>
        Read uncontrolled
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION 2 — FRONTEND MACHINE CODING QUESTIONS
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// MC1. Debounce from scratch
// ─────────────────────────────────────────────────────────────
function debounceImpl(callbackFn, delayMs) {
  let debounceTimer;
  return function debounced(...argsArr) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callbackFn.apply(this, argsArr);
    }, delayMs);
  };
}

// Usage
const debouncedSearchHandler = debounceImpl((queryStr) => {
  console.log("API call for:", queryStr);
}, 300);
// debouncedSearchHandler("r") → debouncedSearchHandler("re") → debouncedSearchHandler("rea")
// → only fires once after 300ms idle

// ─────────────────────────────────────────────────────────────
// MC2. Throttle from scratch
// ─────────────────────────────────────────────────────────────
function throttleImpl(callbackFn, limitMs) {
  let throttleLastCall = 0;
  return function throttled(...argsArr) {
    const nowTimestamp = Date.now();
    if (nowTimestamp - throttleLastCall >= limitMs) {
      throttleLastCall = nowTimestamp;
      callbackFn.apply(this, argsArr);
    }
  };
}

const throttledScrollHandler = throttleImpl(() => {
  console.log("scroll event handled");
}, 200);

// ─────────────────────────────────────────────────────────────
// MC3. Deep clone without JSON.parse (handles circular refs, functions, dates) Removed
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// MC4. Flatten nested array to any depth
// ─────────────────────────────────────────────────────────────
function flattenArrayDeep(nestedArr, flatDepth = Infinity) {
  if (flatDepth === 0) return nestedArr.slice();
  return nestedArr.reduce((flatAcc, currentItem) => {
    if (Array.isArray(currentItem)) {
      flatAcc.push(...flattenArrayDeep(currentItem, flatDepth - 1));
    } else {
      flatAcc.push(currentItem);
    }
    return flatAcc;
  }, []);
}

console.log(flattenArrayDeep([1, [2, [3, [4]]]])); // [1,2,3,4]
console.log(flattenArrayDeep([1, [2, [3, [4]]]], 1)); // [1,2,[3,[4]]]

// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// MC12. useFetch custom hook
// ─────────────────────────────────────────────────────────────
function useFetchHook(fetchUrl) {
  const [fetchData, setFetchData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMountedFlag = true; // prevents state update after unmount
    setFetchLoading(true);
    setFetchError(null);

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((jsonData) => {
        if (isMountedFlag) {
          setFetchData(jsonData);
          setFetchLoading(false);
        }
      })
      .catch((fetchErr) => {
        if (isMountedFlag) {
          setFetchError(fetchErr.message);
          setFetchLoading(false);
        }
      });

    return () => {
      isMountedFlag = false;
    }; // cleanup
  }, [fetchUrl]);

  return { fetchData, fetchLoading, fetchError };
}

// ════════════════════════════════════════════════════════════
// SECTION 3 — JAVASCRIPT OUTPUT-BASED MCQs
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// JS1. var in a loop — classic closure trap
// ─────────────────────────────────────────────────────────────
for (var loopVarIdx = 0; loopVarIdx < 3; loopVarIdx++) {
  setTimeout(() => console.log("var loop:", loopVarIdx), 0);
}
// OUTPUT: 3, 3, 3  ← loopVarIdx is function-scoped, shared across callbacks

for (let loopLetIdx = 0; loopLetIdx < 3; loopLetIdx++) {
  setTimeout(() => console.log("let loop:", loopLetIdx), 0);
}
// OUTPUT: 0, 1, 2  ← loopLetIdx is block-scoped, new binding each iteration

// ─────────────────────────────────────────────────────────────
// JS2. typeof and type coercion surprises
// ─────────────────────────────────────────────────────────────
console.log(typeof null); // "object"   ← historical JS bug
console.log(typeof undefined); // "undefined"
console.log(typeof NaN); // "number"   ← NaN is technically a number
console.log(typeof function () {}); // "function"
console.log(typeof []); // "object"   ← use Array.isArray() instead
console.log(null == undefined); // true   ← loose equality
console.log(null === undefined); // false  ← strict equality

// ─────────────────────────────────────────────────────────────
// JS3. Prototype chain output
// ─────────────────────────────────────────────────────────────
function AnimalConstructor(animalName) {
  this.animalName = animalName;
}
AnimalConstructor.prototype.speakMethod = function () {
  return `${this.animalName} speaks`;
};

function DogConstructor(dogName) {
  AnimalConstructor.call(this, dogName);
}
DogConstructor.prototype = Object.create(AnimalConstructor.prototype);
DogConstructor.prototype.constructor = DogConstructor;

const myDogInstance = new DogConstructor("Rex");
console.log(myDogInstance.speakMethod()); // "Rex speaks"
console.log(myDogInstance instanceof DogConstructor); // true
console.log(myDogInstance instanceof AnimalConstructor); // true
console.log(myDogInstance.hasOwnProperty("animalName")); // true
console.log(myDogInstance.hasOwnProperty("speakMethod")); // false (on prototype)

// ─────────────────────────────────────────────────────────────
// JS4. Event loop — micro vs macro tasks
// ─────────────────────────────────────────────────────────────
console.log("eventloop: start");

setTimeout(() => console.log("eventloop: setTimeout"), 0); // macrotask

Promise.resolve()
  .then(() => console.log("eventloop: promise 1")) // microtask
  .then(() => console.log("eventloop: promise 2")); // microtask

console.log("eventloop: end");

/*
  OUTPUT ORDER:
  "eventloop: start"
  "eventloop: end"
  "eventloop: promise 1"    ← microtasks drain before macrotasks
  "eventloop: promise 2"
  "eventloop: setTimeout"
*/

// ─────────────────────────────────────────────────────────────
// JS5. this keyword — implicit vs explicit binding
// ─────────────────────────────────────────────────────────────
const objWithMethod = {
  propVal: 42,
  getValMethod() {
    return this.propVal;
  },
  getValArrow: () => {
    return this.propVal; // ← arrow: 'this' is lexical (outer scope, likely undefined/window)
  },
};

console.log(objWithMethod.getValMethod()); // 42 ✅
console.log(objWithMethod.getValArrow()); // undefined (non-strict) or TypeError (strict)

const detachedMethod = objWithMethod.getValMethod;
console.log(detachedMethod()); // undefined — 'this' lost on extraction

// ─────────────────────────────────────────────────────────────
// JS6. Hoisting output question
// ─────────────────────────────────────────────────────────────
console.log(hoistedVar); // undefined (var hoisted, value not yet assigned)
console.log(typeof hoistedLet); // ReferenceError (TDZ) — wrap in try/catch to see
console.log(hoistedFnDecl()); // "hoisted fn" ✅ (fully hoisted)

var hoistedVar = "assigned later";
let hoistedLet = "let value";
function hoistedFnDecl() {
  return "hoisted fn";
}

// ─────────────────────────────────────────────────────────────
// JS7. Equality coercion edge cases
// ─────────────────────────────────────────────────────────────
console.log([] == ![]); // true   ← [] coerces to 0; ![] is false → 0; 0==0
console.log([] == false); // true   ← [] → "" → 0; false → 0
console.log({} == false); // false  ← {} → NaN; NaN != 0
console.log("" == false); // true   ← both coerce to 0
console.log(0 == "0"); // true   ← "0" coerces to 0
console.log(0 == ""); // true   ← "" coerces to 0
console.log("0" == ""); // false  ← both strings, compared directly

// ─────────────────────────────────────────────────────────────
// JS8. Closure counter — what is the output?
// ─────────────────────────────────────────────────────────────
function makeCounterClosure() {
  let closureCount = 0;
  return {
    incrementCounter: () => ++closureCount,
    decrementCounter: () => --closureCount,
    getCount: () => closureCount,
  };
}

const counterA = makeCounterClosure();
const counterB = makeCounterClosure(); // independent closure

counterA.incrementCounter();
counterA.incrementCounter();
counterB.incrementCounter();

console.log(counterA.getCount()); // 2
console.log(counterB.getCount()); // 1 — separate closureCount

// ─────────────────────────────────────────────────────────────
// JS9. Async/await execution order
// ─────────────────────────────────────────────────────────────
async function asyncFnAlpha() {
  console.log("asyncFnAlpha: before await");
  const resolvedVal = await Promise.resolve("alpha result");
  console.log("asyncFnAlpha: after await:", resolvedVal);
  return resolvedVal;
}

console.log("main: before call");
asyncFnAlpha().then((val) => console.log("main: then:", val));
console.log("main: after call");

/*
  OUTPUT:
  "main: before call"
  "asyncFnAlpha: before await"    ← runs synchronously until first await
  "main: after call"              ← resumes synchronous main thread
  "asyncFnAlpha: after await: alpha result"   ← microtask
  "main: then: alpha result"                  ← microtask
*/

// ─────────────────────────────────────────────────────────────
// JS10. Spread, rest, and destructuring edge cases
// ─────────────────────────────────────────────────────────────
const [firstEl, secondEl, ...restElements] = [10, 20, 30, 40, 50];
console.log(firstEl); // 10
console.log(secondEl); // 20
console.log(restElements); // [30, 40, 50]

const { propA, propB: aliasedB, propC = "default" } = { propA: 1, propB: 2 };
console.log(propA); // 1
console.log(aliasedB); // 2 (propB renamed to aliasedB)
console.log(propC); // "default" (propC not in object)

const spreadObjOne = { x: 1, y: 2 };
const spreadObjTwo = { y: 99, z: 3 };
const mergedObj = { ...spreadObjOne, ...spreadObjTwo };
console.log(mergedObj); // { x: 1, y: 99, z: 3 } ← later spread wins

// ─────────────────────────────────────────────────────────────
// JS11. Prototype methods — map/filter/reduce output
// ─────────────────────────────────────────────────────────────
const numericArr = [1, 2, 3, 4, 5];

const mappedSquares = numericArr.map((n) => n ** 2);
const filteredEvens = numericArr.filter((n) => n % 2 === 0);
const reducedSum = numericArr.reduce((sumAcc, n) => sumAcc + n, 0);
const flatMappedArr = [
  [1, 2],
  [3, 4],
].flatMap((subArr) => subArr.map((n) => n * 10));

console.log(mappedSquares); // [1, 4, 9, 16, 25]
console.log(filteredEvens); // [2, 4]
console.log(reducedSum); // 15
console.log(flatMappedArr); // [10, 20, 30, 40]

// ─────────────────────────────────────────────────────────────
// JS12. Tricky: Object.keys vs for...in
// ─────────────────────────────────────────────────────────────
function BaseProtoFn() {}
BaseProtoFn.prototype.inheritedProp = "from prototype";

const derivedObj = new BaseProtoFn();
derivedObj.ownPropA = "own A";
derivedObj.ownPropB = "own B";

console.log(Object.keys(derivedObj)); // ["ownPropA", "ownPropB"] ← own enumerable only

for (const keyName in derivedObj) {
  console.log(keyName); // "ownPropA", "ownPropB", "inheritedProp" ← includes prototype chain
}

for (const keyName in derivedObj) {
  if (Object.prototype.hasOwnProperty.call(derivedObj, keyName)) {
    console.log("own only:", keyName); // "ownPropA", "ownPropB"
  }
}

// ─────────────────────────────────────────────────────────────
// JS13. Tricky: Promise chaining vs async/await error handling
// ─────────────────────────────────────────────────────────────
// QUESTION: What does promiseChainResult log?
const promiseChainResult = Promise.resolve(1)
  .then((chainVal) => {
    throw new Error("chain error");
  })
  .then((chainVal) => chainVal * 2) // skipped — previous threw
  .catch((chainErr) => {
    console.log("caught:", chainErr.message); // "caught: chain error"
    return 42; // catch RETURNS a value — chain continues
  })
  .then((chainVal) => chainVal + 1); // 43 — resumes after catch

promiseChainResult.then((finalVal) => console.log("final:", finalVal)); // "final: 43"

// ─────────────────────────────────────────────────────────────
// JS14. Generator function output
// ─────────────────────────────────────────────────────────────
function* counterGeneratorFn() {
  let genCount = 0;
  while (true) {
    const resetSignal = yield genCount;
    genCount = resetSignal ? 0 : genCount + 1;
  }
}

const genIterator = counterGeneratorFn();
console.log(genIterator.next().value); // 0
console.log(genIterator.next().value); // 1
console.log(genIterator.next().value); // 2
console.log(genIterator.next(true).value); // 0 ← reset via send value
console.log(genIterator.next().value); // 1

// ─────────────────────────────────────────────────────────────
// JS15. Symbol and WeakMap — privacy pattern
// ─────────────────────────────────────────────────────────────
const privateDataMap = new WeakMap();
const secretKeySymbol = Symbol("secretKey");

class BankAccountClass {
  constructor(ownerName, openingBalance) {
    privateDataMap.set(this, {
      ownerName,
      accountBalance: openingBalance,
    });
    this[secretKeySymbol] = "not truly private but symbol-keyed";
  }

  deposit(depositAmount) {
    privateDataMap.get(this).accountBalance += depositAmount;
  }

  getBalance() {
    return privateDataMap.get(this).accountBalance;
  }
}

const myAccount = new BankAccountClass("Bob", 1000);
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500
console.log(myAccount.accountBalance); // undefined ← not on instance

// ════════════════════════════════════════════════════════════
// QUICK REFERENCE CHEAT SHEET
// ════════════════════════════════════════════════════════════
/*
┌─────────────────────────────────────────────────────┐
│  HOISTING                                           │
│  var        → hoisted, initialised as undefined    │
│  let/const  → hoisted, TDZ (ReferenceError)        │
│  function   → fully hoisted (declaration + body)   │
├─────────────────────────────────────────────────────┤
│  EVENT LOOP ORDER                                   │
│  1. Synchronous code                               │
│  2. Microtasks (Promise.then, queueMicrotask)      │
│  3. Macrotasks (setTimeout, setInterval, I/O)      │
├─────────────────────────────────────────────────────┤
│  REACT RENDER TRIGGERS                              │
│  • setState called (even with same value**)        │
│  • Parent re-renders (unless React.memo)           │
│  • Context value changes                           │
│  • ** Object/array: always new reference           │
├─────────────────────────────────────────────────────┤
│  useEffect vs useLayoutEffect                       │
│  useEffect       → after paint (async)             │
│  useLayoutEffect → after DOM, before paint (sync)  │
└─────────────────────────────────────────────────────┘
*/

// ================================
// PROMISE OUTPUT INTERVIEW PRACTICE
// ================================

// --------------------------------
// 1. new Promise stored in a variable
// Output:
// A
// B
// C
// E
// D
// --------------------------------

console.log("A");

const p = new Promise((resolve) => {
  console.log("B");
  resolve();
});

console.log("C");

p.then(() => console.log("D"));

console.log("E");

// --------------------------------
// 2. Variable Promise + .then()
// Output:
// A
// B
// D
// C
// --------------------------------

console.log("A");

const p2 = new Promise((resolve) => {
  console.log("B");
  resolve();
}).then(() => {
  console.log("C");
});

console.log("D");

// --------------------------------
// 3. Function returning a Promise
// Output:
// red
// yellow
// green
// purple
// blue
// --------------------------------

console.log("red");

const buildTask = () =>
  new Promise((resolve) => {
    console.log("green");
    resolve("blue");
  });

console.log("yellow");

buildTask().then((res) => {
  console.log(res);
});

console.log("purple");

// --------------------------------
// 4. Function never called
// Output:
// A
// C
// --------------------------------

console.log("A");

const fn = () =>
  new Promise(() => {
    console.log("B");
  });

console.log("C");

// --------------------------------
// 5. Promise.resolve()
// Output:
// A
// C
// B
// --------------------------------

console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");

// --------------------------------
// 6. Promise.resolve() chain
// Output:
// A
// D
// B
// C
// --------------------------------

console.log("A");

Promise.resolve()
  .then(() => {
    console.log("B");
  })
  .then(() => {
    console.log("C");
  });

console.log("D");

// --------------------------------

const order = new Promise((resolve, reject) => {
  console.log("Espresso"); ////1
  resolve("done");
});

order.then(() => {
  console.log("Latte"); //33
});

console.log("Mocha"); ///2

// --------------------------------

const task = new Promise((resolve, reject) => {
  console.log("Loading");
});

task.then(() => {
  console.log("Complete"); //never runs is resolve is not called
});

console.log("Waiting");

// --------------------------------
// 7. new Promise vs Promise.resolve
// Output:
// A
// B
// E
// C
// D
// --------------------------------

console.log("A");

new Promise((resolve) => {
  console.log("B");
  resolve();
}).then(() => {
  console.log("C");
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");

// --------------------------------

console.log("red");

const buildTask_ = () =>
  new Promise((resolve, reject) => {
    console.log("green");
    resolve("blue");
  });

console.log("yellow");

buildTask_().then((res) => {
  console.log(res);
});

console.log("purple");

// --------------------------------

console.log("alpha");

const job = new Promise((resolve, reject) => {
  console.log("beta");
  resolve(42);
  console.log("gamma");
});

job.then((val) => {
  console.log(val);
});

console.log("delta");
// --------------------------------
// 8. Multiple Promise executors
// Output:
// A
// B
// C
// D
// --------------------------------

console.log("A");

new Promise((resolve) => {
  console.log("B");
  resolve();
});

new Promise((resolve) => {
  console.log("C");
  resolve();
});

console.log("D");

// --------------------------------
// 9. Nested Promise
// Output:
// A
// D
// B
// C
// --------------------------------

console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
});

console.log("D");

// --------------------------------
// 10. Promise inside Promise executor
// Output:
// A
// B
// E
// C
// D
// --------------------------------

console.log("A");

new Promise((resolve) => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

  resolve();
}).then(() => {
  console.log("D");
});

console.log("E");

// ======================================
// QUICK CHEAT SHEET
// ======================================

/*
1. Promise executor runs immediately

new Promise(() => {
  console.log('runs now');
});

2. .then() always runs later (microtask)

Promise.resolve().then(() => {
  console.log('runs later');
});

3. Function returning Promise does nothing
   until function is called

const fn = () =>
  new Promise(() => {
    console.log('inside');
  });

fn(); // now it runs

4. Execution order

Synchronous code
    ↓
Promise microtasks (.then, await)
    ↓
setTimeout / setInterval
*/
