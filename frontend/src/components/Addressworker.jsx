
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from  'axios';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">  
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Addressworker() {
  const { userId } = useParams();
  console.log(userId);
  
  const navigate=useNavigate();

  const handleSubmit =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address=({
      street:data.get('street') || "",
      city: data.get('city') || "",
      state: data.get('state') || "",
      country: data.get('country') || "",
      postalcode: data.get('postalcode')  || ""
    });

    console.log(address);

    // try {
    //   const response = await axios.post(`http://localhost:8000/api/v1/users/addressUser/${userId}`, address);
    //   console.log('Address added successfully', response.data);

    //   navigate('/otpuser')
    // } catch (error) {
    //   console.error('There was an error adding the address!', error);
    // }
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
            Add Work Address
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="street"
                  required
                  fullWidth
                  id="street"
                  label="enter your local address"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="Your City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="state"
                  id="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Enter your Country"
                  id="country"
                  autoComplete="country"
                  default="India"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="postalcode"
                  label="Postal Code"
                  id="postalcode"
                  autoComplete="postalcode"
                  default="India"
                />
              </Grid>
            </Grid>
            <Button
            onSubmit={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Next
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}