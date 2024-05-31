
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Navbar from './Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserCard from './UserCard';
const {localStorage}=window;
import {useNavigate} from 'react-router-dom';

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');

export default function DateValidationDisablePast() {
  const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState([]);
  const [data, setData] = useState(null); 
  const [datas, setDatas] = useState(null); 
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [startTime, setStartTime] = useState(todayStartOfTheDay);
  const [endTime, setEndTime] = useState(todayStartOfTheDay);
  const { id } = useParams();

  const userId = localStorage.getItem('userId');
  console.log(userId);

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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
        console.log(response.data);
        setData(response.data);
        setAddress(response.data.address_worker);

        const workerId = response.data._id;
        localStorage.setItem('workerId', workerId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respond = await axios.get(`http://localhost:8000/api/v1/users/getThatUser?id=${userId}`);
        console.log(respond.data);
        setDatas(respond.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const workerId = localStorage.getItem('workerId');
  console.log(workerId);

  const handleClick = async () => {
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
      const response = await axios.post(`http://localhost:8000/api/v1/bookings/bookandrequest?userId=${userId}&workerId=${workerId}`, requestData);
      console.log('Response:', response.data);
      setTimeout(() => {
        navigate('/mainpage');
    }, 2000);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <Navbar />
      {/* <UserCard data={datas} /> */}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                'DatePicker',
                'DateTimePicker',
                'TimePicker',
                'DateRangePicker',
                'DateTimeRangePicker',
              ]}
            >
              <DemoItem label="StartTime">
                <TimePicker
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  disablePast
                />
              </DemoItem>
              <DemoItem label="EndTime">
                <TimePicker
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  disablePast
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={address}
            autoHighlight
            getOptionLabel={(option) => `${option.street} ${option.city} ${option.state} ${option.country}`}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.street.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.street.toLowerCase()}.png`}
                  alt=""
                />
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
          <Stack spacing={2} direction="row" width='150px'>
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


// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import dayjs from 'dayjs';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import Navbar from './Navbar';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import UserCard from './UserCard';

// const today = dayjs();
// const todayStartOfTheDay = today.startOf('day');

// export default function DateValidationDisablePast() {
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(true);
//   const [address, setAddress] = React.useState([]);
//   const [data, setData] = useState(null); 
//   const [datas, setDatas] = useState(null); 
//   const [appointmentNotes, setAppointmentNotes] = useState('');
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [startTime, setStartTime] = useState(todayStartOfTheDay);
//   const [endTime, setEndTime] = useState(todayStartOfTheDay);
//   const { id } = useParams();

//   const userId = localStorage.getItem('userId');
//   console.log(userId);

//   const handleClick = () => {
//     setOpen(true);
//     logUserData();
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   const logUserData = () => {
//     console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
//     console.log('Start Time:', startTime.format('HH:mm'));
//     console.log('End Time:', endTime.format('HH:mm'));
//     console.log('Address:', address);
//     console.log('Appointment Notes:', appointmentNotes);
//     // Add more logs for other user inputs as needed
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${id}`);
//         console.log(response.data);
//         setData(response.data);
//         setAddress(response.data.address_worker);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const respond = await axios.get(`http://localhost:8000/api/v1/users/getThatUser?id=${userId}`);
//         console.log(respond.data);
//         setDatas(respond.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <UserCard  data={datas} />
//       {loading ? (
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <CircularProgress />
//           <Box ml={2}>Loading...</Box>
//         </Box>
//       ) : (
//         <>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateCalendar
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//             />
//           </LocalizationProvider>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//               components={[
//                 'DatePicker',
//                 'DateTimePicker',
//                 'TimePicker',
//                 'DateRangePicker',
//                 'DateTimeRangePicker',
//               ]}
//             >
//               <DemoItem label="StartTime">
//                 <TimePicker
//                   value={startTime}
//                   onChange={(newValue) => setStartTime(newValue)}
//                   disablePast
//                 />
//               </DemoItem>
//               <DemoItem label="EndTime">
//                 <TimePicker
//                   value={endTime}
//                   onChange={(newValue) => setEndTime(newValue)}
//                   disablePast
//                 />
//               </DemoItem>
//             </DemoContainer>
//           </LocalizationProvider>
//           <Autocomplete
//             id="country-select-demo"
//             sx={{ width: 300 }}
//             options={address}
//             autoHighlight
//             getOptionLabel={(option) => `${option.street} ${option.city} ${option.state} ${option.country}`}
//             renderOption={(props, option) => (
//               <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//                 <img
//                   loading="lazy"
//                   width="20"
//                   srcSet={`https://flagcdn.com/w40/${option.street.toLowerCase()}.png 2x`}
//                   src={`https://flagcdn.com/w20/${option.street.toLowerCase()}.png`}
//                   alt=""
//                 />
//                 {`${option.street}, ${option.city}, ${option.state}, ${option.country}`}
//               </Box>
//             )}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Choose an address"
//                 inputProps={{
//                   ...params.inputProps,
//                   autoComplete: 'new-password', // disable autocomplete and autofill
//                 }}
//               />
//             )}
//             onChange={(event, value) => setAddress(value)}
//           />
//           <Box
//             component="form"
//             sx={{
//               '& > :not(style)': { m: 1, width: '50%' },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField 
//               id="filled-basic" 
//               label="Appointment notes" 
//               variant="filled" 
//               value={appointmentNotes} 
//               onChange={(e) => setAppointmentNotes(e.target.value)} 
//             />
//           </Box>
//           <Stack spacing={2} direction="row" width='150px'>
//             <Button variant="contained" onClick={handleClick}>Send Request</Button>
//             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//               <Alert
//                 onClose={handleClose}
//                 severity="success"
//                 variant="filled"
//                 sx={{ width: '100%' }}
//               >
//                 Request successfully Sent to the worker!
//               </Alert>
//             </Snackbar>
//           </Stack>
//         </>
//       )}
//     </>
//   );
// }
