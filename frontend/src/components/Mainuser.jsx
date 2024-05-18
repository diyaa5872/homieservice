
import Navbar from './Navbar'
import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const professions = [
    { title: 'Plumber' },
    { title: 'Carpenter'},
    { title: 'Painter'},
    { title: 'Contarctor'}
  ];

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });

const Mainuser = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{
        backgroundColor:'primary.main',
        color: "white",
        height: "200px",
        width: "100%",
        padding:"16px",
        '&:hover':{
            backgroundColor:"primary.light",
        },
      }}>
        <h2>how can we help </h2>
        <h1>you today?</h1>
        <FormControl id="filter-demo">
      <Autocomplete
        placeholder="Search "
        options={professions}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
      />
    </FormControl>
      </Box>
      <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
     <Card sx={{ minHeight: '280px', width: 420 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.ZUrZyE7KaA23hrc5ZVsSpwHaE8?w=291&h=195&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Plumber
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced people
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    {/* <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
    <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.B3lPxf_fH4DTrUPCCddpTAHaE8?w=291&h=194&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.B3lPxf_fH4DTrUPCCddpTAHaE8?w=291&h=194&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Electrician
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced elctricians
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
     <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Carpenter
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced carpenters
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
         <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Carpenter
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced carpenters
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
         <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Carpenter
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced carpenters
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
         <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Carpenter
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced carpenters
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid xs={6} container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
         <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          srcSet="https://th.bing.com/th/id/OIP.FAdiGOmaoK8IgV2sHcEODAHaFb?w=267&h=196&c=7&r=0&o=5&pid=1.7"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          Carpenter
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          Our experienced carpenters
        </Typography>
      </CardContent>
    </Card>
    </Grid> */}
      
    </Grid>
    </div>
  )
}

export default Mainuser
