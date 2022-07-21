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
import AuthContext from "../../context/AuthContext";
import axi from "axios";

import React, { Fragment, useContext, useEffect, useState } from "react";

function RandomChatCreate({
  handleShowChatSearch,
  handleShowChatInfo,
  handleShowChatNew,
}) {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [date, setDate] = useState(null);
  const [room, setRoom] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axi
      .post("http://localhost:8080/api/chats", {
        name,
        topic,
        user1,
        user2,
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
        setTopic("");
        setDate("");
        setRoom("");
        setIsOpen(false);
        setIsReady(false);
        navigate("/");
      })
      .catch((error) => setError(error.response.data.message));
  };

  useEffect((currentUser) => {
    setUser1(currentUser);
    console.log("user1", user1);
  }, []);

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
                    autoFocus
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="topic"
                    label="Gesprächsthemen"
                    id="topic"
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="Datum"
                      value={date}
                      onChange={(newDate) => {
                        setDate(newDate);
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
