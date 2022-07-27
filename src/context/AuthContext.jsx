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

  // const port = process.env.PORT || 8080;

  // axios
  //   .post('http://localhost:8080/api/auth/login', {
  //     email,
  //     password,
  //   }) .post("https://fpauthserver.herokuapp.com/api/auth/login", {

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("https://fpauthserver.herokuapp.com/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
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
    setUserLoggedIn(false);
    navigate("/login");
  };

  const getUsers = async () => {
    await axios
      .get("https://fpauthserver.herokuapp.com/api/users")
      .then((response) => setUsers(response.data.users));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getChats = async () => {
    await axios
      .get("https://fpauthserver.herokuapp.com/api/chats")
      .then((response) => setRandomChats(response.data.chats));
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setCurrentUser(users.filter((user) => user.email === currentEmail));
  }, [users, currentEmail]);

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
        currentUser,
        randomChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
