import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function NotFound() {
  return (
    <div>
      <Container elevation={0} maxWidth='md'>
        <Paper elevation={0} sx={{ padding: 4 }}>
          <div>
            <Typography>- 404 - Nothing found here </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default NotFound;
