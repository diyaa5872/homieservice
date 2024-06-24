import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) {
    // Handle case where name is undefined or null
    return {
      sx: {
        bgcolor: '#BCA37F', // Fallback background color for Avatar
        color: '#fff', // Fallback text color for Avatar
      },
      children: '',
    };
  }

  return {
    sx: {
      bgcolor: '#BCA37F', // Background color for Avatar
      color: '#fff', // Text color for Avatar
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
  };
}

export default function UserCard({ data }) {
  const navigate = useNavigate();

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
          bgcolor: '#FFF2D8', // Background color for the card
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <Stack direction="row" spacing={2} sx={{ bgcolor: '#113946', p: 2 }}>
            <Avatar {...stringAvatar(data.fullName)} />
          </Stack>
        </AspectRatio>
        <CardContent>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1, bgcolor: '#EAD7BB', p: 1 }, // Reduced padding to 1
            }}
          >
            <div>
              <Typography
                level="body-xs"
                fontWeight="lg"
                sx={{ color: '#000', p: '10px' }} // Adjusted padding for the customer name
              >
                <h2>Customer Name:</h2>
              </Typography>
              <Typography fontWeight="lg" sx={{ color: '#000', p: '10px' }}>
                {data.fullName}
              </Typography>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
