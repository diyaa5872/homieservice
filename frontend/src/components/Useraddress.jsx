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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Useraddress() {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address_user = {
      street: data.get('street') || "",
      city: data.get('city') || "",
      state: data.get('state') || "",
      country: data.get('country') || "",
      postalCode: data.get('postalCode') || ""
    };

    // Check if any required fields are empty
    for (const key of Object.keys(address_user)) {
      if (!address_user[key]) {
        setError('Please fill all the required fields.');
        return;
      }
    }

    console.log(address_user);

    const userId = localStorage.getItem('userId');
    console.log(userId);

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/users/addaddress?userId=${userId}`, {
        ...address_user
      });

      console.log(response.data);
      navigate('/mainpage'); // Navigate to the next page after successful submission
    } catch (error) {
      console.error('There was an error submitting the form!', error);
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
            Add Work Address
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="street"
                  required
                  fullWidth
                  id="street"
                  label="Enter your local address"
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
                  label="State"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="postalCode"
                  label="Postal Code"
                  id="postalcode"
                  autoComplete="postalcode"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
