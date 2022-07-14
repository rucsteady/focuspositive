import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { ChatMessageDto } from "./ChatMessageDto";

function RandomChat() {
  const [chatMessages, setChatMessages] = useState([
    {
      user: "John",
      message: "Hi",
    },
  ]);

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
              <Grid item>
                <List>{listChatMessages}</List>
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChat;
