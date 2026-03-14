import React from "react";

function Playground() {
  const basicPromise_ = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
      resolve("Promise resolved successfully");
    } else {
      reject("Promise rejected");
    }
  });

  console.log(basicPromise_, "basicPromise_");

  return <div>Playground</div>;
}

export default Playground;
