import React from "react";


function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
 

  return <div>Wilkommen {user.fname}</div>;
} 

export default Dashboard;
