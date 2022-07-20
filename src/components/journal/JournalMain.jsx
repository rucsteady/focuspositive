import { Button, Paper, TextField } from "@mui/material";

import { Container } from "@mui/system";
import React, { Fragment, useState } from "react";

function JournalMain() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      console.log(title, details);
    }
  };
  return (
    <Fragment>
      <Container size="sm">
        <Paper sx={{ padding: 4, marginLeft: -4 }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              label="Titel"
              variant="outlined"
              fullWidth
              required
              error={titleError}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              onChange={(e) => setDetails(e.target.value)}
              label="Dein Dankbarkeitstext"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
              error={detailsError}
              sx={{ marginBottom: 2 }}
            />

            <Button type="submit" variant="contained">
              Speichern
            </Button>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalMain;
