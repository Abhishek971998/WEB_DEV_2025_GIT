function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the minimum is the first element
    let minIndex = i;

    // Check the rest of the array for a smaller element
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap if a smaller element was found
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    // let temp = arr[i];
    // arr[i] = arr[minIndex];
    // arr[minIndex] = temp;
  }

  return arr;
}

// Example
const numbers = [64, 25, 12, 22, 11];
console.log(selectionSort(numbers)); // Output: [11, 12, 22, 25, 64]

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
  if (arr.length <= 1) return arr; // Base case

  const mid = Math.floor(arr.length / 2); // Find middle
  const left = mergeSort(arr.slice(0, mid)); // Sort left half
  const right = mergeSort(arr.slice(mid)); // Sort right half

  return merge(left, right); // Merge sorted halves
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  // Compare elements from both halves and push smaller one
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements from left or right
  return result.concat(left.slice(i)).concat(right.slice(j));
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
