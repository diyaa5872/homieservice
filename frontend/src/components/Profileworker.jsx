import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
import { green } from '@mui/material/colors';
import axios from 'axios';
import Box from '@mui/material/Box';
import {useEffect,useState} from "react";


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

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

export default function Accountworker() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [date, setData] = useState(null);
  const navigate=useNavigate();
  const id=localStorage.getItem("workerno");
  console.log(id);

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
  
  const editHandler=()=>{
    navigate('/updateworkerprofile')
  }

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

  const fabs = [
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    }
  ];

  return (
    <>
    <Navbar />
    <Box
      sx={{
        bgcolor: '#FFF2D8',
        width: '100%',
        position: 'relative',
        minHeight: 835,
        height: '100%'
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
          <Tab label="Account info" {...a11yProps(0)} />
          <Tab label="SUPPORT" {...a11yProps(1)} />
          <Tab label="About US" {...a11yProps(2)} />
          <Tab label="Privacy pOLICY" {...a11yProps(3)} />
          <Tab label="FAQs" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <Typography><h1></h1>Account Info</Typography>
          </div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        
        <TextField
          id="filled-read-only-input"
          label="full name"
          value={date ? date.fullName : 'fullName'}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
           id="filled-read-only-input"
           label="full name"
          value={date? date.email : "email"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="username"
          value={date? date.username : "username"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="password"
          value={date? date.password : "password"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="experienceYears"
          value={date? date.experienceYears : "0"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="Contact number"
          value={date? date.contact_no : "xxxxxx"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="Age"
          value={date? date.age : "not given"}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <button onClick={editHandler}>Edit Details</button>
      </div>
    </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Not Given
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Not Given
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Not Given
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Not Given
        </TabPanel>
      </SwipeableViews>
      {/* {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === 0}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.value} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))} */}
    </Box>
    </>
  );
}