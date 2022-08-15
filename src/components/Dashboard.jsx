import React, { useContext, useEffect, useState } from "react";
import "./DashboardStyle.css";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import axios from "axios";

function Dashboard() {
  const { userLoggedIn, users, currentEmail } = useContext(AuthContext);
  const [user, setUser] = useState("");

  const userId = users
    .filter((user) => user.email === currentEmail)
    .map((user) => user.id)
    .toString();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`http://localhost:8080/users/${userId}`)
        .then(({ data }) => setUser(data));
    };
    getUser();
  }, [userId]);

  return (
    <div className="dashboard">
      <div className="bg">
        <Container elevation={0} maxWidth="md">
          <Paper elevation={0} sx={{ padding: 4 }}>
            <Typography variant="h6">
              Herzlich Willkommen{` `}
              {user.firstname}!
              <br />
              <br />
            </Typography>
            <Typography>
              Dieser Prototyp ist ein Teil der Bachelorarbeit: Der User Centered
              Design Prozess am Beispiel der Entwicklung einer Webanwendung zur
              Verbesserung des mentalen Wohlbefindens im mobilen
              Unternehmenskontext.
            </Typography>
            <br />
            <Typography>
              Dieser Prototyp beinhaltet einen Chat und eine Journal Komponente.
              Der Chat hat eine Random Chat Funktion. Du kannst dich mit einem
              zufälligen Kollegen zu einem Chat verabreden. Im Journals Bereich,
              kannst du das Dankbarkeitstagebuch und den 3-Positive-Dinge
              Eintrag verwenden.
            </Typography>
            <br />
            <Box className="link" elevation={0} sx={{ marginTop: 2 }}>
              {!userLoggedIn && (
                <NavLink to="/login" className="link">
                  Jetzt einloggen
                </NavLink>
              )}
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
