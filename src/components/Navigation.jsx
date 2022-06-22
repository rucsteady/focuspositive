import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationStyle.css";

function Navigation() {
  return (
    <>
      <div className="topnav">
        <div style={{ display: "inline-block", float: "left", marginTop: 13, marginLeft: 15, marginRight: 15, color: "#fff" }}>
          Focus Positive
        </div>
        <NavLink style={{ display: "inline-block" }} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink style={{ display: "inline-block" }} to="/chat">
          Random Chat
        </NavLink>
        <NavLink style={{ display: "inline-block" }} to="/journal">
          Journal
        </NavLink>
        <NavLink style={{ display: "inline-block" }} to="/account">
          Account
        </NavLink>
      </div>
    </>
  );
}

export default Navigation;
