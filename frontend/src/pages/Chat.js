import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ChatRoom from '../components/chat/ChatRoom';

const Chat = () => {
  const { roomId } = useParams();
  
  return (
    <Box>
      <ChatRoom />
    </Box>
  );
};

export default Chat; 