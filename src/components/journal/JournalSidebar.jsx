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
  console.log(sortedNotes);
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
          {sortedNotes.map(({ id, title, body, lastModified, index }, note) => (
            <Card>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                key={index}
              >
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => setActiveNote(id)}
                >
                  <ListItemText
                    primary={`${title}`}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {body && body.substr(0, 40) + "..."}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }}>
                          {" "}
                          Zuletzt bearbeitet{" "}
                          {new Date(lastModified).toLocaleDateString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <IconButton
                            aria-label="delete"
                            onClick={(e) => onDeleteNote(id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItem>
                {/* <Divider component="li" /> */}
              </List>
            </Card>
          ))}

          <Button onClick={onAddNote}>Neuer Eintrag</Button>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalSidebar;
