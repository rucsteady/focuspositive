import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import {
  Container,
  Divider,
  FormControl,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const userId = users
    .filter((user) => user.email === currentEmail)
    .map((user) => user.id)
    .toString();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`https://fpjsonserver.herokuapp.com/users/${userId}`)
        .then(({ data }) => setUser(data));
    };
    getUser();
  }, [editAccount, userId]);

  useEffect(() => {
    axios
      .get(`https://fpjsonserver.herokuapp.com/users/${userId}`)
      .then((res) => {
        setEmail(res.data.email);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setPassword(res.data.password);
      });
  }, [users, userId]);

  const data = {
    id: userId,
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password,
  };

  const handleAccountSubmit = async () => {
    await axios.put(`https://fpjsonserver.herokuapp.com/users/${userId}`, data);

    setEditAccount(false);
  };

  return (
    <div>
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          <Box elevation={0}>
            <Typography variant="h5">Account</Typography>
            <Divider sx={{ padding: 1 }} />

            {editAccount ? (
              <Box>
                <FormControl sx={{ margin: 1, padding: 1 }} variant="outlined">
                  <FormGroup row>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      defaultValue={user.firstname}
                      label="Vorname"
                      onChange={(e) => setFirstname(e.target.value)}
                    ></TextField>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      defaultValue={user.lastname}
                      label="Nachname"
                      onChange={(e) => setLastname(e.target.value)}
                    ></TextField>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      label="E-Mail"
                      defaultValue={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      label="Passwort"
                      defaultValue={user.password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                  </FormGroup>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleAccountSubmit}
                  sx={{ boxShadow: 0, ml: 2 }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography sx={{ padding: 1 }}>Eingeloggt als:</Typography>
                <Typography sx={{ padding: 1 }}>
                  Vorname:{` `}
                  {user.firstname}
                </Typography>
                <Typography sx={{ padding: 1 }}>
                  Nachname:{` `}
                  {user.lastname}
                </Typography>
                <Typography sx={{ padding: 1 }}>
                  E-Mail:{` `}
                  {user.email}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setEditAccount(true)}
                  sx={{ boxShadow: 0, ml: 2 }}
                >
                  Edit
                </Button>
              </Box>
            )}

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
