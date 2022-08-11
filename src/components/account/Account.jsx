import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import {
  Container,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [values, setValues] = useState({
    id: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    showPassword: false,
  });

  const userId = users
    .filter((user) => user.email === currentEmail)
    .map((user) => user.id)
    .toString();

  useEffect(() => {
    getValues();
  }, []);

  const getValues = () => {
    axios
      .get(`https://fpjsonserver.herokuapp.com/users/${userId}`)
      .then(({ data }) => setValues(data));
  };

  const data = {
    id: userId,
    email: email,
    firstname: firstname,
    lastname: lastname,
  };

  console.log(data);

  const handleAccountSubmit = () => {
    axios.put(`https://fpjsonserver.herokuapp.com/users/${userId}`, data);

    // setEditAccount(false);
  };
  console.log(data);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                      defaultValue={users
                        .filter((user) => user.email === currentEmail)
                        .map((user) => user.firstname)}
                      label="Vorname"
                      onChange={(e) => setFirstname(e.target.value)}
                    ></TextField>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      defaultValue={users
                        .filter((user) => user.email === currentEmail)
                        .map((user) => user.lastname)}
                      label="Nachname"
                      onChange={(e) => setLastname(e.target.value)}
                    ></TextField>
                    <TextField
                      sx={{ margin: 1, padding: 1 }}
                      label="E-Mail"
                      defaultValue={currentEmail}
                      onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                  </FormGroup>

                  <FormControl>
                    <InputLabel htmlFor="password">Passwort</InputLabel>
                    <OutlinedInput
                      id="password"
                      label="Passwort"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </FormControl>
              </Box>
            ) : (
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
            )}

            <div style={{ marginTop: 10 }}>
              <Button
                variant="contained"
                onClick={handleLogOut}
                sx={{ boxShadow: 0 }}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                onClick={() => setEditAccount(true)}
                sx={{ boxShadow: 0, ml: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={handleAccountSubmit}
                sx={{ boxShadow: 0, ml: 2 }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Account;
