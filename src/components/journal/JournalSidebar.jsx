import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import React, { Fragment } from 'react';

function JournalSidebar({
  entrys,
  onAddEntry,
  onDeleteEntry,
  activeEntry,
  setActiveEntry,
}) {
  const sortedEntrys = entrys.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <Fragment>
      <Container>
        <Paper
          elevation={0}
          sx={{
            width: 300,
            padding: 4,
            marginLeft: 0,
          }}
        >
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            Einträge
          </Typography>
          {sortedEntrys.map(({ id, title, body, lastModified, index }) => (
            <Card>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: '#fff',
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                key={index}
              >
                <ListItem
                  alignItems='flex-start'
                  button
                  onClick={() => setActiveEntry(id)}
                >
                  <ListItemText
                    primary={`${title}`}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {body && body.substr(0, 40) + '...'}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }}>
                          {' '}
                          Zuletzt bearbeitet{' '}
                          {new Date(lastModified).toLocaleDateString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          <IconButton
                            aria-label='delete'
                            onClick={(e) => onDeleteEntry(id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItem>
                {/* <Divider component="li" /> */}
              </List>
            </Card>
          ))}

          <Button
            variant='contained'
            sx={{ marginTop: 3, boxShadow: 0 }}
            onClick={onAddEntry}
          >
            Neuer Eintrag
          </Button>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default JournalSidebar;
