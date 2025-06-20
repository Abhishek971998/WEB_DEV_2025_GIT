// import { useActionState } from "react";

import { useState, useEffect } from "react";
import { useRef } from "react";

// Server Action
async function addTodoAction(formData) {
  "use server";

  const title = formData.get("title");
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
}

// Form Submit Button with loading state
function SubmitButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Adding..." : "Add Todo"}
    </button>
  );
}

function React19() {
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Handle form submission with server action
  async function handleSubmit(formData) {
    const title = formData.get("title");
    const optimisticTodo = {
      id: Date.now(),
      title,
      completed: false,
      userId: 1,
      optimistic: true,
    };

    setIsSubmitting(true);
    setError(null);

    try {
      // Add optimistic update
      setPendingTodos((prev) => [...prev, optimisticTodo]);

      // Perform server action
      const newTodo = await addTodoAction(formData);

      // Remove optimistic todo and add the real one
      setPendingTodos((prev) =>
        prev.filter((todo) => todo.id !== optimisticTodo.id)
      );
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      // Remove optimistic todo on error
      setPendingTodos((prev) =>
        prev.filter((todo) => todo.id !== optimisticTodo.id)
      );
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Using ref as a prop
  const formRef = useRef();

  if (isLoading) {
    return <div className="p-4">Loading todos...</div>;
  }

  // Combine regular todos with pending (optimistic) todos
  const allTodos = [...todos, ...pendingTodos];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        React Todo Demo with Optimistic Updates
      </h1>

      {/* Using ref as a prop directly */}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.target));
        }}
        className="mb-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Add new todo"
          className="border p-2 mr-2"
          required
        />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>

      {/* Document head updates */}
      <title>React Todo Demo</title>
      <meta
        name="description"
        content="Demo of React features with optimistic updates"
      />
      <link rel="stylesheet" href="/styles.css" />

      <div className="space-y-2">
        {allTodos.map((todo) => (
          <div
            key={todo.id}
            className={`p-2 border rounded ${
              todo.optimistic ? "bg-yellow-50" : "bg-white"
            }`}
          >
            <p className={todo.completed ? "line-through" : ""}>
              {todo.title}
              {todo.optimistic && " (Optimistic)"}
            </p>
          </div>
        ))}
      </div>

      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
    </div>
  );
}

export default React19;
