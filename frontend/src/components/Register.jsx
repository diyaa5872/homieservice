import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const { localStorage } = window;
import axios from 'axios';

function ErrorMessage({ message }) {
  return (
    <Typography variant="body2" color="error" align="center" gutterBottom>
      {message}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSignInClick = () => {
    navigate('/Loginuser');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username')
    };

    if (!user.fullName || !user.email || !user.password || !user.username) {
      setErrorMessage('Fill all required fields');
      return;
    }

    try {
      // Send a POST request to register the user
      const response = await axios.post('http://localhost:8000/api/v1/users/register', user);
      console.log('Registration successful', response.data);

      const userId = response.data.data._id;
      const setUserno = (userId) => {
        localStorage.setItem('userId', userId);
      };
      setUserno(userId);

      navigate('/otpuser');
    } catch (error) {
      console.error('Error registering the user:', error);
      if (error.response && error.response.status === 409) {
        setErrorMessage('Email already registered. Please login.');
      } else {
        setErrorMessage('Error registering the user. Please try again.');
      }
    }
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p>
                  Already have an account?{' '}
                  <span onClick={handleSignInClick} style={{ color: 'blue', cursor: 'pointer' }}>
                    Login
                  </span>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
