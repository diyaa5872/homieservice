import * as React from 'react';
import axios from 'axios';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (!name) return { children: '?' };
  const nameParts = name.split(' ');
  const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : name[0];
  return {
    sx: {
      bgcolor: stringToColor(name),
      borderColor: '#EAD7BB',
      borderWidth: 2,
      borderStyle: 'solid',
    },
    children: initials,
  };
}

export default function JobCard({ onAcceptJob, onGoToJob, onCompletionOfJob, buttonText, data }) {
  const [jobAccepted, setJobAccepted] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/getThatUser?id=${data.userId}`);
        console.log(response);
        console.log(response.data.fullName)
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [data.userId]);

  const handleAcceptJob = async () => {
    try {
      const accepteddata = await axios.put(`http://localhost:8000/api/v1/requests/accept?workerId=${data.workerId}&userId=${data.userId}&accepted=false&currentstatus='pending'`);
      console.log(accepteddata);
      setJobAccepted(true);
      onAcceptJob();
    } catch (error) {
      console.error('Error accepting job:', error);
    }
  };

  const handleCancelJob = async () => {
    try {
      const cancelled = await axios.delete(`http://localhost:8000/api/v1/requests/cancel?userId=${data.userId}&workerId=${data.workerId}&currentstatus='pending'&workStatus='pending'`);
      console.log(cancelled.data);
      setJobAccepted(false);
      navigate('/mainworkerpage');
    } catch (error) {
      console.error('Error canceling job:', error);
    }
  };

  const handleFinishJob = async () => {
    try {
      const finished = await axios.put(`http://localhost:8000/api/v1/requests/completed?userId=${data.userId}&workerId=${data.workerId}&currentstatus='accepted'&isCompleted=false`);
      console.log(finished.data);
      onCompletionOfJob();
    } catch (error) {
      console.error('Error finishing job:', error);
    }
  };
  // const handleFinishJob = () => {
  //   setActiveStep(3);
  //   setTimeout(() => {
  //     navigate('/mainworkerpage');
  //   }, 1000);
  // };

  const handleButtonClick = () => {
    if (buttonText === "Accept Job") {
      handleAcceptJob();
    } else if (buttonText === "Go to Job") {
      onGoToJob();
    } else if (buttonText === "Completion of Job") {
      handleFinishJob();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <Stack direction="row" spacing={2} sx={{ bgcolor: "#BCA37F" }}>
            <Avatar {...stringAvatar(userData.fullName)} />
          </Stack>
        </AspectRatio>
        <CardContent>
          <Sheet
            sx={{
              bgcolor: '#EAD7BB',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Date
              </Typography>
              <Typography fontWeight="lg">{new Date(data.date).toLocaleDateString()}</Typography>
            </div>
            <div>
              <Typography level="body-s" fontWeight="lg">
                Timings:
              </Typography>
              <Typography fontWeight="lg">{data.timeSlot.start} - {data.timeSlot.end}</Typography>
            </div>
          </Sheet>
          <Sheet
            sx={{
              bgcolor: '#EAD7BB',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-s" fontWeight="lg">
                Address:
              </Typography>
              <Typography fontWeight="lg">{data.address}</Typography>
            </div>
            <div>
              <Typography level="body-s" fontWeight="lg">
                Appointment Notes:
              </Typography>
              <Typography fontWeight="lg">{data.notes}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            {jobAccepted ? (
              <Button variant="solid" sx={{ backgroundColor: '#113946', color: '#fff' }} onClick={handleButtonClick}>
                {buttonText}
              </Button>
            ) : (
              <>
                <Button variant="outlined" sx={{ backgroundColor: '#113946', color: '#fff' }} onClick={handleCancelJob}>
                  Cancel Job
                </Button>
                <Button variant="solid" sx={{ backgroundColor: '#BCA37F', color: '#fff' }} onClick={handleButtonClick}>
                  Accept Job
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}



// import * as React from 'react';
// import axios from 'axios';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import {useNavigate} from 'react-router-dom';

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';
//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

// export default function JobCard({ onAcceptJob, onGoToJob, onCompletionOfJob, buttonText, data }) {
//   const [jobAccepted, setJobAccepted] = React.useState(false);
//   const navigate=useNavigate();

//   const handleAcceptJob = async () => {
//     try {
//       const accepteddata=await axios.put(`http://localhost:8000/api/v1/requests/accept?workerId=${data.workerId}&userId=${data.userId}&accepted=false&currentstatus='pending'`);
//       console.log(accepteddata);
//       setJobAccepted(true);
//       onAcceptJob();
//     } catch (error) {
//       console.error('Error accepting job:', error);
//     }
//   };

//   const handleCancelJob = async () => {
//     try {
//       const cancelled=await axios.delete(`http://localhost:8000/api/v1/requests/cancel?userId=${data.userId}&workerId=${data.workerId}&currentstatus='pending'&workStatus='pending'`);
//       console.log(cancelled.data);
//       setJobAccepted(false);
//       navigate('/mainworkerpage');
//     } catch (error) {
//       console.error('Error canceling job:', error);
//     }
//   };

//   const handleFinishJob = async () => {
//     try {
//       const finished=await axios.put(`http://localhost:8000/api/v1/requests/completed?userId=${data.userId}&workerId=${data.workerId}&currentstatus='accepted'&isCompleted=false`);
//       console.log(finished.data);
//       onCompletionOfJob();
//     } catch (error) {
//       console.error('Error finishing job:', error);
//     }
//   };

//   const handleButtonClick = () => {
//     if (buttonText === "Accept Job") {
//       handleAcceptJob();
//     } else if (buttonText === "Go to Job") {
//       onGoToJob();
//     } else if (buttonText === "Completion of Job") {
//       handleFinishJob();
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         position: 'relative',
//         overflow: { xs: 'auto', sm: 'initial' },
//       }}
//     >
//       <Card
//         orientation="horizontal"
//         sx={{
//           width: '100%',
//           flexWrap: 'wrap',
//           [`& > *`]: {
//             '--stack-point': '500px',
//             minWidth:
//               'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
//           },
//           overflow: 'auto',
//           resize: 'horizontal',
//         }}
//       >
//         <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
//           <Stack direction="row" spacing={2}>
//             {/* <Avatar {...stringAvatar(data.userId)} /> */}
//           </Stack>
//         </AspectRatio>
//         <CardContent>
//           <Sheet
//             sx={{
//               bgcolor: 'background.level1',
//               borderRadius: 'sm',
//               p: 1.5,
//               my: 1.5,
//               display: 'flex',
//               gap: 2,
//               '& > div': { flex: 1 },
//             }}
//           >
//             <div>
//               <Typography level="body-xs" fontWeight="lg">
//                 Date
//               </Typography>
//               <Typography fontWeight="lg">{new Date(data.date).toLocaleDateString()}</Typography>
//             </div>
//             <div>
//               <Typography level="body-s" fontWeight="lg">
//                 Timings:
//               </Typography>
//               <Typography fontWeight="lg">{data.timeSlot.start} - {data.timeSlot.end}</Typography>
//             </div>
//           </Sheet>
//           <Sheet
//             sx={{
//               bgcolor: 'background.level1',
//               borderRadius: 'sm',
//               p: 1.5,
//               my: 1.5,
//               display: 'flex',
//               gap: 2,
//               '& > div': { flex: 1 },
//             }}
//           >
//             <div>
//               <Typography level="body-s" fontWeight="lg">
//                 Address:
//               </Typography>
//               <Typography fontWeight="lg">{data.address}</Typography>
//             </div>
//             <div>
//               <Typography level="body-s" fontWeight="lg">
//                 Appointment Notes:
//               </Typography>
//               <Typography fontWeight="lg">{data.notes}</Typography>
//             </div>
//           </Sheet>
//           <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
//             {jobAccepted ? (
//               <Button variant="solid" color="primary" onClick={handleButtonClick}>
//                 {buttonText}
//               </Button>
//             ) : (
//               <>
//                 <Button variant="outlined" color="neutral" onClick={handleCancelJob}>
//                   Cancel Job
//                 </Button>
//                 <Button variant="solid" color="primary" onClick={handleButtonClick}>
//                   Accept Job
//                 </Button>
//               </>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
