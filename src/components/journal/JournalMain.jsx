import { Button, TextField } from "@mui/material";

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
      <Container size="sm" >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />

          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </form>
      </Container>
    </Fragment>
  );
}

export default JournalMain;
