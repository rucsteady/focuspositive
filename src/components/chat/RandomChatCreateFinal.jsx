import { Container, Paper } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

function RandomChatCreateFinal() {
  return (
    <div>
      <Container elevation={0} maxWidth="md">
        <Paper elevation={0} sx={{ padding: 4 }}>
          Vielen Dank für deinen Eintrag in der Random Chat Liste.
          <Navigate to="/chat" replace={true} />
        </Paper>
      </Container>
    </div>
  );
}

export default RandomChatCreateFinal;
