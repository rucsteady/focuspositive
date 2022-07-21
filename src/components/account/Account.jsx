import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { Card, Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);

  return (
    <Fragment>
      <Container>
        <Box elevation={0} sx={{ maxWidth: 400 }}>
          <Card sx={{ minHeight: 400, padding: 4 }}>
            <Typography variant="h5">Account</Typography>
            <Divider sx={{ margin: 2 }} />
            <Typography sx={{ margin: 2 }}>
              Eingeloggt als
              <Typography sx={{ marginTop: 2 }}>
                Vorname:{` `}
                {users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.firstname)}
              </Typography>
              <Typography sx={{ marginTop: 2 }}>
                Nachname:{` `}
                {users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.lastname)}
              </Typography>
            </Typography>
            <div>
              <Button variant="contained" onClick={handleLogOut}>
                Logout
              </Button>
            </div>
          </Card>
        </Box>
      </Container>
    </Fragment>
  );
}

export default Account;
