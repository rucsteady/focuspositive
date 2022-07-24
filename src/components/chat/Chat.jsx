import { Container, Grid, Paper } from '@mui/material';

import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import RandomChat from './RandomChat';
import RandomChatInfo from './RandomChatInfo';
import RandomChatSearch from './RandomChatSearch';
import RandomChatCreate from './RandomChatCreate';

function Chat() {
  const { currentUser } = useContext(AuthContext);
  const [showChatInfo, setShowChatInfo] = useState(true);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showChatNew, setShowChatNew] = useState(false);
  const [showRandomChat, setShowRandomChat] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeRandomChat, setActiveRandomChat] = useState();
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

  return (
    <div>
      <Container elevation={0} maxWidth='md'>
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
                />
              )}

              {showChatSearch && (
                <RandomChatSearch
                  handleShowChatInfo={handleShowChatInfo}
                  setShowRandomChat={setShowRandomChat}
                  setActiveRoom={setActiveRoom}
                  setShowChatSearch={setShowChatSearch}
                  setActiveRandomChat={setActiveRandomChat}
                />
              )}
            </Grid>

            <Grid item xs={12} md={5} xl={7}>
              {showRandomChat && (
                <RandomChat
                  chatUser={chatUser}
                  activeRoom={activeRoom}
                  setShowRandomChat={setShowRandomChat}
                  setShowChatInfo={setShowChatInfo}
                  activeRandomChat={activeRandomChat}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default Chat;
