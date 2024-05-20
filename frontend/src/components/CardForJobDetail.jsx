import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function JobCard({ onAcceptJob, onGoToJob, onCompletionOfJob, buttonText }) {
  const [jobAccepted, setJobAccepted] = React.useState(false);

  const handleButtonClick = () => {
    if (buttonText === "Accept Job") {
      onAcceptJob();
      setJobAccepted(true);
    } else if (buttonText === "Go to Job") {
      onGoToJob();
    } else if (buttonText === "Completion of Job") {
      onCompletionOfJob();
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
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar('Kent Dodds')} />
          </Stack>
        </AspectRatio>
        <CardContent>
          <Grid>
            <Typography fontSize="xl" fontWeight="lg">
              Diya Dhankhar
            </Typography>
          </Grid>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Plumber
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
                Date
              </Typography>
              <Typography fontWeight="lg">2024-05-20</Typography>
            </div>
            <div>
              <Typography level="body-s" fontWeight="lg">
                Timings:
              </Typography>
              <Typography fontWeight="lg">10-3</Typography>
            </div>
          </Sheet>
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
              <Typography level="body-s" fontWeight="lg">
                Address:
              </Typography>
              <Typography fontWeight="lg">c lane,tilak nagar,rohtak,haryana,india</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            {jobAccepted ? (
              <Button variant="solid" color="primary" onClick={handleButtonClick}>
                {buttonText}
              </Button>
            ) : (
              <>
                <Button variant="outlined" color="neutral">
                  Cancel Job
                </Button>
                <Button variant="solid" color="primary" onClick={handleButtonClick}>
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
