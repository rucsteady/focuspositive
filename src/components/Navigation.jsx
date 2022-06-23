import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationStyle.css";

function Navigation() {
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="topnav">
        <div
          style={{
            display: "inline-block",
            float: "left",
            marginTop: 13,
            marginLeft: 15,
            marginRight: 15,
            color: "#fff",
          }}
        >
          Focus Positive
        </div>        
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/chat">Random Chat</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink to="/account">Account</NavLink>
        
        <NavLink to="/login">Login</NavLink> 
      </div>
    </>
  );
}

export default Navigation;
