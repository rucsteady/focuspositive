import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";

function RandomChatInfo({ handleShowChatSearch, handleShowChatNew }) {
  return (
    <Fragment>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 400,
            padding: 4,
          }}
        >
          <Typography variant="h6">Wilkommen beim Random Chat</Typography>
          <Grid container>
            <Grid item mt={4} maxWidth={"350px"}>
              <Typography>
                Lerne Kollegen*innen kennen und verabrede dich für eine Chat
                Pause mit der Random Chat Funktion.
              </Typography>
              <Typography>
                Beim Random Chat wirst du mit einer zufälligen Kollegin oder
                Kollegen verbunden. Wenn der Chat startet, habt ihr 15 Minuten
                Zeit ein bisschen zu plaudern.
              </Typography>
            </Grid>
            <Grid item mt={4} maxWidth={"350px"}>
              <Button onClick={handleShowChatNew} variant="contained">
                Neuen Random Chat erstellen.
              </Button>
            </Grid>
            <Grid item mt={4} maxWidth={"350px"}>
              <Button onClick={handleShowChatSearch} variant="contained">
                Suche nach einen Random Chat.
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatInfo;
