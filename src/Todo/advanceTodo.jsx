import React, { useState, useEffect } from "react";

// Main Component
export default function Playground() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  useEffect(() => {
    console.log("Todos updated:", todos);
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue("");
      console.log("Todo added:", newTodo);
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          console.log("Todo toggled:", { ...todo, completed: !todo.completed });
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    console.log("Todo deleted:", id);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React Playground</h1>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Counter</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <span className="text-2xl font-bold">{count}</span>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Todo List</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              console.log("Input changed:", e.target.value);
            }}
            placeholder="Add new todo"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5"
                />
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 text-red-500 hover:bg-red-100 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <p className="text-gray-600">Total Todos</p>
            <p className="text-2xl font-bold">{todos.length}</p>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <p className="text-gray-600">Completed</p>
            <p className="text-2xl font-bold">
              {todos.filter((todo) => todo.completed).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
