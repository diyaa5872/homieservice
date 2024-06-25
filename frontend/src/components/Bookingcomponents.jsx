import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Navbar from './Navbar';
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');

export default function DateValidationDisablePast() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [datas, setDatas] = React.useState(null);
  const [appointmentNotes, setAppointmentNotes] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(today);
  const [startTime, setStartTime] = React.useState(todayStartOfTheDay);
  const [endTime, setEndTime] = React.useState(todayStartOfTheDay);
  const [addressError, setAddressError] = React.useState(false); // State to track address validation
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); // Initialize navigate using useNavigate hook

  const handleClick = async () => {
    if (!address || !address.street || !address.city || !address.state || !address.country) {
      setAddressError(true); // Set address error if any field is empty
      return;
    }
    setAddressError(false); // Reset address error

    setOpen(true);
    logUserData();

    const requestData = {
      date: selectedDate.format('YYYY-MM-DD'),
      start: startTime.format('HH:mm'),
      end: endTime.format('HH:mm'),
      address: `${address.street}, ${address.city}, ${address.state}, ${address.country}`,
      notes: appointmentNotes
    };

    try {
      const workerId = localStorage.getItem('workerId');
      const response = await axios.post(`http://localhost:8000/api/v1/bookings/bookandrequest?userId=${userId}&workerId=${workerId}`, requestData);
      console.log('Response:', response.data);
      setTimeout(() => {
        navigate('/mainpage'); // Redirect to /mainpage after 2000ms (2 seconds)
      }, 2000);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const logUserData = () => {
    console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
    console.log('Start Time:', startTime.format('HH:mm'));
    console.log('End Time:', endTime.format('HH:mm'));
    console.log('Address:', address);
    console.log('Appointment Notes:', appointmentNotes);
    // Add more logs for other user inputs as needed
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
        console.log(response.data);
        setData(response.data);
        localStorage.setItem('workerId', response.data._id);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/getThatUser?id=${userId}`);
        console.log(response.data);
        setDatas(response.data);
        setAddress(response.data.address_user);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
          <Box ml={2}>Loading...</Box>
        </Box>
      ) : (
        <>
          <UserCard data={datas} />
          <h4>Choose Date:</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
          <h4>Select active hours range:</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} direction="row">
              <TimePicker
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                disablePast
              />
              <TimePicker
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                disablePast
              />
            </Stack>
          </LocalizationProvider>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={address}
            autoHighlight
            getOptionLabel={(option) => `${option.street}, ${option.city}, ${option.state}, ${option.country}`}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {`${option.street}, ${option.city}, ${option.state}, ${option.country}`}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose an address"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                error={addressError} // Display error if address is not filled
                helperText={addressError ? 'Address is required' : ''}
              />
            )}
            onChange={(event, value) => setAddress(value)}
          />
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '50%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Appointment notes"
              variant="filled"
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
            />
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleClick}>Send Request</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Request successfully Sent to the worker!
              </Alert>
            </Snackbar>
          </Stack>
        </>
      )}
    </>
  );
}
