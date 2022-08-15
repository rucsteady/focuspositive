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
  const [journals, setJournals] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getChats();
    getUsers();
    getJournals();
  }, []);

  useEffect(() => {
    setCurrentUser(users.filter((user) => user.email === currentEmail));
  }, [users, currentEmail]);

  const getJournals = async () => {
    await axios
      .get("http://localhost:8080/journals")
      .then(({ data }) => setJournals(data));
  };

  const getUsers = async () => {
    await axios
      .get("http://localhost:8080/users")
      .then(({ data }) => setUsers(data));
  };

  const getChats = async () => {
    await axios
      .get("http://localhost:8080/chats")
      .then(({ data }) => setRandomChats(data));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      users.filter((user) => user.email === currentEmail)
    ) {
      await axios
        .get("http://localhost:8080/users", {
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
    } else {
      console.log("works");
    }
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
        journals,
        setJournals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
