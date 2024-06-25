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
import axios from 'axios';

function ErrorMessage({ message }) {
  return (
    <Typography variant="body2" color="error" align="center" gutterBottom>
      {message}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSignUpClick = () => {
    navigate('/Registeruser');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setErrorMessage('Fill all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password
      });

      console.log(response.data); // Handle the response data as needed
      const userId = response.data.data.user._id;
      const setUserno = (userId) => {
        localStorage.setItem('userId', userId);
      };

      setUserno(userId);
      console.log(userId);

      navigate('/mainpage');
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('Please register');
      } else {
        setErrorMessage('Error signing in. Please try again.');
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <TextField
              error={errorMessage === 'Fill all required fields'}
              helperText={errorMessage === 'Fill all required fields' ? 'Required' : ''}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={errorMessage === 'Fill all required fields'}
              helperText={errorMessage === 'Fill all required fields' ? 'Required' : ''}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <p>
                  Don't have an account?{' '}
                  <span onClick={handleSignUpClick} style={{ color: 'blue', cursor: 'pointer' }}>
                    Sign Up
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
