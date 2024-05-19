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
import UserCard from './Card';
import Grid from '@mui/material/Grid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Navbar from './Navbar';


const address = [
    { street:'c lane', city: 'Rohtak', state: 'Haryana' ,  country: 'India'},
    { street:'d lane', city: 'jhajjar', state: 'Haryana' ,  country: 'India'},
  ];

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');

export default function DateValidationDisablePast() {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  return (
    <>
    <Navbar />
    <UserCard />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
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
        {/* <DemoItem label="DatePicker">
          <DatePicker
            disablePast
            views={['year', 'month', 'day']}
          />
        </DemoItem> */}
        <DemoItem label="StartTime">
          <TimePicker defaultValue={todayStartOfTheDay} disablePast />
        </DemoItem>
        <DemoItem label="EndTime">
          <TimePicker defaultValue={todayStartOfTheDay} disablePast />
        </DemoItem>
        {/* <DemoItem label="DateTimePicker">
          <DateTimePicker
            defaultValue={yesterday}
            disablePast
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </DemoItem> */}
        {/* <DemoItem label="Choose your Dates :" component="DateRangePicker">
          <DateRangePicker defaultValue={[yesterday, today]} disablePast />
        </DemoItem> */}
        {/* <DemoItem label="DateTimeRangePicker" component="DateTimeRangePicker">
          <DateTimeRangePicker defaultValue={[yesterday, today]} disablePast />
        </DemoItem> */}
      </DemoContainer>
    </LocalizationProvider>
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={address}
      autoHighlight
      getOptionLabel={(option) => option.street+" "+ option.city +" "+ option.state +" "+ option.country}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.street.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.street.toLowerCase()}.png`}
            alt=""
          />
          {option.address} ({option.city}) +{option.state}
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
    />
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Appointment notes" variant="filled" />
    </Box>
     <Stack spacing={2} direction="row" width='150px' >
      <Button variant="contained" onClick={handleClick}>Send Request</Button>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Request successfully Sent !
  </Alert>
</Snackbar>
    </Stack>
    </>
  );
}
