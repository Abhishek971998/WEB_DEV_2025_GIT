// 🟢 Basic Promise
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
  setTimeout(() => resolve("Promise 2 done"), 1000)
);
const promise3 = Promise.reject("Promise 3 failed");

Promise.all([promise1, promise2]).then((values) => console.log(values));

// 🟣 Promise.allSettled
Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  console.log("All Settled:", results)
);

// 🟠 Promise.race
Promise.race([promise1, promise2]).then((result) =>
  console.log("Race Result:", result)
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
