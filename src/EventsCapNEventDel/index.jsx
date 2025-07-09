/* eslint-disable no-unused-vars */
import React from "react";

function ListComponent() {
  const handleClick = (event) => {
    if (event.target.tagName === "LI") {
      alert("You clicked: " + event.target.textContent);
    }
  };

  return (
    <div>
      <h2>EVENT DELEGATION</h2>
      <ul onClick={handleClick}>
        <li>Apple</li>
        <li>Banana</li>
        <li>Cherry</li>
      </ul>
      <CaptureExample />
    </div>
  );
}

function CaptureExample() {
  const parentFunction = () => {
    console.log("Hello from the parent");
  };
  const firstChildFunction = () => {
    // e.stopPropagation();
    // e.preventDefault();
    console.log("Hello from the first child");
  };
  const secondChildFunction = () => {
    console.log("Hello from the second child");
  };
  const thirdChildFunction = () => {
    console.log("Hello from the third child");
  };
  return (
    <div className="App">
      <div
        onClickCapture={(e) => {
          console.log("parent clicked");
        }}
      >
        <button
          onClick={(e) => {
            // e.stopPropagation();

            console.log("Button clicked");
          }}
        >
          Click Me
        </button>
      </div>

      <div className="parent-div" onClick={parentFunction}>
        <button className="first-child-button" onClick={firstChildFunction}>
          First child button
        </button>
        <button className="second-child-button" onClick={secondChildFunction}>
          Second child button
        </button>
        <button className="third-child-button" onClick={thirdChildFunction}>
          Third child button
        </button>
      </div>
    </div>
  );
}

export default ListComponent;
