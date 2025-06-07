import React from "react";

const EventLoopFlashcard = () => {
  return (
    <div className="bg-sky-50 text-gray-800 p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-sky-600">
        🌀 JavaScript Event Loop - Interview Flashcard
      </h1>

      <section className="border-l-4 border-sky-600 bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Basic Answer</h2>
        <p>
          JavaScript is single-threaded and uses a <strong>call stack</strong>{" "}
          to execute synchronous code. The <strong>Event Loop</strong> enables
          JavaScript to handle <strong>asynchronous tasks</strong> (like
          setTimeout, fetch, or promises) efficiently.
        </p>
        <p>
          When an async task finishes, its callback is moved to a{" "}
          <strong>queue</strong>. The Event Loop checks if the{" "}
          <strong>call stack is empty</strong>. If it is, it moves the task from
          the queue to the stack and runs it.
        </p>
      </section>

      <section className="border-l-4 border-sky-600 bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Simple Example</h2>
        <pre className="bg-gray-900 text-green-300 p-4 rounded-md overflow-x-auto">
          {`console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');

// Output: A, C, B`}
        </pre>
        <p>
          Even with 0ms delay, <code>B</code> runs last because it waits in the
          queue until the call stack is clear.
        </p>
      </section>

      <section className="border-l-4 border-sky-600 bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Deeper Insight</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Call Stack</strong>: Runs synchronous code.
          </li>
          <li>
            <strong>Web APIs</strong>: Handle async operations (like timers,
            fetch).
          </li>
          <li>
            <strong>Callback Queue</strong>: Stores macrotasks (e.g.,
            setTimeout).
          </li>
          <li>
            <strong>Microtask Queue</strong>: Stores microtasks (e.g.,
            Promises).
          </li>
          <li>
            <strong>Priority:</strong> Microtasks run <em>before</em> the next
            macrotask.
          </li>
        </ul>
      </section>

      <section className="border-l-4 border-sky-600 bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">One-Liner Summary</h2>
        <p>
          <strong>
            The Event Loop is a smart mechanism that lets JavaScript handle
            async tasks without blocking the main thread.
          </strong>
        </p>
      </section>
    </div>
  );
};

export default EventLoopFlashcard;
