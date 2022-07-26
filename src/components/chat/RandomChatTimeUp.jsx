import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function RandomChatTimeUp() {
  return (
    <div>
     
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          <Typography variant="h6" sx={{ margin: 4 }}>
            Danke für deine Teilnahme am Random Chat.
          </Typography>
          <Typography sx={{ margin: 4 }}>
            Die Zeit ist abgelaufen. Der Random Chat ist zu Ende.
          </Typography>
          <NavLink to="/journal" className="link">
            Hier geht's weiter zum Journal.
          </NavLink>
        </Paper>
      </Container>
    </div>
  );
}

export default RandomChatTimeUp;
