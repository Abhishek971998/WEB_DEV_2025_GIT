import React, { createContext, useContext, useState } from "react";

// The React Context API is a built-in feature that allows you to share data (state)
// across components without passing props manually at every level.
// It helps manage global state like theme, authentication, user settings, and more

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

// // Create MULTIPLE contexts
// const ThemeContext = createContext();
// const UserContext = createContext();

// // Theme Provider
// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("dark");
//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // User Provider
// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState("Guest");
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Combined Provider
// export const AppProvider = ({ children }) => {
//   return (
//     <ThemeProvider>
//       <UserProvider>{children}</UserProvider>
//     </ThemeProvider>
//   );
// };
