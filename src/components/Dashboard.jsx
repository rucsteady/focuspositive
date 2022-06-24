import React, { useContext } from "react";
import "./DashboardStyle.css";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { users, currentEmail } = useContext(AuthContext); 

  return (
    <div className="dashboard">
      <div className="bg">
        <div style={{ backgroundColor: "#fff", padding: "10px" }}>
          Wilkommen{" "}
          {users
            .filter((user) => user.email === currentEmail)
            .map((user) => user.firstname)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
