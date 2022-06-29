import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import "./AccountStyle.css";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);

  return (
    <>
      <div className="account">
        <div>Account</div>
        <div>
          Eingeloggt als
          <p style={{ margin: 5 }}>
            Vorname:
            {users
              .filter((user) => user.email === currentEmail)
              .map((user) => user.firstname)}
          </p>
          <p style={{ margin: 5 }}>
            Nachname:
            {users
              .filter((user) => user.email === currentEmail)
              .map((user) => user.lastname)}
          </p>
        </div>
        <div>
          <Button variant="contained" onClick={handleLogOut}>
            {" "}
            Logout
          </Button>{" "}
        </div>
      </div>
    </>
  );
}

export default Account;
