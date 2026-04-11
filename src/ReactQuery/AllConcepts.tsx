import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./style.scss";

let id = 0;
let list = [
  "apple",
  "banana",
  "pineapple",
  "grapefruit",
  "dragonfruit",
  "grapes",
].map((d) => ({ id: id++, name: d, notes: "These are some notes" }));

type Todos = typeof list;
type Todo = Todos[0];

let errorRate = 0.05;
let queryTimeMin = 1000;
let queryTimeMax = 2000;

const queryClient = new QueryClient();

export default function ReactQueryDemo() {
  const [staleTime, setStaleTime] = React.useState(1000);
  const [gcTime, setGcTime] = React.useState(3000);
  const [localErrorRate, setErrorRate] = React.useState(errorRate);
  const [localFetchTimeMin, setLocalFetchTimeMin] =
    React.useState(queryTimeMin);
  const [localFetchTimeMax, setLocalFetchTimeMax] =
    React.useState(queryTimeMax);

  React.useEffect(() => {
    errorRate = localErrorRate;
    queryTimeMin = localFetchTimeMin;
    queryTimeMax = localFetchTimeMax;
  }, [localErrorRate, localFetchTimeMax, localFetchTimeMin]);

  React.useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime,
        gcTime,
      },
    });
  }, [gcTime, staleTime]);

  return (
    <QueryClientProvider client={queryClient}>
      <section className="rq-page">
        <header className="rq-hero">
          <p className="rq-eyebrow">React Query Playground</p>
          <h1>Inspect caching, stale state, and mutations visually</h1>
          <p className="rq-copy">
            The <code>staleTime</code> and <code>gcTime</code> values are
            adjustable here so you can see how query freshness and cache cleanup
            behave in a more hands-on way.
          </p>
        </header>

        <section className="rq-panel">
          <div className="rq-panel__heading">
            <h2>Simulation Controls</h2>
            <p>Tune latency and failure rate to mimic different API states.</p>
          </div>

          <div className="rq-controls">
            <label className="rq-field">
              <span>Stale Time</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={staleTime}
                onChange={(e) => setStaleTime(parseFloat(e.target.value))}
              />
            </label>

            <label className="rq-field">
              <span>Garbage Collection Time</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={gcTime}
                onChange={(e) => setGcTime(parseFloat(e.target.value))}
              />
            </label>

            <label className="rq-field">
              <span>Error Rate</span>
              <input
                type="number"
                min="0"
                max="1"
                step=".05"
                value={localErrorRate}
                onChange={(e) => setErrorRate(parseFloat(e.target.value))}
              />
            </label>

            <label className="rq-field">
              <span>Fetch Time Min</span>
              <input
                type="number"
                min="1"
                step="500"
                value={localFetchTimeMin}
                onChange={(e) =>
                  setLocalFetchTimeMin(parseFloat(e.target.value))
                }
              />
            </label>

            <label className="rq-field">
              <span>Fetch Time Max</span>
              <input
                type="number"
                min="1"
                step="500"
                value={localFetchTimeMax}
                onChange={(e) =>
                  setLocalFetchTimeMax(parseFloat(e.target.value))
                }
              />
            </label>
          </div>
        </section>

        <App />
      </section>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function App() {
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [views, setViews] = React.useState(["", "fruit", "grape"]);

  return (
    <div className="rq-app">
      <section className="rq-panel rq-toolbar">
        <div className="rq-panel__heading">
          <h2>Query Actions</h2>
          <p>Force refreshes, compare filtered views, and test edit flows.</p>
        </div>

        <button
          className="rq-button rq-button--primary"
          onClick={() => queryClient.invalidateQueries()}
        >
          Force Refetch All
        </button>
      </section>

      <section className="rq-lists">
        {views.map((view, index) => (
          <div key={`${view}-${index}`} className="rq-panel rq-list-card">
            <Todos initialFilter={view} setEditingIndex={setEditingIndex} />
          </div>
        ))}
      </section>

      <button
        className="rq-button rq-button--ghost"
        onClick={() => {
          setViews((old) => [...old, ""]);
        }}
      >
        Add Filter List
      </button>

      {editingIndex !== null ? (
        <section className="rq-panel">
          <EditTodo
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
        </section>
      ) : null}

      <section className="rq-panel">
        <AddTodo />
      </section>
    </div>
  );
}

function Todos({
  initialFilter = "",
  setEditingIndex,
}: {
  initialFilter: string;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [filter, setFilter] = React.useState(initialFilter);

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ["todos", { filter }],
    queryFn: fetchTodos,
  });

  return (
    <div className="rq-list">
      <div className="rq-panel__heading">
        <h2>Filtered Todos</h2>
        <p>Try different search terms to watch query keys update.</p>
      </div>

      <div className="rq-inline-field">
        <label className="rq-field">
          <span>Filter</span>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </label>
      </div>

      {status === "pending" ? (
        <p className="rq-status rq-status--info">
          Loading... (Attempt: {failureCount + 1})
        </p>
      ) : status === "error" ? (
        <div className="rq-status rq-status--error">
          <span>Error: {error.message}</span>
          <button
            className="rq-button rq-button--ghost"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <ul className="rq-todo-list">
            {data
              ? data.map((todo) => (
                  <li key={todo.id} className="rq-todo-item">
                    <div>
                      <strong>{todo.name}</strong>
                      <p>{todo.notes}</p>
                    </div>
                    <button
                      className="rq-button rq-button--ghost"
                      onClick={() => setEditingIndex(todo.id)}
                    >
                      Edit
                    </button>
                  </li>
                ))
              : null}
          </ul>

          <div className="rq-status-slot">
            {isFetching ? (
              <p className="rq-status rq-status--info">
                Background Refreshing... (Attempt: {failureCount + 1})
              </p>
            ) : (
              <p className="rq-status rq-status--muted">
                Results are up to date.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function EditTodo({
  editingIndex,
  setEditingIndex,
}: {
  editingIndex: number;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const queryClient = useQueryClient();

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ["todo", { id: editingIndex }],
    queryFn: () => fetchTodoById({ id: editingIndex }),
  });

  const [todo, setTodo] = React.useState(data || {});

  React.useEffect(() => {
    if (editingIndex !== null && data) {
      setTodo(data);
    } else {
      setTodo({});
    }
  }, [data, editingIndex]);

  const saveMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: (nextTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueryData(["todo", { id: editingIndex }], nextTodo);
    },
  });

  const onSave = () => {
    saveMutation.mutate(todo);
  };

  const disableEditSave =
    status === "pending" || saveMutation.status === "pending";

  return (
    <div className="rq-editor">
      <div className="rq-panel__heading">
        {data ? (
          <>
            <button
              className="rq-button rq-button--ghost"
              onClick={() => setEditingIndex(null)}
            >
              Back
            </button>
            <h2>
              Editing "{data.name}" <span>#{editingIndex}</span>
            </h2>
          </>
        ) : null}
      </div>

      {status === "pending" ? (
        <p className="rq-status rq-status--info">
          Loading... (Attempt: {failureCount + 1})
        </p>
      ) : error ? (
        <div className="rq-status rq-status--error">
          <span>Error!</span>
          <button
            className="rq-button rq-button--ghost"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="rq-form-grid">
          <label className="rq-field">
            <span>Name</span>
            <input
              value={todo.name}
              onChange={(e) =>
                setTodo((old) => ({ ...old, name: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>

          <label className="rq-field">
            <span>Notes</span>
            <input
              value={todo.notes}
              onChange={(e) =>
                setTodo((old) => ({ ...old, notes: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>

          <div className="rq-editor__actions">
            <button
              className="rq-button rq-button--primary"
              onClick={onSave}
              disabled={disableEditSave}
            >
              Save
            </button>
          </div>

          <div className="rq-status-slot">
            <p
              className={`rq-status ${
                saveMutation.status === "error"
                  ? "rq-status--error"
                  : saveMutation.status === "pending"
                    ? "rq-status--info"
                    : "rq-status--success"
              }`}
            >
              {saveMutation.status === "pending"
                ? "Saving..."
                : saveMutation.status === "error"
                  ? saveMutation.error.message
                  : "Saved!"}
            </p>
          </div>

          <div className="rq-status-slot">
            {isFetching ? (
              <p className="rq-status rq-status--info">
                Background Refreshing... (Attempt: {failureCount + 1})
              </p>
            ) : (
              <p className="rq-status rq-status--muted">Editor is synced.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AddTodo() {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");

  const addMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="rq-add-todo">
      <div className="rq-panel__heading">
        <h2>Add Todo</h2>
        <p>Create a new item and watch the cached lists refresh.</p>
      </div>

      <div className="rq-add-todo__row">
        <label className="rq-field rq-field--grow">
          <span>Todo name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={addMutation.status === "pending"}
            placeholder="Enter a new fruit todo"
          />
        </label>

        <button
          className="rq-button rq-button--primary"
          onClick={() => {
            addMutation.mutate({ name, notes: "These are some notes" });
          }}
          disabled={addMutation.status === "pending" || !name}
        >
          Add Todo
        </button>
      </div>

      <div className="rq-status-slot">
        <p
          className={`rq-status ${
            addMutation.status === "error"
              ? "rq-status--error"
              : addMutation.status === "pending"
                ? "rq-status--info"
                : "rq-status--success"
          }`}
        >
          {addMutation.status === "pending"
            ? "Saving..."
            : addMutation.status === "error"
              ? addMutation.error.message
              : "Saved!"}
        </p>
      </div>
    </div>
  );
}

function fetchTodos({ signal, queryKey: [, { filter }] }): Promise<Todos> {
  console.info("fetchTodos", { filter });

  if (signal) {
    signal.addEventListener("abort", () => {
      console.info("cancelled", filter);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() < errorRate) {
          return reject(
            new Error(JSON.stringify({ fetchTodos: { filter } }, null, 2)),
          );
        }
        resolve(list.filter((d) => d.name.includes(filter)));
      },
      queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin),
    );
  });
}

function fetchTodoById({ id }: { id: number }): Promise<Todo> {
  console.info("fetchTodoById", { id });
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() < errorRate) {
          return reject(
            new Error(JSON.stringify({ fetchTodoById: { id } }, null, 2)),
          );
        }
        resolve(list.find((d) => d.id === id));
      },
      queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin),
    );
  });
}

function postTodo({ name, notes }: Omit<Todo, "id">) {
  console.info("postTodo", { name, notes });
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() < errorRate) {
          return reject(
            new Error(JSON.stringify({ postTodo: { name, notes } }, null, 2)),
          );
        }
        const todo = { name, notes, id: id++ };
        list = [...list, todo];
        resolve(todo);
      },
      queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin),
    );
  });
}

function patchTodo(todo?: Todo): Promise<Todo> {
  console.info("patchTodo", todo);
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (Math.random() < errorRate) {
          return reject(
            new Error(JSON.stringify({ patchTodo: todo }, null, 2)),
          );
        }
        list = list.map((d) => {
          if (d.id === todo.id) {
            return todo;
          }
          return d;
        });
        resolve(todo);
      },
      queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin),
    );
  });
}
