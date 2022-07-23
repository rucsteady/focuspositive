import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import axi from 'axios';
import './RandomChatSearchStyle.css';

function RandomChatSearch({
  handleShowChatInfo,
  setShowRandomChat,
  setActiveRoom,
}) {
  const [refreshedRandomChats, setRefreshedRandomChats] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const randomChatItems = refreshedRandomChats.map((randomChatDto, index) => (
    <ListItem key={index} sx={{ paddingBottom: 0 }}>
      <ListItemButton sx={{ padding: 0 }}>
        <Card
          sx={{
            padding: '4px',
            minWidth: '300px',
            backgroundColor: '#1565C0',
            color: 'white',
          }}
          className={randomChatDto.isOpen ? 'open' : 'ready'}
          onClick={() => {
            if (randomChatDto.isReady) {
              console.log('is ready', randomChatDto);
              handleOpen();
              setActiveRoom(randomChatDto.room);
            } else if (randomChatDto.isOpen) {
              console.log('is open', randomChatDto);
              handleRegisterRandomChat();
            }
          }}
        >
          <Typography sx={{ fontSize: 12 }}>
            {randomChatDto.topic} von {randomChatDto.user1}
          </Typography>

          <Typography variant='h6'>{randomChatDto.name}</Typography>
          <Typography component={'span'}>
            <ListItemText
              primary={`${new Date(randomChatDto.date).getUTCDate()}.${new Date(
                randomChatDto.date
              ).getMonth()}.${new Date(
                randomChatDto.date
              ).getFullYear()} um     
          ${new Date(randomChatDto.date).getHours()}:${new Date(
                randomChatDto.date
              ).getMinutes()}`}
            />
          </Typography>
          {randomChatDto.isReady && (
            <Typography
              sx={{
                borderRadius: '15px',
                paddingLeft: '6px',
                paddingRight: '6px',
                fontSize: '12px',
                backgroundColor: 'white',
                color: 'black',
                float: 'right',
              }}
            >
              Startklar! - jetzt los chatten - hier klicken
            </Typography>
          )}
          {randomChatDto.isOpen && (
            <Typography
              sx={{
                borderRadius: '15px',
                paddingLeft: '6px',
                paddingRight: '6px',
                fontSize: '12px',
                backgroundColor: '#FF6347',
                color: 'white',
                float: 'right',
              }}
            >
              Offen - jetzt registrieren
            </Typography>
          )}
        </Card>
      </ListItemButton>
    </ListItem>
  ));

  // TODO On Click Item
  useEffect(() => {
    axi
      .get('http://localhost:8080/api/chats')
      .then((response) => setRefreshedRandomChats(response.data.chats));
  }, []);

  const handleStartRandomChat = () => {
    setShowRandomChat(true);
    setOpen(false);
  };

  const handleStopRandomChat = () => {
    setShowRandomChat(false);
    setOpen(false);
  };

  const handleRegisterRandomChat = () => {
    return console.log('handle register');
  };

  return !refreshedRandomChats ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <Fragment>
      <Paper
        elevation={0}
        sx={{
          width: 400,
          padding: 4,
          marginLeft: 3,
        }}
      >
        <Typography variant='h6'>Suche nach einem Random Chat</Typography>

        <Grid container>
          <Grid item mt={2} maxWidth={'350px'}>
            <Typography mb={2}>
              Hier findest du eine Liste von Random Chats, die bereits erstellt
              worden sind.
            </Typography>

            <Card elevation={0}>
              <List sx={{ maxHeight: '500px', overflow: 'auto', padding: 0 }}>
                {randomChatItems}
              </List>
            </Card>

            <Button
              size='small'
              variant='text'
              onClick={handleShowChatInfo}
              sx={{ marginTop: 2 }}
            >
              Zurück
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',

            p: 4,
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ paddingBottom: 2 }}
          >
            Random Chat Starten?
          </Typography>
          <Button variant='contained' onClick={handleStartRandomChat}>
            Starten
          </Button>
          <Button onClick={handleStopRandomChat}>Abbrechen</Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default RandomChatSearch;
