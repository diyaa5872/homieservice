import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ profession, data }) {
  const navigate = useNavigate();

  const handleRequestClick = () => {
    navigate(`/request/${data._id}`);
  };

  const handleChat = () => {
    navigate('/chatbox');
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            content: '"vertical"',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            content: '"horizontal"',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
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
          backgroundColor: '#EAD7BB', // Change background color here
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src={data.coverImage}
            srcSet={data.coverImage}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {data.fullName}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {profession}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
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
                Home Visiting Fee
              </Typography>
              <Typography fontWeight="lg">{data.homeVisitFee}</Typography>
            </div>
            <div>
              <Typography level="body-s" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">8.9</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral" sx={{ backgroundColor: '#BCA37F', color: 'white' }} onClick={handleChat}>
              Chat
            </Button>
            <Button variant="solid" color="primary" sx={{ backgroundColor: '#BCA37F', color: 'white' }} onClick={handleRequestClick}>
              Request
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
