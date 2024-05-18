import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import Navbar from './Navbar';
import TabList from '@mui/joy/TabList';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Tab from '@mui/joy/Tab';
import Stack from '@mui/joy/Stack';
import UserCard from './Card';
import { TabPanel } from '@mui/joy';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import Add from '@mui/icons-material/Add';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MediaCover from './Image';


export default function TabsFlex() {
  return (
    <>
    <Navbar />
    <UserCard />
    <Box
      height={450}
      width='100%'
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
          <Stack spacing={2} sx={{ width: '100%' }}>
      <Tabs aria-label="Flex one tabs">
        <TabList tabFlex={1}>
          <Tab>About</Tab>
          <Tab
            sx={{
              wordBreak: 'break-word',
            }}
          >
            Reviews
          </Tab>
          <Tab>Portfolio</Tab>
        </TabList>
        <TabPanel value={0}>
            <b>experience: </b><span>6 years</span>
            <h3>description: </h3>
            <span>i has been working from past 5 years</span>
        </TabPanel>
        <TabPanel value={1}>
            <h2>Reviews:</h2>
            <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
      }}
    >
      <Card size="lg" variant="outlined">
        <Chip size="sm" variant="outlined" color="neutral">
          Review
        </Chip>
        <Typography level="h3">Diya</Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem>
            i am happy with his work
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            Rating: 
            <Typography fontSize="l" textColor="text.tertiary">
               <span>4</span>
            </Typography>
          </Typography>
        </CardActions>
      </Card>
      <Card size="lg" variant="outlined">
        <Chip size="sm" variant="outlined" color="neutral">
          Review
        </Chip>
        <Typography level="h3">Diya</Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem>
            i am happy with his work
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            Rating: 
            <Typography fontSize="l" textColor="text.tertiary">
               <span>4</span>
            </Typography>
          </Typography>
        </CardActions>
      </Card>
    </Box>
        </TabPanel>
        <TabPanel value={2}>

        </TabPanel>
      </Tabs>
    </Stack>
    </Box>

    <Button endDecorator={<KeyboardArrowRight />} width='100%' color="success">
  Book now
</Button>
    </>
  );
}