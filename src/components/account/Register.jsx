import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import axi from "axios";
import AuthContext from "../../context/AuthContext";
import "./RegisterStyle.css";

function Register() {
  const { setLogoutUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    axi
      .post("http://localhost:8080/api/auth/register", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
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
        setLogoutUser(false);
        navigate("/");
      })
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <div>
      <div className="register">
        <div style={{ marginBottom: "10px" }}>Account-Registrierung</div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form noValidate autoComplete="off" onSubmit={register}>
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
            <Button variant="contained" type="submit">
            Anlegen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
