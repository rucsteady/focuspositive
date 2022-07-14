import { Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChatIcon from "@mui/icons-material/Chat";

function Bar() {
  return (
    <Fragment>
      <Box mb={4}>
        <AppBar position="static">
          <Toolbar>
            <Box mr={2}>
              <ChatIcon fontSize={"large"} />
            </Box>
            <Typography variant="h6">Chat</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
}

export default Bar;
