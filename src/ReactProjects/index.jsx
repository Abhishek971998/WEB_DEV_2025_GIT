import TodoList from "./TodoList";
import ScrollToTop from "./ScrollToTop";
import React, { useState } from "react";
export default function AllProjects(params) {
  const arr = ["ScrollToTop", "TodoList", "GenerateCaptcha"];
  const [type, setType] = useState("TodoList");
  const [randomValue, setrandomValue] = useState("");

  const GenerateCaptcha = ({ len = 5 }) => {
    const chars = "ACDEFGHIJKLMNOPRSTUVWXYZ1234567890";

    return Array.from({ length: len }, () => {
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }).join("");
  };

  const showPage = () => {
    switch (type) {
      case "ScrollToTop":
        return <ScrollToTop />;

      case "TodoList":
        return <TodoList />;

      case "GenerateCaptcha":
        return <GenerateCaptcha len={14} />;

      default:
        return <TodoList />;
    }
  };

  const randomNum = () => {
    setrandomValue(Math.floor(Math.random(100) * 25));
  };

  console.log(randomValue, "randomValue");

  return (
    <>
      <div>
        {arr.map((item) => (
          <button
            key={item}
            onClick={() => setType(item)}
            style={{ margin: "20px" }}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>{showPage()}</div>
      <div>{randomValue}</div>
      <button onClick={() => randomNum()}> GENERATE CAPTCHA</button>
    </>
  );
}
