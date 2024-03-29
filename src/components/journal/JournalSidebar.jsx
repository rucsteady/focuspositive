import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";
import React from "react";
import { nanoid } from "nanoid";

function JournalSidebar({
  journals,
  createJournal,
  onDeleteJournal,
  setActiveJournal,
}) {
  const sortedJournals = journals.sort(
    (a, b) => b.lastModified - a.lastModified
  );

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
          <Typography variant="h6" sx={{ marginBottom: 2 }} component={"div"}>
            Einträge
          </Typography>
          {sortedJournals.map(({ id, title, body, lastModified }) => (
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
                  onClick={() => setActiveJournal(id)}
                  key={nanoid()}
                >
                  <div>
                    <Typography sx={{ display: "block" }} component={"span"}>
                      {title && title.substr(0, 25)}
                    </Typography>
                    <Typography
                      sx={{ display: "inline", fontSize: 12 }}
                      component={"span"}
                    >
                      {body && body.substr(0, 20) + "..."}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} component={"div"}>
                      {" "}
                      Zuletzt bearbeitet{" "}
                      {new Date(lastModified).toLocaleDateString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <IconButton
                        aria-label="delete"
                        edge={"end"}
                        onClick={(e) => onDeleteJournal(id)}
                      >
                        <DeleteIcon fontSize={"small"} />
                      </IconButton>
                    </Typography>
                  </div>
                </ListItem>
                {/* <Divider component="li" /> */}
              </List>
            </Card>
          ))}
          <Card sx={{ marginTop: 1, boxShadow: 0 }}>
            <Button
              variant="contained"
              sx={{ marginTop: 3, boxShadow: 0 }}
              onClick={createJournal}
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
