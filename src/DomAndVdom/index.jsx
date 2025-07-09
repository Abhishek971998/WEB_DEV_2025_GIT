import React from "react";
import ReactDOM from "react-dom";

// Real DOM Component
function RealDOM() {
  document.getElementById("root").innerHTML =
    "<div><h2>JS DOM Rendering</h2><b>It is " +
    new Date().toLocaleTimeString() +
    ".</b></div><hr/>";
}
// Inspect elements in browser to see the behaviour
setInterval(RealDOM, 1000);

// Virtual DOM Component
function VirtualDOM() {
  const element = (
    <div>
      <h2>React DOM Rendering</h2>
      <b>It is {new Date().toLocaleTimeString()}.</b>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root2"));
}
// Inspect elements in browser to see the behaviour
setInterval(VirtualDOM, 1000);

// addd to playground and test
