import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

export default function Unavailablepage() {
  return (
    <>
    <Navbar />
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      This Page does't exist.
    </Box>
    </>
  );
}