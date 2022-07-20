import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import "./AccountStyle.css";
import { Container } from "@mui/material";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);

  return (
    <Fragment>
      <Container className="account" maxWidth>
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
            Logout
          </Button>
        </div>
      </Container>
    </Fragment>
  );
}

export default Account;
