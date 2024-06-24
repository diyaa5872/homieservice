import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const InputText = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderTop: '1px solid #ccc',
      }}
    >
      <TextField
        id="filled-basic"
        label="Enter your message"
        variant="filled"
        fullWidth
        sx={{ marginBottom: '0.5rem' }}
      />
      <Button variant="outlined" href="#outlined-buttons" fullWidth>
        Send
      </Button>
    </Box>
  );
};

export default InputText;
