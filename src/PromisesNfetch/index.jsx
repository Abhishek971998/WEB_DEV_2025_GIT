// 🟢 Basic Promise

// API Used:
// https://dummyjson.com/test

// ----------------------------------------------------
// 1. Basic .then() Chain
// ----------------------------------------------------

fetch("https://dummyjson.com/test")
  .then((res) => res.json())
  .then((data) => console.log(data));

// ----------------------------------------------------
// 2. .then() With Explicit Return
// ----------------------------------------------------

fetch("https://dummyjson.com/test")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });

// ----------------------------------------------------
// 3. .then() Logging Inside Callback
// ----------------------------------------------------

fetch("https://dummyjson.com/test")
  .then((res) => res.json())
  .then((data) => {
    console.log("Result:", data);
  });

// ----------------------------------------------------
// 4. Using async/await
// ----------------------------------------------------

async function getData() {
  const res = await fetch("https://dummyjson.com/test");
  const data = await res.json();
  console.log(data);
}

getData();

// ----------------------------------------------------
// 5. Async Arrow Function
// ----------------------------------------------------

const getData = async () => {
  const res = await fetch("https://dummyjson.com/test");
  const data = await res.json();
  console.log(data);
};

getData();

// ----------------------------------------------------
// 6. Async IIFE (Immediately Invoked Function)
// ----------------------------------------------------

(async () => {
  const res = await fetch("https://dummyjson.com/test");
  const data = await res.json();
  console.log(data);
})();

// ----------------------------------------------------

// ----------------------------------------------------
// 10. Top-Level Await (Modern Environments)
// ----------------------------------------------------

// 11. Mixed await with .then()
// ----------------------------------------------------

const data = await fetch("https://dummyjson.com/test").then((res) =>
  res.json(),
);

console.log(data);

// ----------------------------------------------------
// 12. Passing console.log Directly
// ----------------------------------------------------

fetch("https://dummyjson.com/test")
  .then((res) => res.json())
  .then(console.log);

// ====================================================
// CORE FETCH FLOW
// ====================================================

// fetch() -> returns Promise<Response>

// Response -> res.json()

// res.json() -> returns Promise<Data>

// Data -> console.log(data)

// ====================================================
// BEST PRACTICE (MOST COMMON IN REAL PROJECTS)
// ====================================================

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/test");

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

// ====================================================
// END
// ====================================================

const basicPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Promise resolved successfully!");
  } else {
    reject("Promise rejected.");
  }
});

basicPromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// 🟡 Promise with setTimeout
const delayedPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Resolved after 2 seconds"), 2000);
});

delayedPromise.then((result) => console.log(result));

// 🔵 Chaining Promises
const chainedPromise = new Promise((resolve) => resolve(5));

chainedPromise
  .then((num) => num * 2)
  .then((num) => num + 10)
  .then((num) => console.log("Chained Result:", num))
  .catch((error) => console.log(error));

// 🔴 Promise.all
const promise1 = Promise.resolve("Promise 1 done");
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 2 done"), 1000),
);
const promise3 = Promise.reject("Promise 3 failed");

Promise.all([promise1, promise2]).then((values) => console.log(values));

// 🟣 Promise.allSettled
Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  console.log("All Settled:", results),
);

// 🟠 Promise.race
Promise.race([promise1, promise2]).then((result) =>
  console.log("Race Result:", result),
);

// 🟢 Async/Await with Error Handling
const asyncFunction = async () => {
  try {
    let result = await delayedPromise;
    console.log("Async/Await Result:", result);
  } catch (error) {
    console.log("Error:", error);
  }
};

asyncFunction();

// 🟡 Fetch Example (Mock API)
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if (success) {
        resolve({ data: "Mock API Data" });
      } else {
        reject("API request failed");
      }
    }, 1500);
  });
};

fetchData()
  .then((response) => console.log("API Response:", response))
  .catch((error) => console.log("API Error:", error));

/**************************************************************
 JAVASCRIPT PROMISE COMPLETE SYNTAX EXAMPLES
**************************************************************/

console.log("------ Promise Examples Start ------");

/**************************************************************
1. Creating a Basic Promise
**************************************************************/
const basicPromise_ = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Promise resolved successfully");
  } else {
    reject("Promise rejected");
  }
});

basicPromise
  .then((result) => console.log("1:", result))
  .catch((error) => console.log("1 Error:", error));

/**************************************************************
2. Promise with setTimeout (Async simulation)
**************************************************************/
const delayedPromise_ = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved after 1 second");
  }, 1000);
});

delayedPromise.then((data) => console.log("2:", data));

/**************************************************************
3. Promise Chaining
**************************************************************/
new Promise((resolve) => {
  resolve(2);
})
  .then((num) => {
    console.log("3 Step1:", num);
    return num * 2;
  })
  .then((num) => {
    console.log("3 Step2:", num);
    return num * 3;
  })
  .then((num) => {
    console.log("3 Step3:", num);
  });

/**************************************************************
4. Returning a Promise inside then()
**************************************************************/
function multiplyAsync(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 500);
  });
}

multiplyAsync(5)
  .then((result) => multiplyAsync(result))
  .then((result) => console.log("4:", result));

/**************************************************************
5. Catch Error Handling
**************************************************************/
new Promise((resolve, reject) => {
  reject("Something went wrong");
})
  .then((res) => console.log(res))
  .catch((err) => console.log("5 Error:", err));

/**************************************************************
6. finally()
**************************************************************/
new Promise((resolve, reject) => {
  resolve("Success with finally");
})
  .then((data) => console.log("6:", data))
  .catch((err) => console.log(err))
  .finally(() => console.log("6: Finally executed"));

/**************************************************************
7. Promise.resolve()
**************************************************************/
Promise.resolve("Instant resolved value").then((data) =>
  console.log("7:", data),
);

/**************************************************************
8. Promise.reject()
**************************************************************/
Promise.reject("Instant rejection").catch((err) =>
  console.log("8 Error:", err),
);

/**************************************************************
9. Promise.all()
Waits for all promises
**************************************************************/
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).then((results) =>
  console.log("9 Promise.all:", results),
);

/**************************************************************
10. Promise.allSettled()
Returns result of all promises
**************************************************************/
const s1 = Promise.resolve("Success");
const s2 = Promise.reject("Failure");

Promise.allSettled([s1, s2]).then((results) =>
  console.log("10 Promise.allSettled:", results),
);

/**************************************************************
11. Promise.race()
Returns first settled promise
**************************************************************/
const r1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
const r2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 2000));

Promise.race([r1, r2]).then((result) =>
  console.log("11 Promise.race:", result),
);

/**************************************************************
12. Promise.any()
Returns first fulfilled promise
**************************************************************/
const a1 = Promise.reject("Error1");
const a2 = Promise.resolve("Success2");
const a3 = Promise.resolve("Success3");

Promise.any([a1, a2, a3])
  .then((result) => console.log("12 Promise.any:", result))
  .catch((err) => console.log(err));

/**************************************************************
13. Async/Await (Promise syntax sugar)
**************************************************************/
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
}

async function runAsyncExample() {
  const result = await fetchData();
  console.log("13 Async/Await:", result);
}

runAsyncExample();

/**************************************************************
14. Async/Await with try/catch
**************************************************************/
async function errorExample() {
  try {
    const result = await Promise.reject("Async error");
    console.log(result);
  } catch (error) {
    console.log("14 Async Error:", error);
  }
}

errorExample();

/**************************************************************
15. Sequential Async Operations
**************************************************************/
async function sequential() {
  const a = await multiplyAsync(2);
  const b = await multiplyAsync(a);
  const c = await multiplyAsync(b);

  console.log("15 Sequential:", c);
}

sequential();

/**************************************************************
16. Parallel Async Operations
**************************************************************/
async function parallel() {
  const results = await Promise.all([
    multiplyAsync(2),
    multiplyAsync(3),
    multiplyAsync(4),
  ]);

  console.log("16 Parallel:", results);
}

parallel();

/**************************************************************
17. Converting Callback to Promise
**************************************************************/
function callbackStyle(value, callback) {
  setTimeout(() => {
    callback(null, value * 2);
  }, 500);
}

function promisified(value) {
  return new Promise((resolve, reject) => {
    callbackStyle(value, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

promisified(5).then((result) => console.log("17 Promisified:", result));

/**************************************************************
18. Nested Promises (Anti-pattern example)
**************************************************************/
new Promise((resolve) => {
  resolve(5);
})
  .then((result) => {
    return new Promise((resolve) => {
      resolve(result * 10);
    });
  })
  .then((result) => console.log("18 Nested result:", result));

console.log("------ Promise Examples End ------");
