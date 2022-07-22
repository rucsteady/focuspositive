import { Grid } from "@mui/material";

import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";
import RandomChatSearch from "./RandomChatSearch";
import RandomChatCreate from "./RandomChatCreate";

function Chat() {
  const { currentUser, randomChats } = useContext(AuthContext);
  const chatUser = currentUser[0].firstname;
  const [showChatInfo, setShowChatInfo] = useState(true);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showChatNew, setShowChatNew] = useState(false);

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

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ marginLeft: 14 }}>
        <Grid item>
          {showChatInfo && (
            <RandomChatInfo
              handleShowChatSearch={handleShowChatSearch}
              handleShowChatInfo={handleShowChatInfo}
              handleShowChatNew={handleShowChatNew}
            />
          )}

          {showChatNew && (
            <RandomChatCreate
              handleShowChatSearch={handleShowChatSearch}
              handleShowChatInfo={handleShowChatInfo}
              handleShowChatNew={handleShowChatNew}
            />
          )}

          {showChatSearch && (
            <RandomChatSearch
              randomChats={randomChats}
              handleShowChatSearch={handleShowChatSearch}
              handleShowChatInfo={handleShowChatInfo}
              handleShowChatNew={handleShowChatNew}
            />
          )}
        </Grid>

        <Grid item xs={12} md={5} xl={7}>
    
          <RandomChat chatUser={chatUser} />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Chat;
