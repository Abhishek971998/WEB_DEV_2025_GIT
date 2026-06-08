// String concatenation wins over addition
console.log("5" + 3); // '53' (string)
console.log(5 + "3"); // '53' (string)

// But other operators coerce to numbers
console.log("5" - 3); // 2 (number)
console.log("5" * "3"); // 15 (number)

// Objects get weird
console.log([] + []); // '' (empty string)
console.log([] + {}); // '[object Object]'
console.log({} + []); // 0 or '[object Object]' depending on context

// The infamous examples
console.log("b" + "a" + +"a" + "a"); // 'baNaNa'

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.7); // 0.7999999999999999

function demo() {
  console.log(arguments.length); // Works!
  console.log(arguments[0]); // Works!
  console.log(Array.isArray(arguments)); // false
  arguments.map((x) => x); // TypeError: arguments.map is not a function
}

// Same story with DOM queries
const divs = document.querySelectorAll("div");
divs.forEach((d) => {}); // This works (NodeList has forEach)
divs.map((d) => {}); // TypeError (NodeList lacks map)

const items = ["apple", "banana", "cherry", "date"];

// Truncation: permanently deletes elements
items.length = 2;
console.log(items); // ['apple', 'banana'] - cherry and date are gone forever

// Expansion: creates "holes" (sparse array)
items.length = 5;
console.log(items); // ['apple', 'banana', <3 empty slots>]

// Problem:Always return promises inside .then()
doTask()
  .then(() => {
    asyncCleanup(); // ❌ not returned, rejection escapes chain
  })
  .catch(console.error); // won't catch asyncCleanup errors

//fix

doTask()
  .then(() => {
    return asyncCleanup();
  })
  .catch(console.error);
