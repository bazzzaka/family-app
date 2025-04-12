import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar,
  Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

// Helper function to format timestamp
const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return format(date, 'h:mm a');
};

// Helper to get avatar color based on name
const getAvatarColor = (name) => {
  const colors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', 
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
    '#FFC107', '#FF9800', '#FF5722'
  ];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Helper to get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const MessageItem = ({ message, isOwnMessage }) => {
  // Determine message status icon
  const getStatusIcon = () => {
    if (!isOwnMessage) return null;
    
    switch (message.status) {
      case 'sent':
        return <DoneIcon fontSize="small" color="action" />;
      case 'delivered':
        return <DoneAllIcon fontSize="small" color="action" />;
      case 'read':
        return <DoneAllIcon fontSize="small" color="primary" />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        mb: 1
      }}
    >
      {!isOwnMessage && (
        <Avatar
          src={message.sender.avatar}
          sx={{ 
            mr: 1,
            bgcolor: getAvatarColor(message.sender.name)
          }}
        >
          {getInitials(message.sender.name)}
        </Avatar>
      )}
      
      <Box sx={{ maxWidth: '70%' }}>
        {!isOwnMessage && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block', ml: 1, mb: 0.5 }}
          >
            {message.sender.name}
          </Typography>
        )}
        
        <Paper
          elevation={1}
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: isOwnMessage ? 'primary.light' : 'background.default',
            color: isOwnMessage ? 'white' : 'text.primary',
            wordBreak: 'break-word'
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
        </Paper>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
            mt: 0.5,
            mx: 1
          }}
        >
          <Tooltip title={format(new Date(message.timestamp), 'PPpp')}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
              {formatMessageTime(message.timestamp)}
            </Typography>
          </Tooltip>
          
          {getStatusIcon()}
        </Box>
      </Box>
    </Box>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    status: PropTypes.string,
    sender: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }).isRequired
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired
};

export default MessageItem; 