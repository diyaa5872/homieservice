import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';
import Plumberpages from './Plumberpages';

export default function UserCard({profession}) {
  const navigate = useNavigate();

  const handleRequestClick = () => {
    navigate('/request');
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
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://th.bing.com/th?id=OIP._8hIe8lCDfR4lFMJ5cRP_gHaFc&w=291&h=214&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            srcSet="https://th.bing.com/th?id=OIP._8hIe8lCDfR4lFMJ5cRP_gHaFc&w=291&h=214&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            Ramlal
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
            {/* <div>
              <Typography level="body-xs" fontWeight="lg">
                Articles
              </Typography>
              <Typography fontWeight="lg">34</Typography>
            </div> */}
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Rate
              </Typography>
              <Typography fontWeight="lg">250</Typography>
            </div>
            <div>
              <Typography level="body-s" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">8.9</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              Chat
            </Button>
            <Button variant="solid" color="primary" onClick={handleRequestClick}>
              Request
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
