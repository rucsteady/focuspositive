import { Container, Grid, Paper } from "@mui/material";

import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";
import RandomChatSearch from "./RandomChatSearch";
import RandomChatCreate from "./RandomChatCreate";
import axios from "axios";

function Chat({ MemoCountdown, users }) {
  const { currentUser, randomChats, currentEmail } = useContext(AuthContext);
  const [showChatInfo, setShowChatInfo] = useState(true);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showChatNew, setShowChatNew] = useState(false);
  const [showRandomChat, setShowRandomChat] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeRandomChat, setActiveRandomChat] = useState();
  const [chatUser, setChatUser] = useState({});
  const [user, setUser] = useState("");

  const userId = users
    .filter((user) => user.email === currentEmail)
    .map((user) => user.id)
    .toString();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`http://localhost:8080/users/${userId}`)
        .then(({ data }) => setUser(data));
    };
    getUser();
  }, [userId]);

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

  const chatUserObj = useCallback(() => {
    setChatUser(user.firstname);
  }, [user]);

  useEffect(() => {
    chatUserObj();
  }, [chatUserObj, currentUser]);

  return (
    <div>
      {user ? (
        <Container elevation={0} maxWidth="md">
          <Paper elevation={0} sx={{ padding: 4 }}>
            <Grid>
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
                    user={user}
                  />
                )}

                {showChatSearch && (
                  <RandomChatSearch
                    handleShowChatInfo={handleShowChatInfo}
                    setShowRandomChat={setShowRandomChat}
                    setActiveRoom={setActiveRoom}
                    setShowChatSearch={setShowChatSearch}
                    setActiveRandomChat={setActiveRandomChat}
                    randomChats={randomChats}
                    user={user}
                  />
                )}
              </Grid>

              <Grid item xs={12} md={5} xl={7}>
                {showRandomChat && (
                  <RandomChat
                    users={users}
                    chatUser={chatUser}
                    activeRoom={activeRoom}
                    setShowRandomChat={setShowRandomChat}
                    setShowChatInfo={setShowChatInfo}
                    activeRandomChat={activeRandomChat}
                    MemoCountdown={MemoCountdown}
                    user={user}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Chat;
