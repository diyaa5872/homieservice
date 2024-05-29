import Navbar from './Navbar';
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
import {useNavigate}  from  'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const professions = [
    { title: 'Plumber', src:'https://i.pinimg.com/236x/6b/d4/b0/6bd4b0add6ef695e958f156a2601749f.jpg' },
    { title: 'Carpenter',src:'https://i.pinimg.com/236x/dc/05/f0/dc05f08a847bf23bf58d7bccaa20b2ba.jpg' },
    { title: 'Painter',src:'https://i.pinimg.com/236x/15/34/50/153450821fe99a39b4280b7e5528b491.jpg' },
    { title: 'Contractor',src:'https://i.pinimg.com/236x/2f/56/0e/2f560e502cfde55734f4dc8465ea376b.jpg' },
    {title: 'Electrician',src:'https://i.pinimg.com/236x/7b/19/e6/7b19e6c0b293a5e99d7d4f7bf7516250.jpg'},
    {title:'Home helper',src:'https://i.pinimg.com/236x/d5/83/53/d583531dbe3383834e3d0e9e23653adc.jpg'},
    {title: 'labours',src:'https://i.pinimg.com/236x/bc/f3/46/bcf346bd20854f1e65c45d8cdd461b56.jpg'}
];

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
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
    
    const navigate=useNavigate();
    const { profession } = useParams();

    const handleclick=()=>{
        navigate('/categories/:profession');
    }

    return (
        <div>
            <Navbar />
            <Box sx={{
                backgroundColor: 'primary.main',
                color: "white",
                height: "200px",
                width: "100%",
                padding: "16px",
                '&:hover': {
                    backgroundColor: "primary.light",
                },
            }}>
                <h2>How can we help</h2>
                <h1>you today?</h1>
                <FormControl id="filter-demo">
                    <Autocomplete
                        placeholder="Search"
                        options={professions}
                        getOptionLabel={(option) => option.title}
                        filterOptions={filterOptions}
                        sx={{ width: '30%' }}
                    />
                </FormControl>
            </Box>
            <Sheet
                sx={{
                    bgcolor: 'background.level1',
                    borderRadius: 'sm',
                    p: 1.5,
                    width: '100%',
                    my: 1.5,
                }}
            >
                <Grid container spacing={2}>
                    {professions.map((profession, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ minHeight: '300px', width: '100%',cursor: 'pointer' }} onClick={handleclick}>
                                <CardCover>
                                    <img
                                        src={profession.src}
                                        loading="lazy"
                                        alt={profession.title}
                                    />
                                </CardCover>
                                <CardCover
                                    sx={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                    }}
                                />
                                <CardContent sx={{ justifyContent: 'flex-end' }}>
                                    <Typography level="title-lg" textColor="#fff">
                                        {profession.title}
                                    </Typography>
                                    <Typography
                                        startDecorator={<LocationOnRoundedIcon />}
                                        textColor="neutral.300"
                                    >
                                       Our experienced {profession.title.toLowerCase()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Sheet>
        </div>
    );
};

export default Mainuser;

