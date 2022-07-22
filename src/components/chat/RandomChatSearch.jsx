import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import axi from "axios";
import "./RandomChatSearchStyle.css";

function RandomChatSearch({ handleShowChatInfo }) {
  const [refreshedRandomChats, setRefreshedRandomChats] = useState([]);

  // TODO is joinable
  // edit able eigener chat oder gejoined

  // user1 user2 start chat socket io
  // randomChatDto wird übergeben an funktion
  // wenn ready?? wenn open ist nicht ready
  // state für chat fenster aus Chat übergeben, wird dann geöffnet und übergeben

  const randomChatItems = refreshedRandomChats.map((randomChatDto, index) => (
    <ListItem key={index} sx={{ paddingBottom: 0 }}>
      <ListItemButton sx={{ padding: 0 }}>
        <Card
          sx={{
            padding: "4px",
            minWidth: "300px",
            backgroundColor: "#1565C0",
            color: "white",
          }}
          className={randomChatDto.isOpen ? "open" : "ready"}
          onClick={() => {
            if (randomChatDto.isReady) {
              console.log("is ready", randomChatDto);
            } else if (randomChatDto.isOpen) {
              console.log("is open", randomChatDto);
            }
          }}
        >
          <Typography sx={{ fontSize: 12 }}>
            {randomChatDto.topic}
            {randomChatDto.user1}
          </Typography>

          <Typography variant="h6">{randomChatDto.name}</Typography>
          <Typography component={"span"}>
            <ListItemText
              primary={`${new Date(randomChatDto.date).getUTCDate()}.${new Date(
                randomChatDto.date
              ).getMonth()}.${new Date(
                randomChatDto.date
              ).getFullYear()} um     
          ${new Date(randomChatDto.date).getHours()}:${new Date(
                randomChatDto.date
              ).getMinutes()}`}
            />
          </Typography>
          {randomChatDto.isReady && (
            <Typography
              sx={{ backgroundColor: "white", color: "black", float: "right" }}
            >
              Startklar - jetzt los chatten - hier klicken
            </Typography>
          )}
          {randomChatDto.isOpen && (
            <Typography
              sx={{
                backgroundColor: "#EE7702",
                color: "white",
                float: "right",
              }}
            >
              Offen - jetzt registrieren
            </Typography>
          )}
        </Card>
      </ListItemButton>
    </ListItem>
  ));

  // TODO On Click Item
  useEffect(() => {
    axi
      .get("http://localhost:8080/api/chats")
      .then((response) => setRefreshedRandomChats(response.data.chats));
  }, []);

  return !refreshedRandomChats ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <Fragment>
      <Paper
        elevation={0}
        sx={{
          width: 400,
          padding: 4,
          marginLeft: 3,
        }}
      >
        <Typography variant="h6">Suche nach einem Random Chat</Typography>

        <Grid container>
          <Grid item mt={2} maxWidth={"350px"}>
            <Typography mb={2}>
              Hier findest du eine Liste von Random Chat, die bereits erstellt
              worden sind.
            </Typography>

            <Card elevation={0}>
              <List sx={{ maxHeight: "500px", overflow: "auto", padding: 0 }}>
                {randomChatItems}
              </List>
            </Card>

            <Button
              size="small"
              variant="text"
              onClick={handleShowChatInfo}
              sx={{ marginTop: 2 }}
            >
              Zurück
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}

export default RandomChatSearch;
