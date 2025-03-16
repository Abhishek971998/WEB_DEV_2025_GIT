/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import ChildCounter from "./Child";

const ParentWithStateUpdates = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  const onIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>Problem 2: Unrelated State Updates</h2>
      <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
        Update unrelated state: {unrelatedState}
      </button>

      {/* ChildCounter rerenders even when only unrelatedState changes */}
      <ChildCounter count={count} onIncrement={onIncrement} />
    </div>
  );
};

export default ParentWithStateUpdates;
