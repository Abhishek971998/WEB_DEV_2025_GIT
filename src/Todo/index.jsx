import React, { useState } from "react";
import "./style.scss"; // Include CSS in the same file
import AdvanceTodo from "./advanceTodo";

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setCurrentItem(e.target.value);
  };

  const handleAddOrUpdate = () => {
    if (!currentItem.trim()) return;
    let checkFind = todoList.findIndex((item) => item.value == currentItem);

    if (checkFind !== -1) {
      alert("Alreadt added");

      return;
    }
    if (editIndex !== null) {
      // Update existing item
      setTodoList((prev) =>
        prev.map((item, index) =>
          index === editIndex ? { value: currentItem } : item
        )
      );
      setEditIndex(null);
    } else {
      // Add new item
      setTodoList((prev) => [...prev, { value: currentItem }]);
    }
    setCurrentItem("");
  };

  const handleEdit = (index) => {
    setCurrentItem(todoList[index].value);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTodoList((prev) => prev.filter((_, idx) => idx !== index));
    if (editIndex === index) {
      setCurrentItem("");
      setEditIndex(null);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <div className="input-section">
        <input
          placeholder="Add a task..."
          onChange={handleChange}
          value={currentItem}
          onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdate()}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul>
        {todoList.map((item, idx) => (
          <li key={idx}>
            {item.value}
            <div>
              <button className="edit" onClick={() => handleEdit(idx)}>
                ✏ Edit
              </button>
              <button className="delete" onClick={() => handleDelete(idx)}>
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        Advance
        <AdvanceTodo />
      </div>
    </div>
  );
}

export default TodoApp;

// Inject CSS dynamically
