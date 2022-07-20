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
import React, { Fragment, useEffect, useState, useRef } from "react";
import "./RandomChatStyle.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function RandomChat({ chatUser }) {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const scrollBottomRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (chatUser && message !== "") {
      const messageData = {
        room: room,
        user: chatUser,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      console.log(messageData);
      await socket.emit("send_message", messageData);
      setChatMessages((list) => [...list, messageData]);
      // if (scrollBottomRef.current) {
      //   scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
      // }
    }
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setChatMessages((list) => [...list, data]);
    });
  }, []);

  const handleRoom = (event) => {
    event.preventDefault();
    setRoom(event.target.value);
    if (chatUser !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    console.log("Open Socket", room);
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }, [room]);

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user + ":"} ${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  return (
    <Fragment>
      <Container>
        
        <Paper elevation={0}>
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Coffee Chat von {chatUser}
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages" xs={12}>
                  {listChatMessages}
                  <ListItem ref={scrollBottomRef} />
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
                    onKeyPress={(event) => {
                      event.key === "Enter" && sendMessage();
                    }}
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
