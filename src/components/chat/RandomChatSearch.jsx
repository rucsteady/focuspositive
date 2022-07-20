import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";

function RandomChatSearch() {
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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatSearch;
