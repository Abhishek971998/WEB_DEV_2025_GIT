import { useState } from "react";

function MouseTracker(props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Callback: Notify parent
    if (props.mycb) {
      props.mycb({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: "300px", border: "1px solid #ccc" }}
    >
      {/* Render Prop: Control what gets displayed */}
      {props.callMy(mousePosition)}
    </div>
  );
}

export default function App() {
  function mycb(params) {
    console.log(params, "Hello app");
  }

  return (
    <div>
      <h1>Render Props & Callback Example</h1>
      <MouseTracker
        mycb={mycb} // Callback to log position
        callMy={(
          position // Render prop to display position
        ) => (
          <p>
            Mouse position: {position.x}, {position.y}
          </p>
        )}
      />
    </div>
  );
}
