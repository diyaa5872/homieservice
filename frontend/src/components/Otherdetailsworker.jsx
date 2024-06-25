import * as React from 'react';
import { useState } from 'react';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function VerticalLinearStepper() {
  const navigate = useNavigate();
  const workerId = localStorage.getItem('workerno');
  
  const [coverImage, setProfileImage] = useState(null);

  const handleSignUpClick = () => {
    navigate('/Registeruser');
  };

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('coverImage', coverImage);
    formData.append('workerId', workerId);
    
    const street = formData.get('street');
    const city = formData.get('city');
    const state = formData.get('state');
    const country = formData.get('country');
    const postalCode = formData.get('postalCode');
    const contact_no = formData.get('contact_no');
    const age = formData.get('age');
    const experienceYears = formData.get('experienceYears');
    const homeVisitFee = formData.get('homeVisitFee');
    const description = formData.get('description');

    console.log(street, city, state, country, postalCode, contact_no, age, experienceYears, homeVisitFee, description, coverImage);

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/workers/addaddress?workerId=${workerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/mainworkerpage');
    } catch (error) {
      console.error('Error signing in:', error);
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
            Details :
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <h2>Address Details</h2>
            <TextField
              margin="normal"
              required
              fullWidth
              id="street"
              label="Enter your local address"
              name="street"
              autoComplete="street"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="Enter your city"
              id="city"
              autoComplete="city"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="state"
              label="Current state"
              name="state"
              autoComplete="state"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              id="country"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              autoComplete="postalCode"
              autoFocus
            />
            <h2>General details</h2>
            <TextField
              margin="normal"
              required
              fullWidth
              name="contact_no"
              label="Contact No."
              id="contact_no"
              autoComplete="contact_no"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="experienceYears"
              label="No of years of Experience"
              name="experienceYears"
              autoComplete="experienceYears"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              autoComplete="age"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="homeVisitFee"
              name="homeVisitFee"
              label="Fee for Home Visit"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="About your work"
              name="description"
              autoComplete="description"
              autoFocus
            />
            <h3>Profile Picture :</h3>
            <input
              accept="image/*"
              id="coverImage"
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: '10px', marginBottom: '20px' }}
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
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function VerticalLinearStepper() {
//   const navigate = useNavigate();

//   const workerId=localStorage.getItem('workerno')

//   const handleSignUpClick = () => {
//     navigate('/Registeruser');
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const street = formData.get('street');
//     const city = formData.get('city');
//     const state = formData.get('state');
//     const country = formData.get('country');
//     const postalCode = formData.get('country');
//     const contact_no = formData.get('contact_no');
//     const age = formData.get('age');
//     const experienceYears = formData.get('experienceYears');
//     const homeVisitFee = formData.get('homeVisitFee');
//     const description = formData.get('description');

//     console.log(street,city,state,country,postalCode,contact_no,age,experienceYears,homeVisitFee,description);
  
//     try {
//       const response = await axios.put(`http://localhost:8000/api/v1/workers/addaddress?workerId=${workerId}`, {
//         street,
//         city,
//         state,
//         country,
//         postalCode,
//         contact_no,
//         experienceYears,
//         age,
//         homeVisitFee,
//         description
//       });

//       navigate('/mainworkerpage');
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };
  

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Details :
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <h2>Address Details</h2>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="street"
//               label="enter your local address"
//               name="street"
//               autoComplete="street"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="city"
//               label="enter your city"
//               id="city"
//               autoComplete="city"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="state"
//               label="current state"
//               name="state"
//               autoComplete="state"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="country"
//               label="country"
//               type="country"
//               id="country"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="postalCode"
//               label="postalCode"
//               name="postalCode"
//               autoComplete="postalCode"
//               autoFocus
//             />
//             <h2>General details</h2>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="contact_no"
//               label="Contact No"
//               id="contact_no"
//               autoComplete="contact_no"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="experienceYears"
//               label="no of years of experience"
//               name="experienceYears"
//               autoComplete="experienceYears"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="age"
//               label="age"
//               name="age"
//               autoComplete="age"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="homeVisitFee"
//               name="homeVisitFee"
//               label="Fee for Visiting Home"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="description"
//               label="description"
//               name="description"
//               autoComplete="description"
//               autoFocus
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }