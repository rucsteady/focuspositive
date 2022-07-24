import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './LoginStyle.css';
import AuthContext from '../../context/AuthContext';
import { Container, Paper } from '@mui/material';

function Login() {
  const { error, handleLogin, setPassword, setEmail } = useContext(AuthContext);

  return (
    <div>
      <Container elevation={0} maxWidth='md'>
        <Paper elevation={0} sx={{ padding: 4 }}>
          <div>
            <div style={{ marginBottom: '10px' }}>Focus Positive Login</div>
            {error && (
              <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
            )}

            <form noValidate onSubmit={handleLogin}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                id='email'
                name='email'
                label='Email Addresse'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginRight: 3 }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                id='password'
                name='password'
                label='Passwort'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='button'>
                <Button variant='contained' type='submit'>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
