import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axiox from "axios";
import "./LoginStyle.css";

function Login({ setUserLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiox
      .post("http://localhost:8080/api/auth/login", {
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
        setUserLoggedIn(true);
        navigate("/");
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div>
      <div className="login">
        <div style={{ marginBottom: "10px" }}>Focus Positive Login</div>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            name="email"
            label="Email Addresse"
            type="text"
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
