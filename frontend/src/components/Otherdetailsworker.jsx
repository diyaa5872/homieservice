

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navbarworker from './Navbarworker';
import Addressworker from './Addressworker';
import Uploadfilesworker from './Uploadfilesworker';
import Extradetailsform from './Extradetailsform';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { data } from 'jquery';

const steps = [
  {
    label: 'Extra details',
    description: '',
    formComponent: <Extradetailsform />
  },
  {
    label: 'Add your Address',
    description: '',
    formComponent: <Addressworker />
  },
  {
    label: 'Upload Files',
    description: '',
    formComponent: <Uploadfilesworker />
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitHandle = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const address_user = {
        street: data.get('street') || "",
        city: data.get('city') || "",
        state: data.get('state') || "",
        country: data.get('country') || "",
        postalCode: data.get('postalCode') || ""
      };
      console.log(address_user);

      const extradetails={
        contact_no: data.get('contact_no') || "",
        experienceYears: data.get('experienceYears') || "",
        age: data.get('age') || "",
        homeVisitFee: data.get('homeVisitFee') ||  "",
        description:  data.get('description') || ""
      }

      console.log(extradetails);

      const images={
        coverImage: data.get('coverImage') || "",
        shopPictures: data.get('shopPictures') || ""
      }
      console.log(images);
  
      const workerId= localStorage.getItem('workerno');
      console.log(workerId);
      // Axios request to fetch data from the backend
      const response = await axios.put(`http://localhost:8000/api/v1/workers/addotherdetails?workerId=${workerId}`,{
        ...address_user,
        ...images,
        ...extradetails
      });
      
      // Log the response data
      console.log(response.data);
      
      // Navigate to the main worker page after successful registration
      navigate('/mainworkerpage');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Navbarworker />
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.formComponent}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={submitHandle} sx={{ mt: 1, mr: 1 }}>
              Completed Registration
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}
