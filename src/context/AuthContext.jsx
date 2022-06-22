import React from "react";

const AuthContext = React.createContext(null);

function AuthContext() {
  return (
    <AuthContext.Provider value={token}>
      <h1>React Router</h1>

      <Navigation onLogout={handleLogout} />

      <Routes>...</Routes>
    </AuthContext.Provider>
  );
}

export default AuthContext;
