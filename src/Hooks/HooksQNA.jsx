/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

export default function HooksFAQ() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const intervalRef = useRef();
  const isMounted = useRef(true);

  // 1. Why does useEffect run twice on initial render in development?
  useEffect(() => {
    console.log("useEffect - Runs twice in development due to StrictMode");
  }, []);

  // 2. What’s the difference between useEffect(() => {}, []) and useEffect(() => {}, [state]) if state never changes?
  useEffect(() => {
    console.log("Effect with [count]");
  }, [count]);

  // 3. Why might a component using React.memo still re-render?
  //   Because props are compared using shallow equality. If a prop is a new object or
  //   function (e.g., {} or () => {}), the reference changes every render, so React.memo triggers a re-render
  const handleClick = () => console.log("Clicked");
  const memoizedClick = useCallback(() => console.log("Memoized Click"), []);

  // 4. Can useState updates be batched outside of event handlers?
  const triggerAsyncUpdate = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setText((t) => t + "!");
    }, 100);
  };

  // 5. What happens if you call a hook inside a conditional or a loop?
  // if (count > 0) useEffect(() => {}) ❌ Don't do this

  // 6. How does useCallback help with React.memo and when does it become useless overhead?
  const noisyFn = useCallback(() => console.log("Expensive fn"), []);

  // 7. What is the difference between useRef and useState when storing a mutable value?
  const refVal = useRef(0);
  const stateVal = useState(0);

  // 8. Why is using setInterval inside useEffect tricky?
  useEffect(() => {
    // intervalRef.current = setInterval(() => {
    //   setCount((c) => c + 1);
    // }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // 9. How can stale closures affect your useEffect or setTimeout calls?
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Latest count:", count);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [count]);

  // 10. Why might passing a function prop like onClick={() => doSomething()} break memoization?
  const inlineClick = () => console.log("inline");

  // 11. When does a component re-render even if state/props haven’t changed?
  const noop = () => {};

  // 12. Why doesn't useEffect fire when a deeply nested object inside state changes?
  const [user, setUser] = useState({ profile: { name: "Alice" } });
  const [lastName, setLastname] = useState("Hello");

  useEffect(() => {
    console.log("Effect lastName");
  }, [lastName]);

  useEffect(() => {
    console.log("Effect ran due to user change");
  }, [user.profile.name]);

  //problem
  const updateName = () => {
    // Just modifying nested object, reference doesn't change
    user.profile.name = "Bob";

    setLastname("Hello");
    setUser(user); // still same reference
  };

  //Solution
  const updateName_ = () => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        name: "Bob",
      },
    };
    setUser(updatedUser); // new object reference
  };

  // 13. What’s the actual difference between useEffect and useLayoutEffect in terms of timing?
  // useLayoutEffect runs before paint; useEffect after paint

  // 14. How would you persist state across component unmounts without using Redux or context?
  const [persisted, setPersisted] = useState(() => {
    return localStorage.getItem("persisted") || "";
  });
  useEffect(() => {
    localStorage.setItem("persisted", persisted);
  }, [persisted]);

  // 15. Can a useEffect cleanup function run after every render?
  useEffect(() => {
    console.log("Effect with cleanup");
    return () => console.log("Cleanup");
  }, [text]);

  // 16. What’s the best way to debounce a value using hooks?
  const debouncedText = useDebounce(text, 500);

  // 17. Why is using index as key in a list sometimes dangerous?
  const items = ["a", "b", "c"];

  // 18. What are the risks of using derived state in React?
  const derived = useMemo(() => text.toUpperCase(), [text]);

  // 19. How do you detect if a component is still mounted before calling setState in an async operation?
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    const data = await new Promise((r) => setTimeout(() => r("result"), 1000));
    if (isMounted.current) {
      setText(data);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Hooks FAQ - Examples</h1>

      <div className="mb-4">
        <button onClick={() => setCount((c) => c + 1)} className="btn">
          Increment Count ({count})
        </button>
        <button onClick={triggerAsyncUpdate} className="ml-2 btn">
          Async Update
        </button>
      </div>

      <div className="mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type..."
          className="input"
        />
        <p className="mt-2 text-gray-600">Debounced: {debouncedText}</p>
        <p>Derived: {derived}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">List with index as key:</p>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div className="mb-4">
        <button onClick={fetchData} className="btn">
          Fetch Data
        </button>
        <p className="mt-2">Fetched: {text}</p>
      </div>
      <div className="mb-4">
        <button onClick={updateName}>
          Update Nested Value {user.profile.name}
        </button>
        {/* <button onClick={updateNestedValue} className="btn">
          Update Nested Value ({objState.nested.value})
        </button> */}
      </div>
    </div>
  );
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
