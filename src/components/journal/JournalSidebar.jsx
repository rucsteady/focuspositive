import {
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";
import React, { Fragment } from "react";

function JournalSidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  return (
    <Fragment>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 300,
            padding: 4,
            marginLeft: 0,
          }}
        >
          <Typography variant="h6">Einträge</Typography>

          <Card>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start" button>
                <ListItemText
                  primary="Titel des Eintrags"
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Textvorschau vom Eintrag der hier steht...
                      </Typography>
                      {" — Zuletzt bearbeitet [date]"}
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
             
            </List>
          </Card>
          <Button onClick={onAddNote}>Neuer Eintrag</Button>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalSidebar;
