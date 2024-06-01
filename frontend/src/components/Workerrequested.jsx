import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Navbarworker from './Navbarworker';
import Workercard from './Workercard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState([]);
  const [reques, setReques] = useState([]);
  const [reque, setReque] = useState([]);

  const workerno = localStorage.getItem('workerno');
  console.log(workerno);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/requestforworker?workerno=${workerno}&accepted=false`);
        console.log(response.data);
        setRequests(response.data);

        if (response.data.length > 0) {
          const userIds = response.data.map(item => item.userId);
          const userRequests = await Promise.all(
            userIds.map(userId => axios.get(`http://localhost:8000/api/v1/workers/work?id=${userId}`))
          );
          const userResponses = userRequests.map(res => res.data);
          setReques(userResponses.flat());
        } else {
          setReques([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setReques([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workerno]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/requesttrueforworker?workerno=${workerno}&accepted=true`);
        console.log(response.data);
        setRequest(response.data);

        if (response.data.length > 0) {
          const userIds = response.data.map(item => item.userId);
          const userRequests = await Promise.all(
            userIds.map(userId => axios.get(`http://localhost:8000/api/v1/workers/work?id=${userId}`))
          );
          const userResponses = userRequests.map(res => res.data);
          setReque(userResponses.flat());
        } else {
          setReque([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setReque([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workerno]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Navbarworker />
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
            <Tab label="Upcoming Requests" {...a11yProps(0)} />
            <Tab label="Completed requests" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh', // Adjust the height as needed
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
            {reques.length > 0 ? (
                reques.map((request, index) => (
                  <Workercard key={index} data={request} fullName={request.fullName} id={request._id}/>
                ))
              ) : (
                <Typography>No upcoming requests found.</Typography>
              )}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            {reque.length > 0 ? (
                reque.map((request, index) => (
                  <Workercard key={index} data={request} fullName={request.fullName}/>
                ))
              ) : (
                <Typography>No requests are completed .</Typography>
              )}
            </TabPanel>
          </SwipeableViews>
        )}
      </Box>
    </div>
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
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
// import Navbarworker from './Navbarworker';
// import WorkerCard from './UserCard';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`action-tabpanel-${index}`}
//       aria-labelledby={`action-tab-${index}`}
//       {...other}
//     >
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



// export default function FloatingActionButtonZoom() {
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);
//   const [loading, setLoading] = React.useState(true); // State variable for loading
//   const [data,setData]=React.useState("");
//   const [requests,setRequests]=useState([]);
//   const {accepted}=useParams();

//   const workerno = localStorage.getItem('workerno');
//   console.log(workerno);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const workernum=workerno;
//       const {accepted}=false;
//       console.log(workernum,accepted);
//       const response = await axios.get(`http://localhost:8000/api/v1/workers/requestforworker`,{
//         params: {workernum,accepted}
//       });
//       console.log(response);
//       setRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <div>
//       <Navbarworker />
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
//             <Tab label="Upcoming Requests" {...a11yProps(0)} />
//             <Tab label="Completed requests" {...a11yProps(1)} />
//           </Tabs>
//         </AppBar>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh',
//             }}
//           >
//             <CircularProgress /> {/* Loader */}
//           </Box>
//           <SwipeableViews
//             axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//             index={value}
//             onChangeIndex={handleChangeIndex}
//           >
//             {/* <TabPanel value={value} index={0} dir={theme.direction}>
//               <WorkerCard />
//             </TabPanel>
//             <TabPanel value={value} index={1} dir={theme.direction}>
//               <WorkerCard />
//             </TabPanel> */}
//           </SwipeableViews>
//       </Box>
//     </div>
//   );
// }
