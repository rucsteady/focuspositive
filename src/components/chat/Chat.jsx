import { Grid } from "@mui/material";

import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";
import RandomChatSearch from "./RandomChatSearch";

function Chat() {
  const { currentUser, randomChats } = useContext(AuthContext);
  const chatUser = currentUser[0].firstname;
  const [isSearchingForChat, setIsSearchingForChat] = useState(false);

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ marginLeft: 14 }}>
        <Grid item>
          {!isSearchingForChat ? (
            <RandomChatInfo setIsSearchingForChat={setIsSearchingForChat} />
          ) : (
            <RandomChatSearch
              randomChats={randomChats}
              setIsSearchingForChat={setIsSearchingForChat}
            />
          )}
        </Grid>
        <Grid item xs={12} md={5} xl={7}>
          {/* <Bar /> */}
          <RandomChat chatUser={chatUser} />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Chat;
