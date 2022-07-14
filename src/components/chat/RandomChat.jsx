import SendIcon from "@mui/icons-material/Send";
import {
  Box,
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
import React, { Fragment, useState } from "react";
import "./RandomChatStyle.css";

function RandomChat({ chatUser }) {
  const [chatMessages, setChatMessages] = useState([
    {
      user: "Nils",
      message: "Hi",
    },
  ]);

  const [message, setMessage] = useState("");

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
              Happy Chatting!
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages" xs={12}>
                  {listChatMessages}
                </List>
              </Grid>
              <Grid xs={4} item>
                <FormControl fullWidth>
                  <TextField value={chatUser} label="Name" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField
                    value={message}
                    label="Nachricht eingeben..."
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton aria-label="send" collor="primary">
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
