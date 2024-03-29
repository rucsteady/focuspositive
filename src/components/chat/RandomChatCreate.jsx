import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import React, { Fragment, useEffect, useState } from "react";

function RandomChatCreate({ handleShowChatInfo, user }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [user1, setUser1] = useState("");
  // const [user2, setUser2] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const userMail = user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== "" && topic !== "" && date !== "") {
      const newChat = {
        id: nanoid(),
        name,
        topic,
        user1,
        user2: "",
        date,
        room: nanoid(),
        isOpen: true,
        isReady: false,
      };

      const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("http://localhost:8080/chats", newChat, customConfig)
        .then((response) => {
          setError("");
          setName("");
          setTopic("");
          setDate("");
          // setUser2("");
          navigate("/");
        })
        .catch((err) => setError(err));
    } else {
      setError("Bitte fülle die Felder korrekt aus.");
    }
  };

  useEffect(() => {
    setUser1(userMail);
  }, [userMail, user1]);

  return (
    <Fragment>
      <Typography variant="h6">Erstelle einen neuen Random Chat</Typography>

      <Grid container>
        <Grid item mt={4}>
          <Typography>
            Hier kannst du einen eigenen Random Chat erstellen. Gib deinem Chat
            einen Namen. Wenn du magst, kannst du Themen eintragen, über die du
            gerne sprechen möchtest.
          </Typography>
        </Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  okLabel="Text"
                  clearLabel="Text"
                  cancelLabel="Text"
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
          {error && <p style={{ color: "red", paddingTop: "20px" }}>{error}</p>}
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
            erstellen
          </Button>
        </Box>
      </Grid>

      <Grid item>
        <Button size="small" variant="text" onClick={handleShowChatInfo}>
          Zurück
        </Button>
      </Grid>
    </Fragment>
  );
}

export default RandomChatCreate;
