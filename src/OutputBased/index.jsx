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
