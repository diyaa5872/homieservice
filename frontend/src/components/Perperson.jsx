import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import UserCard from './Card';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
        console.log(response.data);
        console.log(response.data._id);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = () => {
    setOpen(true);
    navigate(`/requesting/${data._id}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <UserCard key={data._id} profession={data.profession} data={data} />
          <Box
            sx={{
              bgcolor: 'background.paper',
              width: '100%',
              position: 'relative',
              minHeight: 400,
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
                <Tab label="About worker" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
                <Tab label="Photos" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <b>Experience: </b><span>{data.experienceYears} years</span>
                <h3>Description: </h3>
                <span>{data.description}</span>
                <h3>Contact number: </h3>
                <span>{data.contact_no}</span>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Paper
                  sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            Review
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            I am really happy with his work
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            5 rating
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </>
      )}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Button onClick={handleClick} sx={{color: "#FFF2D8",bgcolor: "#113946"}}><h3>Send Booking Request</h3></Button>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Successfully sent a request to the Worker!
            </Alert>
          </Snackbar>
        </div>
      </Stack>
    </div>
  );
}

const itemData = [
  {
    img: 'https://i.pinimg.com/236x/3a/20/30/3a2030b683e063a894bc4708913a6e07.jpg',
    title: 'Breakfast',
  },
  {
    img: 'https://i.pinimg.com/236x/f8/7e/e4/f87ee4bd6e2dc1cb9b1d70f1a29eef04.jpg',
    title: 'Burger',
  },
  {
    img: 'https://i.pinimg.com/236x/79/61/8e/79618ed27fa922113226ed225bf1342b.jpg',
    title: 'Camera',
  },
  {
    img: 'https://i.pinimg.com/236x/e8/90/b1/e890b1a1a2d1e21bf477f76a0f24ab9d.jpg',
    title: 'Coffee',
  },
  {
    img: 'https://i.pinimg.com/236x/07/aa/55/07aa55eb16cb364c5adf79f62cb55105.jpg',
    title: 'mugger',
  },
  {
    img: 'https://i.pinimg.com/236x/8d/08/46/8d0846b194ce86e6af86bbe3b6d8957a.jpg',
    title: 'carpenter',
  },
  {
    img: 'https://i.pinimg.com/236x/23/60/bf/2360bf11968bf683370eecb56412381a.jpg',
    title: 'plumber',
  }
];






