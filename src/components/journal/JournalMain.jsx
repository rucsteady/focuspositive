import { Button, Card, Paper, TextField } from "@mui/material";

import { Container } from "@mui/system";
import React, { Fragment } from "react";

function JournalMain({ activeEntry, onUpdateEntry }) {
  const onEditField = (field, value) => {
    onUpdateEntry({
      ...activeEntry,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeEntry) return <Card elevation={0}><Paper sx={{padding: 4}}>No Active Entry</Paper></Card>;

  return (
    <Fragment>
      <Container size="sm">
        <Paper sx={{ padding: 4 }}>
          <TextField
            onChange={(e) => onEditField("title", e.target.value)}
            label="Titel"
            variant="outlined"
            fullWidth
            value={activeEntry.title}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            onChange={(e) => onEditField("body", e.target.value)}
            label="Dein Dankbarkeitstext"
            variant="outlined"
            multiline
            rows={12}
            fullWidth
            value={activeEntry.body}
            sx={{ marginBottom: 2 }}
          />

          <Button type="submit" variant="contained">
            Speichern
          </Button>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalMain;
