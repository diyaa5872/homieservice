import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Otp() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [otpSent, setOtpSent] = React.useState(false);

  const sendOtpHandler = (email) => {
    axios.post('http://localhost:8000/api/v1/otps/generatingotp', { email })
      .then(response => {
        console.log(response.data);
        setOtpSent(true); // Set OTP sent status to true
      })
      .catch(error => {
        console.error('There was an error sending the OTP!', error);
      });
  };

  const verifyOtpHandler =async (otp, email) => {
    console.log("Verifying OTP:", { otp, email });
    await axios.post('http://localhost:8000/api/v1/otps/verifyingotp', { otp, email })
      .then(response => {
        console.log("OTP verification response:", response.data);
        navigate('/otherdetails');
      })
      .catch(error => {
        console.error('There was an error verifying the OTP!', error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      });
  };

  const handleSendOtp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    setEmail(email); // Store the email in state
    sendOtpHandler(email);
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otp = data.get('otp');
    verifyOtpHandler(otp, email); // Use the email stored in state
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
            OTP Verification
          </Typography>
          {!otpSent ? (
            <Box component="form" onSubmit={handleSendOtp} noValidate sx={{ mt: 1 }}>
              <Typography>Please enter your registered Email</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Enter your registered email"
                type="email"
                id="email"
                autoComplete="email"
              />
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Send OTP
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyOtp} noValidate sx={{ mt: 1 }}>
              <Typography>Please enter the OTP sent to your registered email</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="Enter OTP"
                type="text"
                id="otp"
                autoComplete="otp"
              />
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          )}
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
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function Otp() {

//   const navigate=useNavigate();

//   const otpHandler=()=>{
//     navigate('/otherdetails')
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email:data.get('email'),
//       otp: data.get('Otp')
//     });
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
//           <Typography component="h1" variant="h5">
//             Otp Verification
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <Typography>Please enter your password sent on your registered Email</Typography>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="email"
//               label="enter your registered email"
//               type="email"
//               id="email"
//               autoComplete="email"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="otp"
//               label="enter the Otp"
//               type="otp"
//               id="otp"
//               autoComplete="otp"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={otpHandler}
//             >
//               Verify Otp
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }