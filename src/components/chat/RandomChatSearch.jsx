import {
  Button,
  Card,  
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";


function RandomChatSearch({
  randomChats,
  handleShowChatSearch,
  handleShowChatInfo,
  handleShowChatNew,
}) {
  const randomChatItems = randomChats.map((randomChatDto, index) => (
    <ListItem key={index}>
      <ListItemButton divider selected>
        <ListSubheader
          disableSticky
          disableGutters
          sx={{ marginRight: 1, fontSize: 16, color: "#000" }}
        >
          {randomChatDto.name}:
        </ListSubheader>
        <ListItemText
          sx={{ fontSize: 12, color: "#000" }}
          primary={`${new Date(randomChatDto.date).getUTCDate()}.${new Date(
            randomChatDto.date
          ).getMonth()}.${new Date(randomChatDto.date).getFullYear()} um     

          ${new Date(randomChatDto.date).getHours()}:${new Date(
            randomChatDto.date
          ).getMinutes()}`}
        />
      </ListItemButton>
    </ListItem>
  ));

  // TODO On Click Item

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
            {/* <Divider style={{ margin: 10 }} /> */}

            <Card elevation={0}>
              <List>{randomChatItems}</List>
            </Card>

            {/* <Divider style={{ margin: 10 }} /> */}
            {/* <Card elevation={0}>
                <Typography>
                  Aktuell hast du keine aktiven Random Chats
                </Typography>
              </Card> */}
           
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
