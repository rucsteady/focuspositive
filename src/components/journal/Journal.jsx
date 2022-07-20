import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { Fragment } from 'react'

function Journal() {
  return (
    <Fragment>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item>
           <Typography>Hallo Journal</Typography>
          </Grid>
          
         
        </Grid>
      </Container>
    </Fragment>
  )
}

export default Journal