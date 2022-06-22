import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import swal from "sweetalert";

async function loginUser(credentials) {
  return fetch("https://www.mecallapi.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    if ("accessToken" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/profile";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <div>
      <div>
        <div>Sign in</div>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
