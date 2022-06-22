import React from "react";
import "./DashboardStyle.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <div className="bg">
        <div style={{ backgroundColor: "#fff", padding: "10px" }}>
          Wilkommen {user.fname} {user.lname}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
