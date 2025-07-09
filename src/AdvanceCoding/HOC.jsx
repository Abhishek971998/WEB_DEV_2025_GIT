/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

function HOC() {
  function withLogger(Component) {
    return function (args) {
      return <Component {...args} />;
    };
  }

  const User = (data) => {
    return <div>{data?.name}</div>;
  };

  const Greet = withLogger(User);
  return (
    <>
      <h2>hellos</h2>
      <Greet name="abhi" />
    </>
  );
}

export default HOC;
