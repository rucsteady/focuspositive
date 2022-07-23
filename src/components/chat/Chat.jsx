import { Grid } from "@mui/material";

import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";
import RandomChatSearch from "./RandomChatSearch";
import RandomChatCreate from "./RandomChatCreate";

function Chat() {
  const { currentUser } = useContext(AuthContext);
  const [showChatInfo, setShowChatInfo] = useState(true);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showChatNew, setShowChatNew] = useState(false);
  const [showRandomChat, setShowRandomChat] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const chatUser = currentUser[0].firstname;

  const handleShowChatInfo = () => {
    setShowChatNew(false);
    setShowChatSearch(false);
    setShowChatInfo(true);
  };

  const handleShowChatSearch = () => {
    setShowChatInfo(false);
    setShowChatNew(false);
    setShowChatSearch(true);
  };

  const handleShowChatNew = () => {
    setShowChatInfo(false);
    setShowChatSearch(false);
    setShowChatNew(true);
  };

  console.log(activeRoom);

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ marginLeft: 14 }}>
        <Grid item>
          {showChatInfo && (
            <RandomChatInfo
              handleShowChatSearch={handleShowChatSearch}
              handleShowChatNew={handleShowChatNew}
            />
          )}

          {showChatNew && (
            <RandomChatCreate
              handleShowChatSearch={handleShowChatSearch}
              handleShowChatInfo={handleShowChatInfo}
            />
          )}

          {showChatSearch && (
            <RandomChatSearch
              handleShowChatInfo={handleShowChatInfo}
              setShowRandomChat={setShowRandomChat}
              setActiveRoom={setActiveRoom}
            />
          )}
        </Grid>

        <Grid item xs={12} md={5} xl={7}>
          {showRandomChat && (
            <RandomChat
              chatUser={chatUser}
              activeRoom={activeRoom}
              setShowRandomChat={setShowRandomChat}
            />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Chat;
