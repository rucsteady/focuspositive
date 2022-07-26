import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";
import React from "react";
import { nanoid } from "nanoid";

function JournalSidebar({ entrys, onAddEntry, onDeleteEntry, setActiveEntry }) {
  const sortedEntrys = entrys.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 220,
            padding: 4,
            marginLeft: 0,
            marginBottom: 4,
            maxHeight: 340,
          }}
          variant={"menu"}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }} ccomponent="span">
            Einträge
          </Typography>
          {sortedEntrys.map(({ id, title, body, lastModified }) => (
            <Card sx={{ marginBottom: 1 }} key={nanoid()}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "#fff",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                key={nanoid()}
              >
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => setActiveEntry(id)}
                  key={nanoid()}
                >
                  <ListItemText
                    primary={`${title}`}
                    secondary={
                      <div>
                        <Typography sx={{ display: "inline" }} component="span">
                          {body && body.substr(0, 40) + "..."}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }} component="span">
                          {" "}
                          Zuletzt bearbeitet{" "}
                          {new Date(lastModified).toLocaleDateString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <IconButton
                            aria-label="delete"
                            edge={"end"}
                            onClick={(e) => onDeleteEntry(id)}
                            component="span"
                          >
                            <DeleteIcon fontSize={"small"}  />
                          </IconButton>
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
                {/* <Divider component="li" /> */}
              </List>
            </Card>
          ))}
          <Card sx={{ marginTop: 1, boxShadow: 0 }}>
            <Button
              variant="contained"
              sx={{ marginTop: 3, boxShadow: 0 }}
              onClick={onAddEntry}
            >
              Neuer Eintrag
            </Button>
          </Card>
        </Paper>
      </Container>
    </div>
  );
}

export default JournalSidebar;
