const roles = {
  admin: ["create", "read", "update", "delete"],
  editor: ["read", "update"],
  viewer: ["read"],
};

const hasAccess = (role, action) => roles[role]?.includes(action);

const App = () => {
  const userRole = "editor"; // try "admin" or "viewer"

  return (
    <div>
      <h1>Welcome, {userRole}!</h1>

      {hasAccess(userRole, "read") && <p>You can read this content.</p>}

      {hasAccess(userRole, "delete") && <button>Delete</button>}

      {!hasAccess(userRole, "delete") && <p>Delete access denied</p>}
    </div>
  );
};

export default App;

// 🔹 Advantages of RBAC
// ✅ Security – Limits access to only necessary functionalities.
// ✅ Scalability – Easy to manage multiple users with predefined roles.
// ✅ Compliance – Helps meet security and compliance requirements.
// ✅ Efficiency – Reduces administrative workload by managing users via roles
