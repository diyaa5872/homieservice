import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import UserCard from './Card';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Plumberpages() {
  const navigate = useNavigate();
  const { profession } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/working?profession=${profession}`);
        console.log(response);
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
      <Box
        component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      >
        <div>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }} onClick={handleCardClick}>
            <CardCover>
              <img
                src="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
                loading="lazy"
                alt={profession}
              />
            </CardCover>
            <CardContent>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 18 }}
              >
                {profession}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        data && (
          <>
            {data.map((worker) => (
              <UserCard key={worker._id} profession={profession} data={worker} />
            ))}
          </>
        )
      )}
    </>
  );
}


// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Box from '@mui/joy/Box';
// import UserCard from './Card';
// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import Navbar from './Navbar';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function Plumberpages() {
//   const navigate = useNavigate();
//   const { profession } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://localhost:8000/api/v1/workers/working/${profession}`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [profession]);

//   const handleCardClick = () => {
//     // Navigate to the desired route when the card is clicked
//     navigate('/request');
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         component="ul"
//         sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
//       >
//         {/* Wrap the Card component with a clickable element */}
//         <div>
//           <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }} onClick={handleCardClick}>
//             <CardCover>
//               <img
//                 src="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
//                 srcSet="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
//                 loading="lazy"
//                 alt=""
//               />
//             </CardCover>
//             <CardContent>
//               <Typography
//                 level="body-lg"
//                 fontWeight="lg"
//                 textColor="#fff"
//                 mt={{ xs: 12, sm: 18 }}
//               >
//                 {profession}
//               </Typography>
//             </CardContent>
//           </Card>
//         </div>
//       </Box>
//       {loading ? (
//         <Typography>Loading...</Typography>
//       ) : (
//         data && (
//           <>
//             <UserCard profession={profession} data={data}/>
//             <UserCard profession={profession} data={data}/>
//           </>
//         )
//       )}
//     </>
//   );
// }


// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import UserCard from './Card';
// import {useEffect,useState} from 'react';
// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import Navbar from './Navbar';
// import { useNavigate,useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function Plumberpages() {
//   const navigate = useNavigate();
//   const {profession}=useParams();
//   const [data,setData]=useState(null);
//   const [loading,setLoading]=useState(true);
  
//   const handleCardClick = () => {
//     // Navigate to the desired route when the card is clicked
//     navigate('/request');
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         component="ul"
//         sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
//       >
//         {/* Wrap the Card component with a clickable element */}
//         <div>
//           <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }} onClick={handleCardClick} >
//             <CardCover>
//               <img
//                 src="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
//                 srcSet="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
//                 loading="lazy"
//                 alt=""
//               />
//             </CardCover>
//             <CardContent>
//               <Typography
//                 level="body-lg"
//                 fontWeight="lg"
//                 textColor="#fff"
//                 mt={{ xs: 12, sm: 18 }}
//               >
//                 {profession}
//               </Typography>
//             </CardContent>
//           </Card>
//         </div>
//       </Box>
//       <UserCard profession={profession}/>
//       <UserCard profession={profession}/>
//     </>
//   );
// }
