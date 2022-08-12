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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./RandomChatSearchStyle.css";

function RandomChatSearch({
  handleShowChatInfo,
  setShowRandomChat,
  setActiveRoom,
  setShowChatSearch,
  setActiveRandomChat,
  randomChats,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      await axios
        .get("https://fpjsonserver.herokuapp.com/chats")
        .then(({ data }) => setChats(data));
    };

    getChats();
  }, [randomChats]);

  console.log(chats);

  const randomChatItems = chats.map((randomChatDto, index) => (
    <ListItem key={index} sx={{ paddingBottom: 0 }}>
      <ListItemButton sx={{ padding: 0 }}>
        <Card
          sx={{
            padding: 2,
            minWidth: "400px",
            backgroundColor: "#1565C0",
            color: "white",
          }}
          className={randomChatDto.isOpen ? "open" : "ready"}
          onClick={() => {
            if (randomChatDto.isReady) {
              handleOpen();
              setActiveRoom(randomChatDto.room);
              setActiveRandomChat(randomChatDto);
            } else if (randomChatDto.isOpen) {
              handleRegisterRandomChat();
            }
          }}
        >
          <Typography sx={{ fontSize: 12 }}>
            {randomChatDto.topic} von {randomChatDto.user1}
          </Typography>

          <Typography variant="h6">{randomChatDto.name}</Typography>
          <Typography component={"span"}>
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
                borderRadius: "15px",
                paddingLeft: "6px",
                paddingRight: "6px",
                fontSize: "12px",
                backgroundColor: "white",
                color: "black",
                float: "right",
              }}
            >
              Startklar! - jetzt los chatten - hier klicken
            </Typography>
          )}
          {randomChatDto.isOpen && (
            <Typography
              sx={{
                borderRadius: "15px",
                paddingLeft: "6px",
                paddingRight: "6px",
                fontSize: "12px",
                backgroundColor: "#FF6347",
                color: "white",
                float: "right",
              }}
            >
              Offen - jetzt registrieren
            </Typography>
          )}
        </Card>
      </ListItemButton>
    </ListItem>
  ));

  const handleStartRandomChat = () => {
    setShowChatSearch(false);
    setShowRandomChat(true);
    setOpen(false);
  };

  const handleStopRandomChat = () => {
    setShowRandomChat(false);
    setOpen(false);
  };

  const handleRegisterRandomChat = () => {
    return console.log("handle register");
  };

  return !randomChats ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div>
      <Typography variant="h6">Suche nach einem Random Chat</Typography>

      <Grid container>
        <Grid item mt={2}>
          <Typography mb={2}>
            Hier findest du eine Liste von Random Chats, die bereits erstellt
            worden sind.
          </Typography>

          <Card elevation={0}>
            <List sx={{ maxHeight: "400px", overflow: "auto", padding: 0 }}>
              {randomChatItems}
            </List>
          </Card>

          <Button
            size="small"
            variant="text"
            onClick={handleShowChatInfo}
            sx={{ marginTop: 2, boxShadow: 0 }}
          >
            Zurück
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",

            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ paddingBottom: 2 }}
          >
            Random Chat Starten?
          </Typography>
          <Button variant="contained" onClick={handleStartRandomChat}>
            Starten
          </Button>
          <Button onClick={handleStopRandomChat} sx={{ boxShadow: 0 }}>
            Abbrechen
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default RandomChatSearch;
