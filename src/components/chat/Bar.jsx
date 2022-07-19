import { Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Bar() {
  return (
    <Fragment>
      <Box mb={4}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Chat</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
}

export default Bar;
