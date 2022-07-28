import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [randomChats, setRandomChats] = useState([]);
  let navigate = useNavigate();

  const getUsers = async () => {
    await axios
      .get("https://fpjsonserver.herokuapp.com/users")
      .then(({ data }) => setUsers(data));
  };
  useEffect(() => {
    getUsers();
  }, []);


  const getChats = async () => {
    await axios
      .get("https://fpjsonserver.herokuapp.com/chats")
      .then(({ data }) => setRandomChats(data));
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setCurrentUser(users.filter((user) => user.email === currentEmail));
  }, [users, currentEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .get("https://fpjsonserver.herokuapp.com/users", {
        email,
        password,
      })
      .then((response) => {
        setCurrentUser(users.filter((user) => user.email === currentEmail));
        setCurrentEmail(email);
        setError("");
        setEmail("");
        setPassword("");
        setUserLoggedIn(true);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleLogOut = () => {
    setCurrentUser("");
    setCurrentEmail("");
    setUserLoggedIn("");
    setUserLoggedIn(false);
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        setEmail,
        setPassword,
        handleLogin,
        setUserLoggedIn,
        userLoggedIn,
        error,
        currentEmail,
        users,
        handleLogOut,
        setCurrentUser,
        currentUser,
        randomChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
