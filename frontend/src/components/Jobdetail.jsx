import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import AlertTitle from '@mui/material/AlertTitle';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import JobCard from './CardForJobDetail';  // Update this import to match your file structure
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Navbarworker from './Navbarworker';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialSteps = [
  {
    label: 'Job pending',
    description: `-> Go to Job`,
  },
  {
    label: 'Job in progress',
    description: 'Worker is working at the customer\'s home',
  },
  {
    label: 'Job completed',
    description: `After the completion of job`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(initialSteps);
  const [buttonText, setButtonText] = React.useState("Accept Job");
  const [jobData, setJobData] = useState(null); // Updated to handle a single job object
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const workerno = localStorage.getItem('workerno');
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/workers/bookingdetails?workerId=${workerno}&userId=${id}&isCompleted=false`);
        console.log(response.data);
        if (response.data.length > 0) {
          setJobData(response.data[0]); // Assuming response.data is an array with job objects
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAcceptJob = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 0 ? { ...step, label: 'Job accepted' } : step
      )
    );
    setButtonText("Go to Job");
  };

  const handleGoToJob = () => {
    setActiveStep(1);
    setButtonText("Completion of Job");
  };

  const handleCompletionOfJob = () => {
    setActiveStep(2);
  };

  const handleFinishJob = () => {
    setActiveStep(3);
  };

  return (
    <>
      <Navbarworker />
      {jobData && (
        <JobCard
          data={jobData}
          onAcceptJob={handleAcceptJob}
          onGoToJob={handleGoToJob}
          onCompletionOfJob={handleCompletionOfJob}
          buttonText={buttonText}
        />
      )}
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {index === 2 && activeStep === 2 && (
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleFinishJob}>
                      Finish Job
                    </Button>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === 3 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              You have successfully completed the job!
            </Alert>
          </Paper>
        )}
      </Box>
    </>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import AlertTitle from '@mui/material/AlertTitle';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import JobCard from './CardForJobDetail';  // Update this import to match your file structure
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Navbarworker from './Navbarworker';
// import {useState,useEffect} from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const initialSteps = [
//   {
//     label: 'Job pending',
//     description: `-> Go to Job`,
//   },
//   {
//     label: 'Job in progress',
//     description: 'Worker is working at the customer\'s home',
//   },
//   {
//     label: 'Job completed',
//     description: `After the completion of job`,
//   },
// ];

// export default function VerticalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [steps, setSteps] = React.useState(initialSteps);
//   const [buttonText, setButtonText] = React.useState("Accept Job");
//   const [jobData,setJobData]=useState([]);
//   const {id}=useParams();

//   const workerno = localStorage.getItem('workerno');
//   console.log(workerno);

//   useEffect(() => {
//     const fetchData = async () => {
//       const workerno = localStorage.getItem('workerno');
//       console.log(workerno);
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/workers/bookingdetails?workerId=${workerno}&userId=${id}&isCompleted=false`);
//         console.log(response.data);
//         if (response.data.length > 0) {
//           setJobData(response.data[0]); // Assuming response.data is an array with job objects
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [id]); 

//   const handleAcceptJob = () => {
//     setSteps((prevSteps) =>
//       prevSteps.map((step, index) =>
//         index === 0 ? { ...step, label: 'Job accepted' } : step
//       )
//     );
//     setButtonText("Go to Job");
//   };

//   const handleGoToJob = () => {
//     setActiveStep(1);
//     setButtonText("Completion of Job");
//   };

//   const handleCompletionOfJob = () => {
//     setActiveStep(2);
//   };

//   const handleFinishJob = () => {
//     setActiveStep(3);
//   };

//   return (
//     <>
//     <Navbarworker />
//     {jobData && (
//         <JobCard
//           data={jobData}
//           onAcceptJob={handleAcceptJob}
//           onGoToJob={handleGoToJob}
//           onCompletionOfJob={handleCompletionOfJob}
//           buttonText={buttonText}
//         />
//       )}
//       <Box sx={{ maxWidth: 400 }}>
//         <Stepper activeStep={activeStep} orientation="vertical">
//           {steps.map((step, index) => (
//             <Step key={step.label}>
//               <StepLabel
//                 optional={
//                   index === 2 ? (
//                     <Typography variant="caption">Last step</Typography>
//                   ) : null
//                 }
//               >
//                 {step.label}
//               </StepLabel>
//               <StepContent>
//                 <Typography>{step.description}</Typography>
//                 {index === 2 && activeStep === 2 && (
//                   <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//                     <Button variant="contained" color="primary" onClick={handleFinishJob}>
//                       Finish Job
//                     </Button>
//                   </Box>
//                 )}
//               </StepContent>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === 3 && (
//           <Paper square elevation={0} sx={{ p: 3 }}>
//             <Alert severity="success">
//               <AlertTitle>Success</AlertTitle>
//               You have successfully completed the job!
//             </Alert>
//           </Paper>
//         )}
//       </Box>
//     </>
//   );
// }
