import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import UserCard from './Card';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from './Navbar';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Plumberpages = () => {
    const navigate = useNavigate();
    const { profession } = useParams();
    const { state } = useLocation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/workers/working?profession=${profession}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [profession]);

    const handleCardClick = () => {
        navigate('/request');
    };

    return (
        <>
            <Navbar />
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Card sx={{ width: '100%', margin: 0 }} component="li">
                    <CardCover>
                        <img
                            src={state?.imageSrc || 'https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=1920&h=400&c=1&rs=1&qlt=90&r=0&pid=InlineBlock'}
                            loading="lazy"
                            alt={profession}
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                    </CardCover>
                    <CardContent>
                        <Typography
                            level="body-lg"
                            fontWeight="lg"
                            textColor="#fff"
                            mt={{ xs: 12, sm: '100%' }}
                        >
                            {profession}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                data && data.length > 0 ? (
                    data.map((worker) => (
                        <UserCard key={worker._id} profession={profession} data={worker} />
                    ))
                ) : (
                    <Typography>No Registered Worker...</Typography>
                )
            )}
        </>
    );
};

export default Plumberpages;



