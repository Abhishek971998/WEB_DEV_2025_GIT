import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface TodoItem {
  id: string;
  value: string;
  checked: boolean;
}

function TodoList() {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function reset() {
    setCurrentValue("");
    setEditId(null);
    inputRef?.current?.focus();
  }

  const isDuplicate = (value: string) => {
    return todoList.some(
      (item) =>
        item.value.toLowerCase() === value.toLowerCase() && item.id !== editId, // allow same item during edit
    );
  };

  function handleSubmit() {
    const value = currentValue?.trim();

    if (!value) {
      toast.error("Input cannot be empty");
    }

    if (isDuplicate(value)) {
      toast.error("Item already exists!");
      return;
    }

    if (editId) {
      setTodoList((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, value } : item)),
      );
    } else {
      setTodoList((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          value,
          checked: true,
        },
      ]);
    }

    reset();
  }

  function handleEdit(id: string) {
    let temp = [...todoList];
    const edit = temp.find((item) => item.id == id);
    if (!edit) return;

    setEditId(edit.id);
    setCurrentValue(edit.value);
    inputRef.current?.focus();
  }

  function handleDelete(id: string) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item deleted");
  }

  return (
    <div>
      <input
        ref={inputRef}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        placeholder="Enter todo..."
      />

      <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
      {todoList.map((item, idx) => {
        return (
          <div key={item.id}>
            {item.value}
            <div>
              <button onClick={() => handleEdit(item.id)}>EDIT</button>
              <button onClick={() => handleDelete(item.id)}>DELETE</button>
            </div>
          </div>
        );
      })}
      <Toaster />
    </div>
  );
}

export default TodoList;
