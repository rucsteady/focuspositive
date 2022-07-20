import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";

function RandomChatInfo({ setIsSearchingForChat }) {
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
          <Typography variant="h6">Wilkommen beim Random Chat</Typography>

          <Grid container>
            <Grid item mt={4} maxWidth={"350px"}>
              <Typography>
                Lerne Kollegen*innen kennen und verabrede dich für eine Chat
                Pause mit der Random Chat Funktion.
              </Typography>
            </Grid>
            <Grid item mt={4} maxWidth={"350px"}>
              <Button variant="contained">Neuen Random Chat erstellen.</Button>
            </Grid>
            <Grid item mt={4} maxWidth={"350px"}>
              <Button onClick={setIsSearchingForChat} variant="contained">
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
