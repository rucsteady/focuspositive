import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";
import {
  Container,
  Divider,
  FormControl,
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

function Account() {
  const { users, handleLogOut, currentEmail } = useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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

            <Box>
              <Typography sx={{ padding: 1 }}>Account bearbeiten:</Typography>
              <TextField
                sx={{ margin: 1, padding: 1, display: "block" }}
                defaultValue={users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.firstname)}
                label="Vorname"
              ></TextField>
              <TextField
                sx={{ margin: 1, padding: 1, display: "block" }}
                defaultValue={users
                  .filter((user) => user.email === currentEmail)
                  .map((user) => user.lastname)}
                label="Nachname"
              ></TextField>
              <TextField
                sx={{ margin: 1, padding: 1, display: "block" }}
                label="E-Mail"
                defaultValue={currentEmail}
              ></TextField>
              <FormControl
                sx={{ margin: 1, padding: 1, display: "block" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
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
                  label="Password"
                />
              </FormControl>
            </Box>

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
