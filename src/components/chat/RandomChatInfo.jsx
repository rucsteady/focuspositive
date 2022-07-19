import { Button, Container, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

function RandomChatInfo() {
  return (
    <Fragment>
      <Container
        sx={{
          minHeight: 300,
          minWidth: "350px",
          marginTop: 4,
          paddingLeft: 4,
        }}
      >
        <Typography variant="h6">Wilkommen beim Random Chat</Typography>
        <Grid container>
          <Grid item mt={4} maxWidth={"350px"}>
            <Typography>
              Lerne Kollegen*innen kennen und verabrede dich für eine Chat Pause
              mit der Random Chat Funktion.
            </Typography>
          </Grid>
          <Grid item mt={4} maxWidth={"350px"}>
            <Button variant="contained">Neuen Random Chat erstellen.</Button>
          </Grid>
          <Grid item mt={4} maxWidth={"350px"}>
            <Button variant="contained">Suche nach einen Random Chat.</Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default RandomChatInfo;
