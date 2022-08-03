import { Button, Card, Paper, TextField } from "@mui/material";

import React from "react";

function JournalMain({ activeJournal, onUpdateJournal,handleSaveJournal }) {
  const onEditField = (field, value) => {
    onUpdateJournal({
      ...activeJournal,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeJournal)
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
          value={activeJournal.title}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          onChange={(e) => onEditField("body", e.target.value)}
          label="Dein Dankbarkeitstext"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={activeJournal.body}
          sx={{ marginBottom: 2 }}
        />
        <div style={{ marginBottom: 12, marginTop: 10 }}>
          Drei Positive Dinge des Tages
        </div>
        <TextField
          onChange={(e) => onEditField("one", e.target.value)}
          label="Erster Eintrag"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          value={activeJournal.one}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          onChange={(e) => onEditField("two", e.target.value)}
          label="Zweiter Eintrag"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          value={activeJournal.two}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          onChange={(e) => onEditField("three", e.target.value)}
          label="Dritter Eintrag"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          value={activeJournal.three}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ boxShadow: 0 }} onClick={handleSaveJournal}>
          Speichern
        </Button>       
      </Paper>
    </div>
  );
}

export default JournalMain;
