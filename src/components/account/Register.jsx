import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./RegisterStyle.css";
import { Container, Paper } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const { setCurrentUser, currentEmail, users } = useContext(AuthContext);

  const register = async (e) => {
    e.preventDefault();
    await axios
      .post("https://fpjsonserver.herokuapp.com/users", {
        email,
        password,
        firstname,
        lastname,
      })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setCurrentUser(users.filter((user) => user.email === currentEmail));
        navigate("/login");
      })
      .catch(function (error) {
        if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
          // } else if (error.request) {

          //   console.log(error.request);
          // } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  return (
    <div>
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          <div>
            <div style={{ marginBottom: "10px" }}>Account-Registrierung</div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form noValidate autoComplete="off" onSubmit={register}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="firstname"
                name="firstname"
                label="Vorname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ marginRight: 3 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="lastname"
                name="lastname"
                label="Nachname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                name="email"
                label="Email Addresse"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginRight: 3 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="password"
                name="password"
                label="Passwort"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="button">
                <Button variant="contained" type="submit" sx={{ boxShadow: 0 }}>
                  Anlegen
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Register;
