import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import Navbar from './Navbar';
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

const defaultTheme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (

    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = useState({});

  const id=localStorage.getItem('userId');
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };
    fetchData();
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleSubmitUserDetails = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const details= {
      email: data.get('email'),
      fullName: data.get('fullName'),
    }
      console.log(details);

    // try {
    //   const response = await axios.put(`http://localhost:8000/api/v1/users/updateemail`, {
    //     details
    //   });
      navigate('/mainpage');

    // } catch (error) {
    //   console.error('Error updating user details:', error);
    // }
  };
  
  const handleSubmitAddress = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const address={
      street: formdata.get('street'),
      city: formdata.get('city'),
      state: formdata.get('state'),
      country: formdata.get('country'),
      postalCode: formdata.get('postalCode'),
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/users/addanotheraddress`, {
        address
        // Add other fields as needed
      });
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error('Error adding address:', error);
      // Handle error
    }
  };

  return (
    <>
    <Navbar />
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Update User Details" {...a11yProps(0)} />
          <Tab label="Add address" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
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
            User Details
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userData.email || ''}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="fullName"
              type="fullName"
              id="fullName"
              autoComplete="fullName"
              value={userData.fullName || ''}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            />
            <Button
            onClick={handleSubmitUserDetails}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update  user details
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
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
            Add Address
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="street"
              label="street"
              name="street"
              autoComplete="street"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="city"
              id="city"
              autoComplete="city"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="state"
              label="state"
              id="state"
              autoComplete="state"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="country"
              label="country"
              id="country"
              autoComplete="country"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="postalCode"
              label="postalCode"
              id="postalCode"
              autoComplete="postalCode"
            />
            <Button
              type="submit"
              onClick={handleSubmitAddress}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD Address
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
        </TabPanel>
      </SwipeableViews>
    </Box>
    </>
  );
}