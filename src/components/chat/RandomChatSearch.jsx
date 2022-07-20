import {
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext } from "react";

function RandomChatSearch({ randomChats }) {
  const randomChatItems = randomChats.map((randomChatDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${randomChatDto.user1 + ":"} ${randomChatDto.date}`}
      />
    </ListItem>
  ));

  // TODO On Click Item 

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
          <Typography variant="h6">Suche nach einem Random Chat</Typography>

          <Grid container>
            <Grid item mt={4} maxWidth={"350px"}>
              <Typography>
                Hier findest du eine Liste von Random Chat, die bereits erstellt
                worden sind. Grüne Random Chats sind noch verfügbar. Blaue
                Random Chats hast du bereits zugesagt.
              </Typography>
              <Divider style={{ margin: 10 }} />

              <Card elevation={0}>
                <List>{randomChatItems}</List>
              </Card>

              <Divider style={{ margin: 10 }} />
              <Card elevation={0}>
                <Typography>
                  Aktuell hast du keine aktiven Random Chats
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatSearch;
