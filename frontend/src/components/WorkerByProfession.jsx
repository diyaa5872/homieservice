import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const WorkersByProfession = () => {
  const { profession } = useParams();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/workers/work/${profession}`);
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, [profession]);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          p: 2,
        }}
      >
        {workers.map(worker => (
          <UserCard key={worker._id} worker={worker} />
        ))}
      </Box>
    </div>
  );
};

export default WorkersByProfession;
