import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

// This will be replaced with actual API calls
import { mockChatRooms, mockMessages } from '../../utils/mockData';

const ChatRoom = () => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch chat room details
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        // Simulate API call
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          const room = mockChatRooms.find(room => room.id === roomId);
          if (!room) {
            throw new Error('Chat room not found');
          }
          setChatRoom(room);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChatRoom();
  }, [roomId]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          // Filter mock messages for this chat room
          const roomMessages = mockMessages.filter(msg => msg.chatRoomId === roomId);
          setMessages(roomMessages);
        }, 1200);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    if (chatRoom) {
      fetchMessages();
    }
  }, [chatRoom, roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (content) => {
    if (!content.trim()) return;

    // In a real app, this would be an API call to send the message
    const newMessage = {
      id: Date.now().toString(),
      chatRoomId: roomId,
      sender: {
        id: 'currentUser', // This would be the actual logged-in user
        name: 'Current User',
        avatar: ''
      },
      content,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!chatRoom) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Chat room not found</Alert>
      </Box>
    );
  }

  return (
    <Paper sx={{ 
      height: { xs: 'calc(100vh - 120px)', md: 'calc(100vh - 140px)' }, 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <ChatHeader chatRoom={chatRoom} />
      <Divider />
      
      {/* Messages Container */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {messages.length > 0 ? (
          messages.map(message => (
            <MessageItem 
              key={message.id} 
              message={message} 
              isOwnMessage={message.sender.id === 'currentUser'} 
            />
          ))
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <Typography color="text.secondary">
              No messages yet. Send the first message!
            </Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      <Divider />
      
      {/* Message Input */}
      <Box sx={{ p: 2 }}>
        <MessageInput onSendMessage={handleSendMessage} />
      </Box>
    </Paper>
  );
};

export default ChatRoom; 