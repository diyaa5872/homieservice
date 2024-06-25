
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Requestsuser() {
    const theme = useTheme();
    const [requests, setRequests] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const userId = localStorage.getItem('userId');
    console.log(userId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/requests/requestsuser?userId=${userId}`);
                console.log(response.data);
                setRequests(response.data.requests); // Assuming your backend returns the requests array
                setLoading(false); // Set loading to false after data fetch
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const fetchWorkersData = async () => {
            try {
                // Assuming each request object has a workerId field
                const workerIds = requests.map(request => request.workerId);
                const workersData = await Promise.all(workerIds.map(async (workerId) => {
                    const response = await axios.get(`http://localhost:8000/api/v1/workers/work?id=${workerId}`);
                    return response.data; // Adjust this based on your backend response structure
                }));
                setWorkers(workersData);
                console.log(workersData);
            } catch (error) {
                console.error('Error fetching workers data:', error);
            }
        };

        if (requests.length > 0) {
            fetchWorkersData();
        }
    }, [requests]);

    if (loading) {
        return <CircularProgress />; // Show loader if data is loading
    }

    return (
        <>
            <Navbar />
            <Box component="section" sx={{ p: 2, border: '3px dashed white',bgcolor:"#BCA37F" }}>
               <h2>Your Requests</h2> 
            </Box>
            {requests.length > 0 ? (
                requests.map((request, index) => (
                    <Card key={request._id} sx={{ display: 'flex', marginBottom: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    <h3>{request.workStatus}</h3>
                                </Typography>
                                {workers.length > 0 && workers[index] && ( // Check if workers[index] exists
                                    <>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            <h4>{workers[index].fullName}</h4> {/* Adjust with actual data fields */}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {workers[index].occupation} {/* Adjust with actual data fields */}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                
                            </Box>
                        </Box>
                        {workers.length > 0 && workers[index] && workers[index].coverImage && ( // Check if workers[index].coverImage exists
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={`http://localhost:8000/temp/${workers[index].coverImage}`}
                                alt="Request Cover"
                            />
                        )}
                        {!workers[index] || !workers[index].coverImage && ( // Handle case where coverImage is not available
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="/static/images/default.jpg"
                                alt="Default Cover"
                            />
                        )}
                    </Card>
                ))
            ) : (
                <Typography>No requests found.</Typography> // Show message if no requests are found
            )}
        </>
    );
}



// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import Navbar from './Navbar';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Requestsuser() {
//     const theme = useTheme();
//     const [request, setRequest] = useState(null);
//     const userId = localStorage.getItem('userId');
//     console.log(userId);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/v1/requests/requestsuser?userId=${userId}`);
//                 console.log(response.data);
//                 setRequest(response.data); // Assuming your backend returns the request data
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, [userId]);

//     return (
//         <>
//             <Navbar />
//             {request ? (
//                 <Card sx={{ display: 'flex' }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                         <CardContent sx={{ flex: '1 0 auto' }}>
//                             <Typography component="div" variant="h5">
//                                 {request.title} {/* Adjust with actual data fields */}
//                             </Typography>
//                             <Typography variant="subtitle1" color="text.secondary" component="div">
//                                 {request.artist} {/* Adjust with actual data fields */}
//                             </Typography>
//                         </CardContent>
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                             <IconButton aria-label="previous">
//                                 {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                             </IconButton>
//                             <IconButton aria-label="play/pause">
//                                 <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                             </IconButton>
//                             <IconButton aria-label="next">
//                                 {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                             </IconButton>
//                         </Box>
//                     </Box>
//                     <CardMedia
//                         component="img"
//                         sx={{ width: 151 }}
//                         image="/static/images/cards/live-from-space.jpg"
//                         alt="Live from space album cover"
//                     />
//                 </Card>
//             ) : (
//                 <Typography>Loading...</Typography>
//             )}
//         </>
//     );
// }




