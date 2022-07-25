import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Chat from "./components/chat/Chat";
import Journal from "./components/journal/Journal";
import Account from "./components/account/Account";
import NotFound from "./components/NotFound";
import styles from "./App.module.css";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import AuthContext from "./context/AuthContext";
import RandomChatTimeUp from "./components/chat/RandomChatTimeUp";

function App() {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className={styles.app}>
        <div style={{ marginBottom: 15 }}>
          <Navigation />
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {userLoggedIn && <Route path="chat" element={<Chat />} />}
          {userLoggedIn && <Route path="journal" element={<Journal />} />}
          {userLoggedIn && <Route path="account" element={<Account />} />}
          {userLoggedIn && (
            <Route path="chatover" element={<RandomChatTimeUp />} />
          )}
          {!userLoggedIn && <Route path="login" element={<Login />} />}
          {!userLoggedIn && <Route path="register" element={<Register />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
