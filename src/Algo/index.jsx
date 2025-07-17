// ✅ 1. Selection Sort
let selectionArr = [5, 2, 8, 1, 3];

for (let i = 0; i < selectionArr.length; i++) {
  for (let j = i + 1; j < selectionArr.length; j++) {
    if (selectionArr[i] > selectionArr[j]) {
      let temp = selectionArr[i];
      selectionArr[i] = selectionArr[j];
      selectionArr[j] = temp;
    }
  }
}

console.log("Selection Sort:", selectionArr); // [1, 2, 3, 5, 8]

// 🔁 2. Bubble Sort
let bubbleArr = [5, 2, 8, 1, 3];

for (let i = 0; i < bubbleArr.length - 1; i++) {
  for (let j = 0; j < bubbleArr.length - 1 - i; j++) {
    if (bubbleArr[j] > bubbleArr[j + 1]) {
      let temp = bubbleArr[j];
      bubbleArr[j] = bubbleArr[j + 1];
      bubbleArr[j + 1] = temp;
    }
  }
}

console.log("Bubble Sort:", bubbleArr); // [1, 2, 3, 5, 8]

// ⚡ 3. Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];
  let left = [];
  let right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

let quickArr = [5, 2, 8, 1, 3];
console.log("Quick Sort:", quickSort(quickArr)); // [1, 2, 3, 5, 8]

// 🧠 4. Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [],
    i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

let mergeArr = [5, 2, 8, 1, 3];
console.log("Merge Sort:", mergeSort(mergeArr)); // [1, 2, 3, 5, 8]

export default function Algo() {
  return (
    <>
      <h2>Sorting Algorithms</h2>
      <p>
        Check the console for output of selection sort, bubble sort, quick sort,
        and merge sort.
      </p>
    </>
  );
}
