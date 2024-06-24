import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import ChatLists from './ChatLists';
import axios from 'axios';

export default function Chatcontainer() {
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        const id = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8000/api/v1/users/getThatUser?id=${id}`);

        // Log the entire response for debugging
        console.log('API Response:', response);

        // Check if the response status is 200 (OK) and has valid data structure
        if (response.status === 200 && response.data  && response.data.fullName) {
          setUsername(response.data.fullName);
        } else {
          console.error('Invalid response structure or missing username:', response);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <Navbar />
      <Box component="section" sx={{ p: 2, border: '2px dashed blue' }}>
        {username ? ` ${username}` : 'Loading...'}
      </Box>
      <ChatLists />
    </>
  );
}




// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { Chat, Channel, ChannelHeader, MessageInput, MessageList } from 'stream-chat-react';
// import { StreamChat } from 'stream-chat';
// import Navbar from './Navbar';

// const ChatBox = () => {
//   const [client, setClient] = useState(null);
//   const [channels, setChannels] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState(null);
//   const [open, setOpen] = useState(false);

//   const userId = localStorage.getItem('userId'); // Get userId from localStorage
//   const apiKey = 'YOUR_API_KEY';
//   const userToken = 'YOUR_USER_TOKEN'; // Ensure this token is correctly generated for the userId

//   useEffect(() => {
//     const client = StreamChat.getInstance(apiKey);

//     const connectUser = async () => {
//       try {
//         await client.connectUser(
//           { id: userId },
//           userToken
//         );
//         setClient(client);

//         const channelResponse = await client.queryChannels({
//           members: { $in: [userId] },
//         });

//         setChannels(channelResponse);
//       } catch (error) {
//         console.error('Error connecting user:', error);
//       }
//     };

//     if (userId) {
//       connectUser();
//     }

//     return () => {
//       client.disconnectUser();
//     };
//   }, [apiKey, userId, userToken]);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   const handleChannelClick = (channel) => {
//     setSelectedChannel(channel);
//     setOpen(false);
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="chat-container">
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
//             <i className="fas fa-bars" />
//           </IconButton>
//           <Typography variant="h6" className="title">
//             Chatbox
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer open={open} onClose={handleDrawerToggle}>
//         <List>
//           {channels.map((channel) => (
//             <ListItem key={channel.id} onClick={() => handleChannelClick(channel)}>
//               <ListItemText primary={channel.data.name} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       {selectedChannel && client && (
//         <Chat client={client} theme="messaging light">
//           <Channel channel={selectedChannel}>
//             <ChannelHeader />
//             <MessageList />
//             <MessageInput />
//           </Channel>
//         </Chat>
//       )}
//     </div>
//     </>
//   );
// };

// export default ChatBox;
