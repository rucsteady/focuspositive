import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);

  return (
    <>
      <div>Account</div>
      <div>Eingeloggt als: {users
            .filter((user) => user.email === currentEmail)
            .map((user) => user.firstname)}    
            
            {users
            .filter((user) => user.email === currentEmail)
            .map((user) => user.lastname)}</div>

      <div>
        <Button variant="contained" onClick={handleLogOut}>
          {" "}
          Logout
        </Button>{" "}
      </div>
    </>
  );
}

export default Account;
