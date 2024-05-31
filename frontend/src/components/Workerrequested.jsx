import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import Navbarworker from './Navbarworker';
import WorkerCard from './UserCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

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
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // State variable for loading
  const [data,setData]=React.useState("");

  const workerno = localStorage.getItem('workerno');
  console.log(workerno);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${workerno}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress /> {/* Loader */}
          </Box>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {/* <TabPanel value={value} index={0} dir={theme.direction}>
              <WorkerCard />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <WorkerCard />
            </TabPanel> */}
          </SwipeableViews>
      </Box>
    </div>
  );
}
