import React from "react";

const EventLoopFlashcard = () => {
  let topics = [
    {
      title: "JavaScript Event Loop",
    },
    {
      title: "Closures",
    },
    {
      title: "Promises & Async/Await",
    },
    {
      title: "Prototypes & Inheritance",
    },
  ];
  return (
    <>
      <ul className="flex flex-wrap gap-2 justify-center">
        {topics.map((topic, index) => (
          <li
            key={topic.title}
            className="bg-sky-50 px-2 py-1 rounded-md cursor-pointer"
          >
            <span className="text-sky-600">
              <span className="text-1xl">{index + 1} </span>
              {" " + topic.title}
            </span>
          </li>
        ))}
      </ul>
      <div className="min-h-screen bg-gray-100 py-2 px-4">
        <div className="max-w-8xl mx-auto space-y-8">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Loop Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-1xl">🌀</span>
                  JavaScript Event Loop
                </h1>
              </div>

              <div className="p-6 space-y-6">
                <section
                  className="bg-sky-50 rounded-xl p-5 border border-sky-100"
                  style={{ height: "25%" }}
                >
                  <h2 className="text-xl font-semibold text-sky-700 mb-3">
                    Basic Answer
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      JavaScript is single-threaded and uses a{" "}
                      <strong className="text-sky-600">call stack</strong> to
                      execute synchronous code. The{" "}
                      <strong className="text-sky-600">Event Loop</strong>{" "}
                      enables JavaScript to handle{" "}
                      <strong className="text-sky-600">
                        asynchronous tasks
                      </strong>{" "}
                      (like setTimeout, fetch, or promises) efficiently.
                    </p>
                    <p>
                      When an async task finishes, its callback is moved to a{" "}
                      <strong className="text-sky-600">queue</strong>. The Event
                      Loop checks if the{" "}
                      <strong className="text-sky-600">
                        call stack is empty
                      </strong>
                      . If it is, it moves the task from the queue to the stack
                      and runs it.
                    </p>
                  </div>
                </section>

                <section className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h2 className="text-xl font-semibold text-sky-700 mb-3">
                    Deeper Insight
                  </h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-semibold">
                        Call Stack:
                      </span>
                      Runs synchronous code.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-semibold">
                        Web APIs:
                      </span>
                      Handle async operations (like timers, fetch).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-semibold">
                        Callback Queue:
                      </span>
                      Stores macrotasks (e.g., setTimeout).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-semibold">
                        Microtask Queue:
                      </span>
                      Stores microtasks (e.g., Promises).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-semibold">
                        Priority:
                      </span>
                      Microtasks run <em>before</em> the next macrotask.
                    </li>
                  </ul>
                </section>

                <section
                  className="bg-sky-50 rounded-xl p-5 border border-sky-100"
                  style={{ height: "15%" }}
                >
                  <h2 className="text-xl font-semibold text-sky-700 mb-3">
                    One-Liner Summary
                  </h2>
                  <p className="text-gray-700 italic">
                    The Event Loop is a smart mechanism that lets JavaScript
                    handle async tasks without blocking the main thread.
                  </p>
                </section>

                <section
                  className="bg-sky-50 rounded-xl p-5 border border-sky-100"
                  style={{ height: "40%", overflow: "scroll" }}
                >
                  <h2 className="text-xl font-semibold text-sky-700 mb-3">
                    Simple Example
                  </h2>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');

// Output: A, C, B`}
                  </pre>
                  <p className="mt-3 text-gray-700">
                    Even with 0ms delay,{" "}
                    <code className="bg-gray-100 px-1 rounded">B</code> runs
                    last because it waits in the queue until the call stack is
                    clear.
                  </p>
                </section>
              </div>
            </div>

            {/* Closures Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-1xl">🔒</span>
                  Closures
                </h1>
              </div>

              <div className="p-6 space-y-6">
                <section
                  className="bg-purple-50 rounded-xl p-5 border border-purple-100"
                  style={{ height: "25%" }}
                >
                  <h2 className="text-xl font-semibold text-purple-700 mb-3">
                    Basic Answer
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      A <strong className="text-purple-600">closure</strong> is
                      a function that has access to variables from its outer
                      (enclosing) lexical scope, even after the outer function
                      has returned. This is possible because the inner function
                      maintains a reference to its outer scope.
                    </p>
                  </div>
                </section>

                <section className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                  <h2 className="text-xl font-semibold text-purple-700 mb-3">
                    Deeper Insight
                  </h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-semibold">
                        Lexical Scope:
                      </span>
                      Functions remember where they were created
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-semibold">
                        Data Privacy:
                      </span>
                      Closures enable private variables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-semibold">
                        Module Pattern:
                      </span>
                      Common use case for closures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-semibold">
                        Memory Management:
                      </span>
                      Closures can lead to memory leaks if not handled properly
                    </li>
                  </ul>
                </section>

                <section
                  className="bg-purple-50 rounded-xl p-5 border border-purple-100"
                  style={{ height: "15%" }}
                >
                  <h2 className="text-xl font-semibold text-purple-700 mb-3">
                    One-Liner Summary
                  </h2>
                  <p className="text-gray-700 italic">
                    Closures are functions that remember and can access
                    variables from their outer scope, even after the outer
                    function has returned.
                  </p>
                </section>

                <section
                  className="bg-purple-50 rounded-xl p-5 border border-purple-100"
                  style={{ height: "40%", overflow: "scroll" }}
                >
                  <h2 className="text-xl font-semibold text-purple-700 mb-3">
                    Simple Example
                  </h2>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`}
                  </pre>
                  <p className="mt-3 text-gray-700">
                    The inner function maintains access to the{" "}
                    <code className="bg-gray-100 px-1 rounded">count</code>{" "}
                    variable even after{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      createCounter
                    </code>{" "}
                    has finished executing.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Promises Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-1xl">⚡</span>
                  Promises & Async/Await
                </h1>
              </div>

              <div className="p-6 space-y-6">
                <section
                  className="bg-emerald-50 rounded-xl p-5 border border-emerald-100"
                  style={{ height: "25%" }}
                >
                  <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                    Basic Answer
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong className="text-emerald-600">Promises</strong> are
                      objects representing the eventual completion or failure of
                      an asynchronous operation.{" "}
                      <strong className="text-emerald-600">Async/Await</strong>{" "}
                      is syntactic sugar built on top of Promises that makes
                      asynchronous code look and behave more like synchronous
                      code.
                    </p>
                  </div>
                </section>

                <section className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                    Deeper Insight
                  </h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold">
                        Promise States:
                      </span>
                      pending, fulfilled, rejected
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold">
                        Promise Methods:
                      </span>
                      then(), catch(), finally()
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold">
                        Async Functions:
                      </span>
                      Always return a Promise
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold">
                        Error Handling:
                      </span>
                      try/catch with async/await
                    </li>
                  </ul>
                </section>

                <section
                  className="bg-emerald-50 rounded-xl p-5 border border-emerald-100"
                  style={{ height: "15%" }}
                >
                  <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                    One-Liner Summary
                  </h2>
                  <p className="text-gray-700 italic">
                    Promises and Async/Await provide elegant ways to handle
                    asynchronous operations, making code more readable and
                    maintainable.
                  </p>
                </section>

                <section
                  className="bg-emerald-50 rounded-xl p-5 border border-emerald-100"
                  style={{ height: "40%", overflow: "scroll" }}
                >
                  <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                    Simple Example
                  </h2>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`// Promise example
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched!');
    }, 1000);
  });
};

// Async/Await example
async function getData() {
  try {
    const result = await fetchData();
    console.log(result); // "Data fetched!"
  } catch (error) {
    console.error(error);
  }
}`}
                  </pre>
                  <p className="mt-3 text-gray-700">
                    The async/await syntax makes asynchronous code look
                    synchronous while maintaining the benefits of Promises.
                  </p>
                </section>
              </div>
            </div>

            {/* Prototypes Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-1xl">🔗</span>
                  Prototypes & Inheritance
                </h1>
              </div>

              <div className="p-6 space-y-6">
                <section
                  className="bg-amber-50 rounded-xl p-5 border border-amber-100"
                  style={{ height: "25%" }}
                >
                  <h2 className="text-xl font-semibold text-amber-700 mb-3">
                    Basic Answer
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      JavaScript uses{" "}
                      <strong className="text-amber-600">
                        prototypal inheritance
                      </strong>
                      , where objects can inherit properties and methods from
                      other objects. Every object has a{" "}
                      <strong className="text-amber-600">prototype</strong> from
                      which it inherits properties.
                    </p>
                  </div>
                </section>

                <section className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                  <h2 className="text-xl font-semibold text-amber-700 mb-3">
                    Deeper Insight
                  </h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">
                        Prototype Chain:
                      </span>
                      Object → Object.prototype → null
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">
                        Constructor Functions:
                      </span>
                      Create objects with shared prototype
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">
                        Class Syntax:
                      </span>
                      Syntactic sugar over prototypes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">
                        Object.create():
                      </span>
                      Creates new object with specified prototype
                    </li>
                  </ul>
                </section>

                <section
                  className="bg-amber-50 rounded-xl p-5 border border-amber-100 "
                  style={{ height: "15%" }}
                >
                  <h2 className="text-xl font-semibold text-amber-700 mb-3">
                    One-Liner Summary
                  </h2>
                  <p className="text-gray-700 italic">
                    Prototypal inheritance is JavaScript's way of sharing
                    properties and methods between objects, forming the
                    foundation of object-oriented programming in JavaScript.
                  </p>
                </section>

                <section
                  className="bg-amber-50 rounded-xl p-5 border border-amber-100"
                  style={{ height: "40%", overflow: "scroll" }}
                >
                  <h2 className="text-xl font-semibold text-amber-700 mb-3">
                    Simple Example
                  </h2>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`// Constructor function
function Animal(name) {
  this.name = name;
}

// Adding method to prototype
Animal.prototype.speak = function() {
  return this.name + " makes a sound.";
};

// Creating instances
const dog = new Animal('Dog');
console.log(dog.speak()); // "Dog makes a sound."

// Modern class syntax (syntactic sugar)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return this.name + " makes a sound.";
  }
}`}
                  </pre>
                  <p className="mt-3 text-gray-700">
                    Both approaches achieve the same result, but the class
                    syntax provides a more familiar object-oriented programming
                    style.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventLoopFlashcard;
