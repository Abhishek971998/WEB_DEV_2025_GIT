import { useState } from "react";

function TooltipExample() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 50 }}>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ display: "inline-block", position: "relative" }}
      >
        Hover me
        {show && (
          <div
            style={{
              background: "black",
              color: "white",
              padding: "5px 10px",
              borderRadius: 4,
              fontSize: 12,

              width: 200, // 👈 required
              whiteSpace: "nowrap", // 👈 single line
              overflow: "hidden", // 👈 hide overflow
              textOverflow: "ellipsis", // 👈 adds ...
            }}
          >
            Tool tip Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Officiis, assumenda. Tool tip Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officiis, assumenda.
          </div>
        )}
      </div>
    </div>
  );
}

// 🟢 Modal component
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Simple Modal</h2>
        <p>This is a simple modal component.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// 🟡 Main App component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Modal Example</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <TooltipExample />
    </div>
  );
};

// 🟠 Basic styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default App;

// Must-do
// Build:
// Modal
// Tooltip
// Dropdown (with keyboard support)
// Infinite scroll
// Implement search with debounce
// Build a todo app (with edge cases)
// Drag and drop basics
// Form validation
