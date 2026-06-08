// 1. Default Export (export default)
// Each module can have only one default export.

// It is imported without curly braces {}.

// You can name the import anything.

// 2. Named Export (export)
// You can have multiple named exports in a module.

// Must be imported with curly braces {}.

// The import name must match the export name.

let a = 100;
let b = new Number(100);

console.log(a == b); //true
console.log(a === b); // false
// ==========================================================

console.log("hekkkki ");

function showModal() {
  console.log(showModal.timeout, "one");
}

showModal(); // undefined
showModal.timeout = 200;
showModal(); // 200
// ==========================================================

let numbers = [1, 2];
numbers[10] = 44;

console.log(numbers); //[1, 2, 44]  and lenght will 11
// =========================================================

// value	{...x} object

// null --> {}
// undefined --> {}
// true --> {}
// false --> {}
// "hello" --> {0:"h",1:"e",...}
// [1, 2, 3] --> {0:1, 1:2, 2:3}
// {a: 1} --> {a: 1}

// value [...x] (Array)

// null --> TypeError
// undefined --> TypeError
// 42 --> TypeError
// true --> TypeError
// "hello" --> ["h","e","l","l","o"]
// [1, 2, 3] --> [1, 2, 3]
// {a: 1} --> TypeError

// const allUsers = [...x(), ...x()];
// const allUsers = {...x(), ...x()};

// ❌ Will crash if getItems() returns null/undefined:
const all = [...getItems(), ...getMore()];

// ✅ Safe:
const all_safe = [...(getItems() ?? []), ...(getMore() ?? [])];
