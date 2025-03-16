function memoize(fn) {
  const cache = {};

  return function (x) {
    if (x in cache) {
      return cache[x];
    }

    const result = fn(x);
    cache[x] = result;
    return result;
  };
}

// Example 1: Numbers
function double(n) {
  console.log(`Calculating double of ${n}`);
  return n * 2;
}

const memoizedDouble = memoize(double);
console.log(memoizedDouble(5)); // Logs: "Calculating double of 5", then 10
console.log(memoizedDouble(5)); // Just logs: 10 (from cache)
console.log(memoizedDouble(7)); // Logs: "Calculating double of 7", then 14

// Example 2: Strings
function capitalize(str) {
  console.log(`Capitalizing ${str}`);
  return str.toUpperCase();
}

const memoizedCapitalize = memoize(capitalize);
console.log(memoizedCapitalize("hello")); // Logs: "Capitalizing hello", then "HELLO"
console.log(memoizedCapitalize("hello")); // Just logs: "HELLO" (from cache)
console.log(memoizedCapitalize("world")); // Logs: "Capitalizing world", then "WORLD"

// Example 3: Booleans
function negate(bool) {
  console.log(`Negating ${bool}`);
  return !bool;
}

const memoizedNegate = memoize(negate);
console.log(memoizedNegate(true)); // Logs: "Negating true", then false
console.log(memoizedNegate(true)); // Just logs: false (from cache)
console.log(memoizedNegate(false)); // Logs: "Negating false", then true

// Example 4: Special cases - undefined and null
function processValue(value) {
  console.log(`Processing ${value}`);
  return `Processed: ${value}`;
}

const memoizedProcess = memoize(processValue);
console.log(memoizedProcess(undefined)); // Logs: "Processing undefined", then "Processed: undefined"
console.log(memoizedProcess(undefined)); // Just logs: "Processed: undefined" (from cache)
console.log(memoizedProcess(null)); // Logs: "Processing null", then "Processed: null"
