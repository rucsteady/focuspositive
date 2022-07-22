import {
  Button,
  Card,
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
  //

  const randomChatItems = refreshedRandomChats.map((randomChatDto, index) => (
    <ListItem key={index} sx={{ paddingBottom: 0 }}>
      <ListItemButton sx={{ padding: 0 }}>
        {randomChatDto.isOpen && "open"}
        {randomChatDto.isReady && "ready"}
        <Card
          sx={{ minWidth: 250, padding: 1 }}
          className={randomChatDto.isOpen ? "open" : "ready"}
        >
          <Typography sx={{ fontSize: 12 }}>{randomChatDto.topic}</Typography>
          <Typography variant="h6" component="div">
            {randomChatDto.name}
          </Typography>
          <Typography>
            <ListItemText
              primary={`${new Date(randomChatDto.date).getUTCDate()}.${new Date(
                randomChatDto.date
              ).getMonth()}.${new Date(
                randomChatDto.date
              ).getFullYear()} um     
          ${
            new Date(randomChatDto.date).getHours() + (24 % 12) || 12
          }:${new Date(randomChatDto.date).getMinutes()}`}
            />
          </Typography>
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

  return (
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
              <List sx={{ maxHeight: "300px", overflow: "auto", padding: 0 }}>
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
