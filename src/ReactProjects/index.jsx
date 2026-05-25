import TodoList from "./TodoList";
import ScrollToTop from "./ScrollToTop";
import CinemaHall from "./CinemaHall";
import FormValidation from "./FormValidations";
import FileExplorer from "./FileExplorer";
import JsonToTree from "./NestedJsonViewer";
import React, { useState } from "react";
export default function AllProjects(params) {
  const arr = [
    "ScrollToTop",
    "TodoList",
    "GenerateCaptcha",
    "CinemaHall",
    "FormValidation",
    "FileExplorer",
    "JsonToTree",
  ];

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

      case "GenerateCaptcha":
        return <GenerateCaptcha len={14} />;

      case "CinemaHall":
        return <CinemaHall />;

      case "FormValidation":
        return <FormValidation />;

      case "FileExplorer":
        return <FileExplorer />;

      case "JsonToTree":
        return <JsonToTree />;

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
      <div style={{ backgroundColor: "black", color: "white" }}>
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
      </div>

      <div style={{ marginTop: "20px" }}>{showPage()}</div>
      <div>{randomValue}</div>
      <div>
        <button onClick={() => randomNum()} style={{ marginTop: "20px" }}>
          {" "}
          GENERATE CAPTCHA
        </button>
      </div>
    </>
  );
}
