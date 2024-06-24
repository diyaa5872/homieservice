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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useEffect,useState} from "react";

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
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
      <Typography variant="body2" component="div">
        <i>{'Once you allow third party apps, you will see them here. <h6>Learn more</h6>'}</i>
      </Typography>
    </CardActions>
  </React.Fragment>
);

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8) & 0xff);
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (!name) return {}; // Add null check to avoid errors
  
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
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`action-tabpanel-${index}`} aria-labelledby={`action-tab-${index}`} {...other}>
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

export default function AccountDetails() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [date, setData] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${userId}`);
        console.log(response);
        setData(response.data); // Assuming response.data contains the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); 

    const handleEditDetails = () => {
    navigate('/updatedetails');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: '#FFF2D8',
          width: '100%',
          position: 'relative',
          minHeight: 830,
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
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div>
              <Typography variant="h5">Account Info</Typography>
            </div>
            <Stack direction="row" spacing={2}>
              {/* <Avatar {...stringAvatar(userData.fullName)} sx={{ width: 56, height: 56 }} /> */}
            </Stack>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Full Name"
                  value={date? date.fullName : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  id="filled-read-only-input"
                  label="Email"
                  value={date? date.email : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  id="filled-read-only-input"
                  label="Username"
                  value={date? date.username : ""}
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
            <div><Typography variant="h5">Security:</Typography></div>
            <div><Typography variant="h6">Logging in to HomeyService:</Typography></div>
            <div>
              <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                Passkeys:
                <TextField
  type="password"
  label="Password"
  value={date? date.password : "xxxx"}
  id="outlined-start-adornment"
  sx={{ m: 1, width: '25ch' }}
  InputProps={{
    startAdornment: <InputAdornment position="start">Password:</InputAdornment>,
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
      </Box>
    </>
  );
}


// import * as React from 'react';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Stack from '@mui/material/Stack';
// import Navbar from './Navbar';
// import InputAdornment from '@mui/material/InputAdornment';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Define helper functions outside the component
// const bull = (
//   <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// );

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography variant="h5" component="div">
//         Privacy and Data
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         Privacy
//       </Typography>
//       <Typography variant="body2">
//         Privacy center
//         <br />
//         {'Take control of your privacy and learn how we protect it.'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Typography variant="h5" component="div">
//         Third-party apps with account access
//       </Typography>
//     </CardActions>
//     <CardActions>
//       <Typography variant="body2" component="div">
//         <i>{'Once you allow third party apps, you will see them here. <h6>Learn more</h6>'}</i>
//       </Typography>
//     </CardActions>
//   </React.Fragment>
// );

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography component="div" role="tabpanel" hidden={value !== index} id={`action-tabpanel-${index}`} aria-labelledby={`action-tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `action-tab-${index}`,
//     'aria-controls': `action-tabpanel-${index}`,
//   };
// }

// export default function AccountDetails() {
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);
//   const [userData, setUserData] = React.useState({
//     fullName: '',
//     email: '',
//     username: '',
//     contactNumber: '',
//   });
//   const navigate = useNavigate();

//   const userId=localStorage.getItem("userId");
//   console.log(userId);

//   React.useEffect(() => {
//     // Fetch data when the component mounts
//     axios.get(`http://localhost:8000/api/v1/workers/work?id=${userId}`)
//       .then(response => {
//         // Assuming the response data structure matches the state structure
//         setUserData(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId]);

//   const handleEditDetails = () => {
//     navigate('/updateuserprofile');
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           bgcolor: 'background.paper',
//           width: '100%',
//           position: 'relative',
//           minHeight: 200,
//         }}
//       >
//         <AppBar position="static" color="default">
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             variant="fullWidth"
//             aria-label="action tabs example"
//           >
//             <Tab label="Account info" {...a11yProps(0)} />
//             <Tab label="Security" {...a11yProps(1)} />
//             <Tab label="Privacy and Data" {...a11yProps(2)} />
//           </Tabs>
//         </AppBar>
//         <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
//           <TabPanel value={value} index={0} dir={theme.direction}>
//             <div>
//               <Typography variant="h1">Account Info</Typography>
//             </div>
//             <Stack direction="row" spacing={2}>
//               {/* <Avatar {...stringAvatar(userData.fullName)} sx={{ width: 56, height: 56 }} /> */}
//             </Stack>
//             <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
//               <div>
//                 <TextField
//                   id="outlined-read-only-input"
//                   label="Full Name"
//                   value={userData.fullName}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </div>
//               <div>
//                 <TextField
//                   id="filled-read-only-input"
//                   label="Email"
//                   value={userData.email}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </div>
//               <div>
//                 <TextField
//                   id="filled-read-only-input"
//                   label="Username"
//                   value={userData.username}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//                 <TextField
//                   id="filled-read-only-input"
//                   label="Contact Number"
//                   value={userData.contactNumber}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </div>
//               <div>
//                 <button onClick={handleEditDetails}>Edit Details</button>
//               </div>
//             </Box>
//           </TabPanel>
//           <TabPanel value={value} index={1} dir={theme.direction}>
//             <div><Typography variant="h1">Security</Typography></div>
//             <div><Typography variant="h3">Logging in to HomeyService:</Typography></div>
//             <div>
//               <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
//                 Passkeys:
//                 <TextField
//                   label="With normal TextField"
//                   id="outlined-start-adornment"
//                   sx={{ m: 1, width: '25ch' }}
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">password:</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </div>
//           </TabPanel>
//           <TabPanel value={value} index={2} dir={theme.direction}>
//             <div>
//               <Box sx={{ minWidth: 275 }}>
//                 <Card variant="outlined">{card}</Card>
//               </Box>
//             </div>
//           </TabPanel>
//         </SwipeableViews>
//       </Box>
//     </>
//   );
// }
