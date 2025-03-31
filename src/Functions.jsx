import React from "react";

function Functions() {
  //   function can be called in 4 ways

  function showMessage(params) {
    return params + "  hello world";
  }

  showMessage("Abhishek");

  let show = new showMessage();
  console.log(show, "Show");

  let call = showMessage.call();
  console.log(call, "call");

  return <div>Functions</div>;
}

export default Functions;
