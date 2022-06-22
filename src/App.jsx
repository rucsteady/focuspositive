import React, { useState, useNavigate } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Chat from "./components/chat/Chat";
import Journal from "./components/journal/Journal";
import Account from "./components/account/Account";
import NotFound from "./components/NotFound";
import styles from "./App.module.css";
import Login from "./components/account/Login";


function App() {
 
  const token = localStorage.getItem('accessToken');
  
  if(!token) {
    return <Login />
  }

  return (
    <>
      <div className={styles.app}>
        <Navigation />

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="journal" element={<Journal />} />
          <Route path="account" element={<Account />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
