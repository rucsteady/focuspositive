import { Container, Typography } from "@mui/material";
import React, { Fragment } from "react";

function RandomChatInfo() {
  return (
    <Fragment>
      <Container
        sx={{
          height: 500,
          marginTop: 4,
        }}
      >
        <Typography variant="h6">Wilkommen beim Random Chat</Typography>
      </Container>
    </Fragment>
  );
}

export default RandomChatInfo;
