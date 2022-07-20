import { Button, Paper, TextField } from "@mui/material";

import { Container } from "@mui/system";
import React, { Fragment, useState } from "react";

function JournalMain({ activeNote, onUpdateNote }) {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <Fragment>
      <Container size="sm">
        <Paper sx={{ padding: 4 }}>
          <TextField
            onChange={(e) => onEditField("title", e.target.value)}
            label="Titel"
            variant="outlined"
            fullWidth
            value={activeNote.title}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            onChange={(e) => onEditField("body", e.target.value)}
            label="Dein Dankbarkeitstext"
            variant="outlined"
            multiline
            rows={12}
            fullWidth
            value={activeNote.body}
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
