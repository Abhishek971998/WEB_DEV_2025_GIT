import React, { useEffect } from "react";

// 🔹 1. Component Composition (Most Important)

function Card({ children }) {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}

function ComponentComposite() {
  return (
    <Card>
      <h1>This is inside Card</h1>
    </Card>
  );
}

//🔹 2. Custom Hooks Pattern

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return data;
}

function CustomHook() {
  const data = useFetch("https://google.com");

  return <div>{JSON.stringify(data)}</div>;
}

//🔹 3. Controlled Components
function Form() {
  const [name, setName] = useState("");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
// 👉 Single source of truth = React state.

//🔹 4. Higher-Order Component (HOC)

function withLoading(Component) {
  return function Wrapped({ isLoading, ...props }) {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
}

const Loader = withLoading(UserList);

function HOC() {
  return <Loader users={["bahishek", "Amit"]} isLoading={true} />;
}

//5. Render Props pattern

function DataProvider({ render }) {
  const data = "hello";

  render(data);
}

const RenderProps = () => {
  return <DataProvider render={(data) => <h1>{data}</h1>} />;
};
