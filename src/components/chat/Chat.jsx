import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";
import RandomChatSearch from "./RandomChatSearch";

function Chat() {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser:", currentUser[0].firstname);
  const chatUser = currentUser[0].firstname;
  const [isSearchingForChat, setIsSearchingForChat] = useState(false);

  return (
    <Fragment>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item >
            {!isSearchingForChat ? (
              <RandomChatInfo setIsSearchingForChat={setIsSearchingForChat} />
            ) : (
              <RandomChatSearch />
            )}
          </Grid>
          <Grid item md={5} xl={7}>
            
              {/* <Bar /> */}
              <RandomChat chatUser={chatUser} />
           
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Chat;
