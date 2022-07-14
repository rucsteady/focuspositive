import { Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Bar from "./Bar";
import RandomChat from "./RandomChat";

function Chat() {
  const {  currentUser } = useContext(AuthContext);

  console.log("currentUser:", currentUser[0].firstname);

  const chatUser = currentUser[0].firstname;

  return (
    <Fragment>
      <Toolbar>
        <Box mr={2}>
          <Typography variant="h6">
          Random Chat von {chatUser}
          </Typography>
        </Box>
      </Toolbar>

      <Bar />
      <RandomChat chatUser={chatUser}/>
    </Fragment>
  );
}

export default Chat;
