import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Otpuser() {

  const navigate=useNavigate();

  const otpHandler=()=>{
    navigate('/mainpage')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email:data.get('email'),
      otp: data.get('Otp')
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Otp Verification
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography>Please enter your password sent on your registered Email</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="enter your registered email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={otpHandler}
            >
              Send Otp
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="enter the Otp"
              type="otp"
              id="otp"
              autoComplete="otp"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={otpHandler}
            >
              Verify Otp
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}