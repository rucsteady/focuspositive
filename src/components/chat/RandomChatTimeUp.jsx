import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";

function RandomChatTimeUp() {
  return (
    <div>
      {" "}
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          <Typography variant="h6">
            Danke für deine Teilnahme am Random Chat.
          </Typography>
          <Typography>
            Die Zeit ist abgelaufen. Der Random Chat ist zu Ende.
          </Typography>
          
        </Paper>
      </Container>
    </div>
  );
}

export default RandomChatTimeUp;
