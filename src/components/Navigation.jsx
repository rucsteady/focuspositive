import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <NavLink to="/"></NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </>
  );
}

export default Navigation;
