const roles = {
  admin: ["create", "read", "update", "delete"],
  editor: ["read", "update"],
  viewer: ["read"],
};

const checkPermission = (role, action) => {
  return roles[role]?.includes(action);
};

//ProtectedComponent put it in different
const ProtectedComponent = ({ role, action, children }) => {
  return checkPermission(role, action) ? children : <p>Access Denied</p>;
};

const App = () => {
  const userRole = "editor"; // Change this to "admin" or "viewer" for testing

  return (
    <div>
      <h1>Welcome, {userRole}!</h1>

      <ProtectedComponent role={userRole} action="read">
        <p>This is a protected content visible to your role.</p>
      </ProtectedComponent>

      <ProtectedComponent role={userRole} action="delete">
        <p>Delete Button (only for admins)</p>
      </ProtectedComponent>
    </div>
  );
};

// 🔹 Advantages of RBAC
// ✅ Security – Limits access to only necessary functionalities.
// ✅ Scalability – Easy to manage multiple users with predefined roles.
// ✅ Compliance – Helps meet security and compliance requirements.
// ✅ Efficiency – Reduces administrative workload by managing users via roles
