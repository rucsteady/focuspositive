import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import RandomChat from "./RandomChat";
import RandomChatInfo from "./RandomChatInfo";

function Chat() {
  const { currentUser } = useContext(AuthContext);

  console.log("currentUser:", currentUser[0].firstname);

  const chatUser = currentUser[0].firstname;

  return (
    <Fragment>
      <Container fixed>
        <Grid container spacing={0.5}>
          <Grid item >
            <RandomChatInfo />
          </Grid>
          <Grid item xs={6}>
            <Container sx={{ width: 500, marginTop:"20px" }}>
              {/* <Bar /> */}
              <RandomChat chatUser={chatUser} />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Chat;
