import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

function RandomChatInfo({ handleShowChatSearch, handleShowChatNew }) {
  return (
    <Box elevation={0} sx={{ minHeight: '300px' }}>
      <Typography variant='h6'>Wilkommen beim Random Chat</Typography>
      <Grid container>
        <Grid item mt={4}>
          <Typography>
            Lerne Kollegen*innen kennen und verabrede dich für eine Chat Pause
            mit der Random Chat Funktion.
          </Typography>
          <Typography>
            Beim Random Chat wirst du mit einer zufälligen Kollegin oder
            Kollegen verbunden. Wenn der Chat startet, habt ihr 15 Minuten Zeit
            ein bisschen zu plaudern.
          </Typography>
        </Grid>
        <Box sx={{ marginTop: 3 }}>
          <Grid item mt={4} sx={{ paddingRight: 3 }}>
            <Button
              onClick={handleShowChatNew}
              variant='contained'
              sx={{ boxShadow: 0 }}
            >
              Neuen Random Chat erstellen
            </Button>
          </Grid>
          <Grid item mt={4}>
            <Button
              onClick={handleShowChatSearch}
              variant='contained'
              sx={{ boxShadow: 0 }}
            >
              Suche nach einen Random Chat
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default RandomChatInfo;
