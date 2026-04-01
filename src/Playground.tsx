// const Home = lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => resolve(import("./Modal")), 2000); // 2 seconds delay
//     }),
// );

import React, { useState, useEffect } from "react";

function Playground() {
  const [content, setContent] = useState("null");

  function logLength<T extends { length: number }>(value: T): void {
    console.log(value.length);
  }

  logLength([0, 3434343]);

  return <div>{content || "Loading..."}</div>;
}
export default Playground;
