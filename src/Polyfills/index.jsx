import React from "react";

function Polyfills() {
  const arr = [1, 2, 3, 4];

  // ---------------- forEach ----------------
  if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (cb) {
      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          cb(this[i], i, this);
        }
      }
    };
  }

  // ---------------- map ----------------
  if (!Array.prototype.myMap) {
    Array.prototype.myMap = function (cb) {
      const result = [];

      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          result.push(cb(this[i], i, this));
        }
      }

      return result;
    };
  }

  // ---------------- filter ----------------
  if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function (cb) {
      const result = [];

      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          if (cb(this[i], i, this)) {
            result.push(this[i]);
          }
        }
      }

      return result;
    };
  }

  // ---------------- find ----------------
  if (!Array.prototype.myFind) {
    Array.prototype.myFind = function (cb) {
      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          if (cb(this[i], i, this)) {
            return this[i];
          }
        }
      }
      return undefined;
    };
  }

  // ---------------- reduce ----------------
  if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function (cb, initialValue) {
      if (this.length === 0 && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
      }

      let acc = initialValue;
      let startIndex = 0;

      if (acc === undefined) {
        acc = this[0];
        startIndex = 1;
      }

      for (let i = startIndex; i < this.length; i++) {
        if (i in this) {
          acc = cb(acc, this[i], i, this);
        }
      }

      return acc;
    };
  }

  // ---------------- Usage ----------------

  const sum = arr.myReduce((acc, curr) => acc + curr, 0);
  const doubled = arr.myMap((item) => item * 2);
  const evens = arr.myFilter((item) => item % 2 === 0);
  const found = arr.myFind((item) => item === 3);

  arr.myForEach((item) => console.log(item, "forEach"));

  console.log(sum, "SUM");
  console.log(doubled, "MAP");
  console.log(evens, "FILTER");
  console.log(found, "FIND");

  // ---------------- Render ----------------

  const letters = ["A", "B", "C"];

  return (
    <div>
      {letters.myMap((item, idx) => (
        <span key={idx}>{item} </span>
      ))}
    </div>
  );
}

export default Polyfills;
