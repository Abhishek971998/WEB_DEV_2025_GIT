/* eslint-disable no-unused-vars */
import React, { useState, memo } from "react";

const ChildCounter = ({ count, onIncrement }) => {
  console.log("ChildCounter rendered");
  return (
    <p>
      <button onClick={onIncrement}>child counts</button>
      Child Count: {count}
    </p>
  );
};

export default memo(ChildCounter);
