import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const MyContext = createContext();

// 2. Create a provider component
const MyProvider = ({ children }) => {
  const [user, setUser] = useState("John Doe");

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

// 3. Use the context in a component
const UserComponent = () => {
  const { user, setUser } = useContext(MyContext);

  return (
    <div>
      <h1>User: {user}</h1>
      <button onClick={() => setUser("Jane Doe")}>Change User</button>
    </div>
  );
};

// 4. Wrap your app with the provider
const App = () => {
  return (
    <MyProvider>
      <UserComponent />
    </MyProvider>
  );
};

export default App;
