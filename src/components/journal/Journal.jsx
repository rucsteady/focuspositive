import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment } from "react";
import JournalMain from "./JournalMain";
import JournalSidebar from "./JournalSidebar";

function Journal() {
  return (
    <Fragment>
      <Container fixed back>
        <Grid container spacing={2}>
          <Grid item>
            <JournalSidebar />
          </Grid>
          <Grid item>
            <JournalMain />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Journal;
