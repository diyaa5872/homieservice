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
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Privacy and Data
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Privacy
        </Typography>
        <Typography variant="body2">
          Privacy center
          <br />
          {'Take control of your privacy and learn how we protect it.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5" component="div">
            Third-party apps with account access
        </Typography>
      </CardActions>
      <CardActions>
        <Typography variant="xs" component="div">
            <i>{'Once you allow to third party apps ,you will see them here.<h6>Learn more</h6>'}</i>
        </Typography>
      </CardActions>
    </React.Fragment>
  );

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

export default function Accountdetails() {
  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate();

  const handleEditDetails = () => {
    navigate('/updateuserprofile');
  };

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
          <Tab label="Account info" {...a11yProps(0)} />
          <Tab label="Security" {...a11yProps(1)} />
          <Tab label="Privacy and Data" {...a11yProps(2)} />
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
          <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('Kent Dodds')} sx={{ width: 56, height: 56 }} />
    </Stack>
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
          id="outlined-read-only-input"
          label="Full Name"
          defaultValue="Diya Dhankhar"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="filled-read-only-input"
          label="email"
          defaultValue="dhankhardiya.8@gmail.com"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="username"
          defaultValue="ddiya"
          InputProps={{
            readOnly: true,
          }}
        />
      <TextField
          id="filled-read-only-input"
          label="contact number"
          defaultValue="90506464547"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <button onClick={handleEditDetails}>Edit Details</button>
      </div>
    </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div><h1>Security</h1></div>
          <div><h3>Logging in to HomeyService:</h3></div>
          <div>
          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            Passkeys:
            <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">password: </InputAdornment>,
          }}
        />
            </Box>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
            </Box>
          </div>
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