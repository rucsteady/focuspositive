import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { Container, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);

  return (
    <div>
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          <Box elevation={0}>
            <Typography variant="h5">Account</Typography>
            <Divider sx={{ padding: 1 }} />

            <Box>
              <Typography sx={{ padding: 1 }}>Eingeloggt als:</Typography>
              <Typography sx={{ padding: 1 }}>
                Vorname:{` `}
                {users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.firstname)}
              </Typography>
              <Typography sx={{ padding: 1 }}>
                Nachname:{` `}
                {users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.lastname)}
              </Typography>
              <Typography sx={{ padding: 1 }}>
                E-Mail:{` `}
                {currentEmail}
              </Typography>
            </Box>
            <div style={{ marginTop: 10 }}>
              <Button
                variant="contained"
                onClick={handleLogOut}
                sx={{ boxShadow: 0 }}
              >
                Logout
              </Button>
            </div>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Account;
