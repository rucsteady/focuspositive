import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axi from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axi
      .post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setUserLoggedIn(true);
        navigate("/");
      })
      .catch((err) => setError(err.response.data.message));
  };

  const getUsers = async (e) => {
    e.preventDefault();
    axi.get('http://localhost:8080/api/users')
  }
  
  return (
    <AuthContext.Provider
      value={{
        setEmail,
        setPassword,
        handleLogin,
        setUserLoggedIn,
        userLoggedIn,
        error,
        email
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
