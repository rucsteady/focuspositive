import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";

function RandomChatSearch({ randomChats, setIsSearchingForChat }) {
  const date = new Date(randomChats[0].date);

  const randomChatItems = randomChats.map((randomChatDto, index) => (
    <ListItem key={index}>
      <ListItemButton divider>
        <ListItemText
          primary={`${randomChatDto.name + " am "} ${new Date(
            randomChatDto.date
          ).getUTCDate()}.${new Date(
            randomChatDto.date
          ).getMonth()}`}
        />
      </ListItemButton>
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
              <Divider style={{ margin: 10 }} />
              <Button onClick={() => setIsSearchingForChat(false)}>
                Zurück
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatSearch;
