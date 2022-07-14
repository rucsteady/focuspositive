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
      user: "Nils",
      message: "Hi",
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

  const sendMessage = () => {
    if (chatUser && message) {
      console.log("send");
    }
  };

  useEffect(() => {
    console.log("Open Socket", room);
    console.log(room);
  }, [room]);

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}
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
