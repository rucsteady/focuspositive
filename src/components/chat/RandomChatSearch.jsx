import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import axi from "axios";

function RandomChatSearch({
  randomChats,
  handleShowChatSearch,
  handleShowChatInfo,
  handleShowChatNew,
}) {
  const [refreshedRandomChats, setRefreshedRandomChats] = useState([]);

  const randomChatItems = refreshedRandomChats.map((randomChatDto, index) => (
    <ListItem key={index} sx={{ paddingBottom: 0 }}>
      <ListItemButton sx={{ padding: 0 }}>
        <Card sx={{ minWidth: 250, padding: 0 }}>
          <CardContent>
            <Typography sx={{ fontSize: 12 }}>{randomChatDto.topic}</Typography>
            <Typography variant="h6" component="div">
              {randomChatDto.name}
            </Typography>
            <Typography>
              <ListItemText
                sx={{ fontSize: 10, color: "#000", paddingBottom: 0 }}
                primary={`${new Date(
                  randomChatDto.date
                ).getUTCDate()}.${new Date(
                  randomChatDto.date
                ).getMonth()}.${new Date(
                  randomChatDto.date
                ).getFullYear()} um     

          ${new Date(randomChatDto.date).getHours()}:${new Date(
                  randomChatDto.date
                ).getMinutes()}`}
              />
            </Typography>
          </CardContent>
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
          width: 350,
          padding: 4,
          marginLeft: 3,
        }}
      >
        <Typography variant="h6">Suche nach einem Random Chat</Typography>

        <Grid container>
          <Grid item mt={4} maxWidth={"350px"}>
            <Typography>
              Hier findest du eine Liste von Random Chat, die bereits erstellt
              worden sind. Grüne Random Chats sind noch verfügbar. Blaue Random
              Chats hast du bereits zugesagt.
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
