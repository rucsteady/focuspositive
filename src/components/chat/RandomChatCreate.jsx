import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import React, { Fragment } from "react";

function RandomChatCreate({
  handleShowChatSearch,
  handleShowChatInfo,
  handleShowChatNew,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 350,
            padding: 4,
          }}
        >
          <Typography variant="h6">Erstelle einen neuen Random Chat</Typography>
          <Grid container>
            <Grid item mt={4} maxWidth={"350px"}>
              <Typography>
                Hier kannst du einen eigenen Random Chat erstellen. Gib deinem
                Chat einen Namen. Wenn du magst, kannst du Themen eintragen,
                über die du gerne sprechen möchtest.
              </Typography>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Random Chat Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="topics"
                    label="Gesprächsthemen"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                erstellen
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default RandomChatCreate;
