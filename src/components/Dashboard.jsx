import React, { Fragment, useContext } from 'react';
import './DashboardStyle.css';
import AuthContext from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';

function Dashboard() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <Fragment className='dashboard'>
      <div className='bg'>
        {/* <div style={{ backgroundColor: "#fff", padding: "10px" }}>
          Wilkommen{" "}
          {currentUser.lastname}
          {users
            .filter((user) => user.email === currentEmail)
            .map((user) => user.firstname)}
        </div> */}

        <Container elevation={0} maxWidth='md'>
          <Paper elevation={0} sx={{ padding: 4 }}>
            <Typography gutterBottom>
              Willkommen Caro, dieser Prototyp ist ein Teil der Bachelorarbeit:
              Der User Centered Design Prozess am Beispiel der Entwicklung einer
              Webanwendung zur Verbesserung des mentalen Wohlbefindens im
              mobilen Unternehmenskontext.
            </Typography>
            <Typography gutterBottom>
              Dieser Prototyp beinhaltet einen Chat und eine Journal Komponente.
              Der Chat hat eine Random Chat Funktion. Du kannst dich mit einem
              zufälligen Kollegen zu einem Chat verabreden. Im Journals Bereich,
              kannst du das Dankbarkeitstagebuch und den 3-Positive-Dinge
              Eintrag verwenden.
            </Typography>
            <Box className='link' elevation={0} sx={{ marginTop: 2 }}>
              {!userLoggedIn && (
                <NavLink to='/login' className='link'>
                  Jetzt einloggen
                </NavLink>
              )}
            </Box>
          </Paper>
        </Container>
      </div>
    </Fragment>
  );
}

export default Dashboard;
