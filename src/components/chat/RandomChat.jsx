import SendIcon from "@mui/icons-material/Send";
import {
  Box,
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
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./RandomChatStyle.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function RandomChat({ chatUser }) {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      user: "",
      message: "",
    },
  ]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleRoom = (event) => {
    event.preventDefault();
    setRoom(event.target.value);
    if (chatUser !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = async () => {
    if (chatUser && message !== "") {
      console.log("send");
      const messageData = { room: room, user: chatUser, message: message };

      await socket.emit("send_message", messageData);
      setChatMessages((list) => [...list, messageData]);
    }
    setMessage("");
  };

  useEffect(() => {
    console.log("Open Socket", room);
  }, [room]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatMessages([
        ...chatMessages,
        {
          user: chatUser,
          message: data.message,
        },
      ]);
    });
  }, [chatMessages]);

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user} ${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Random Chat Topic Generator Placeholder =)
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages" xs={12}>
                  {listChatMessages}
                </List>
              </Grid>
              <Grid xs={4} item>
                <Chip label={`${chatUser}:`} />
              </Grid>
              <Grid xs={3} item>
                <FormControl>
                  <TextField
                    onChange={handleRoom}
                    value={room}
                    label="Room ID"
                    variant="outlined"
                    maxLength={10}
                  />
                </FormControl>
              </Grid>
              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleMessageChange}
                    value={message}
                    label="Nachricht eingeben..."
                    variant="outlined"
                    maxLength={300}
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label="send"
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChat;
