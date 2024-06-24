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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
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
import {useEffect,useState} from "react";




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

export default function Workerdetailsupdate() {
  const [date, setData] = useState(null);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const id=localStorage.getItem("workerno");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
        console.log(response);
        setData(response.data); // Assuming response.data contains the fetched data
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      street: data.get('street'),
      city: data.get('city'),
      state: data.get('state'),
      country: data.get('country'),
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword'),
      oldNumber:data.get('oldNumber'),
      newNumber: data.get('newNumber'),
      file1:data.get('file1'),
      file2:data.get('file2')
    });
  };

  return (
    <>
    <Navbar />
    <Box
      sx={{
        bgcolor: '#FFF2D8',
        width: '100%',
        position: 'relative',
        minHeight: 837,
      }}
    >
      <AppBar position="static" sx={{bgcolor: "#BCA37F"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Update User Details" {...a11yProps(0)} />
          <Tab label="Update Address " {...a11yProps(1)} />
          <Tab label="Change password" {...a11yProps(2)} />
          <Tab label="Update Profile image" {...a11yProps(3)} />
          <Tab label="Update shop images" {...a11yProps(4)} />
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
            Update General Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={date? date.email : ""}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={date? date.fullName : ""}
              name="fullName"
              label="fullName"
              id="fullName"
              autoComplete="fullName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={date? date.contact_no : "xxxxx"}
              name="contactnumber"
              label="contactNumber"
              type="Number"
              id="contactNumber"
              autoComplete="contactNumber"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={date? date.homeVisitFee : "0"}
              name="homeVisitFee"
              label="homeVisitFee"
              type="Number"
              id="homeVisitFee"
              autoComplete="homeVisitFee"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={date? date.description : "not described"}
              name="description"
              label="description"
              id="description"
              autoComplete="description"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,bgcolor:"#113946"}}
            >
              Update
            </Button>
          </Box>
        </Box>
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              defaultValue='india'
              autoComplete="country"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="postal code"
              label="postal code"
              id="postalCode"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:"#113946" }}
            >
              ADD Address
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
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
            Change password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oldPassword"
              label="oldPassword"
              name="oldPassword"
              autoComplete="oldPassword"
              type='password'
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="newPassword"
              type="password"
              id="newPassword"
              autoComplete="newPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:"#113946" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
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
          Update Profile Image
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="file1"
                type="file"
                name="file1"
                multiple={false}
              />
              {/* <label htmlFor="file1">
                <Button variant="contained" component="span">
                  Select image
                </Button>
              </label> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,bgcolor:"#113946" }}
          >
            Update Profile Image
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
</TabPanel>
<TabPanel value={value} index={4} dir={theme.direction}>
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
          Update Shop images
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="file2"
                type="file"
                name="file2"
                multiple={true}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,bgcolor:"#113946"}}
          >
            Add Shop images
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
</TabPanel>

      </SwipeableViews>
    </Box>
    </>
  );
}