import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { nanoid } from "nanoid";
import React, { Fragment, useEffect, useState } from "react";
import JournalMain from "./JournalMain";
import JournalSidebar from "./JournalSidebar";

function Journal() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: nanoid(),
      title: "Eintrag ohne Titel",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <Fragment>
      <Container fixed back>
        <Grid container spacing={2}>
          <Grid item>
            <JournalSidebar
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          </Grid>
          <Grid item>
            <JournalMain
              activeNote={getActiveNote()}
              onUpdateNote={onUpdateNote}
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Journal;
