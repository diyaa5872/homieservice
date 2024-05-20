import * as React from 'react';
import Box from '@mui/joy/Box';
import UserCard from './Card';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from './Navbar';
import { useNavigate,useParams } from 'react-router-dom';

export default function Plumberpages() {
  const navigate = useNavigate();
  const {profession}=useParams();

  const handleCardClick = () => {
    // Navigate to the desired route when the card is clicked
    navigate('/request');
  };

  return (
    <>
      <Navbar />
      <Box
        component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      >
        {/* Wrap the Card component with a clickable element */}
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
            <CardCover>
              <img
                src="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
                srcSet="https://th.bing.com/th/id/OIP.IU0j4FNdFRCCSi1gbsIy0gHaE8?w=89&h=90&c=1&rs=1&qlt=90&r=0&pid=InlineBlock"
                loading="lazy"
                alt=""
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
      <UserCard />
      <UserCard />
    </>
  );
}
