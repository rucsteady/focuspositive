import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import './RandomChatStyle.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function RandomChat({
  chatUser,
  setShowRandomChat,
  setShowChatInfo,
  activeRoom,
  activeRandomChat,
}) {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const bottomRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (chatUser && message !== '') {
      const messageData = {
        room: room,
        user: chatUser,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      console.log(messageData);
      await socket.emit('send_message', messageData);
      setChatMessages((list) => [...list, messageData]);
      // if (scrollBottomRef.current) {
      //  scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
      // }
    }
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setChatMessages((list) => [...list, data]);
    });
  }, []);

  const handleRoom = (event) => {
    event.preventDefault();
    setRoom(activeRoom);
    if (chatUser !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  useEffect(() => {
    console.log('Open Socket', room);
    setRoom(activeRoom);
    if (room !== '') {
      socket.emit('join_room', room);
    }
  }, [room, activeRoom]);

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user + ':'} ${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  const handleBackToChatSearch = () => {
    setShowRandomChat(false);
    setShowChatInfo(true);
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <Fragment>
      <Container>
        <Paper elevation={0}>
          <Typography
            sx={{ fontSize: '11px', padding: 0, margin: 0, align: 'right' }}
          >
            Chatroom: {room}
          </Typography>
          <Box p={3}>
            <Typography variant='h6' gutterBottom>
              Verbunden: {activeRandomChat.name} von {activeRandomChat.user1}{' '}
              mit {activeRandomChat.user2}
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems='center'>
              <Grid id='chat-window' xs={12} item>
                <List id='chat-window-messages' xs={12}>
                  {listChatMessages}
                  <ListItem />
                  <div ref={bottomRef} />
                </List>
              </Grid>

              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleMessageChange}
                    value={message}
                    label='Nachricht eingeben...'
                    variant='outlined'
                    maxLength={300}
                    onKeyPress={(event) => {
                      event.key === 'Enter' && sendMessage();
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label='send'
                  color='primary'
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              size='small'
              variant='text'
              onClick={handleBackToChatSearch}
              sx={{ marginTop: 2, boxShadow: 0 }}
            >
              Schließen
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChat;
