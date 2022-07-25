import { Card, Paper, TextField, Typography } from "@mui/material";

import React from "react";

function JournalMain({ activeEntry, onUpdateEntry }) {
  const onEditField = (field, value) => {
    onUpdateEntry({
      ...activeEntry,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeEntry)
    return (
      <Card elevation={0}>
        <Paper sx={{ padding: 4, maxWidth: 350 }}>
          Willkommen beim Journal. Aktuell hast du keine offenen Einträge.
          Bearbeite einen alten Beitrag oder erstelle einen neuen.
        </Paper>
      </Card>
    );

  return (
    <div>
      <Paper sx={{ padding: 4, maxWidth: 350 }}>
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
        <Typography fullWidth sx={{ marginBottom: 2 }}>         
          Drei Positive Dinge des Tages
        </Typography>
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

        {/* <Button type='submit' variant='contained' sx={{ boxShadow: 0 }}>
            Speichern
          </Button> */}
      </Paper>
    </div>
  );
}

export default JournalMain;
