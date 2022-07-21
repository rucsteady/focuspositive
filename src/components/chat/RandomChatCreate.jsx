import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useNavigate } from "react-router-dom";
import axi from "axios";

import React, { Fragment, useState } from "react";

function RandomChatCreate({
  handleShowChatSearch,
  handleShowChatInfo,
  handleShowChatNew,
}) {
  const [name, setName] = useState("");
  const [topics, setTopics] = useState("");
  const [user1, setUser1] = useState("");
  const [date, setDate] = useState(null);
  const [room, setRoom] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [startReady, setStartReady] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState(null);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axi
      .post("http://localhost:8080/api/chats", {
        name,
        topics,
        user1,
        date,
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
        setName("");
        setTopics("");
        setDate("");
        setRoom("");
        setIsOpen(false);
        startReady(false)
        navigate("/");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <Fragment>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 350,
            padding: 4,
          }}
        >
          <Typography variant="h6">Erstelle einen neuen Random Chat</Typography>
          <Grid container>
            <Grid item mt={4} maxWidth={"350px"}>
              <Typography>
                Hier kannst du einen eigenen Random Chat erstellen. Gib deinem
                Chat einen Namen. Wenn du magst, kannst du Themen eintragen,
                über die du gerne sprechen möchtest.
              </Typography>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Random Chat Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="topics"
                    label="Gesprächsthemen"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="Datum"
                      value={value}
                      onChange={(newDate) => {
                        setName(newDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                erstellen
              </Button>
            </Box>
            <Button size="small" variant="text" onClick={handleShowChatInfo}>
              Zurück
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatCreate;
