import { Input, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment } from "react";

function JournalMain() {
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
          <Input id="title" placeholder="Titel" fullWidth>
            Main
          </Input>

          <Input
            id="body"
            placeholder="Beginne hier mit deinem Eintrag..."
            fullWidth
          ></Input>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalMain;
