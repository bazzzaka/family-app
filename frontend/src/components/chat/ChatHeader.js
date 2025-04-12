import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  AvatarGroup,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneIcon from '@mui/icons-material/Phone';

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

const ChatHeader = ({ chatRoom }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/messages');
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <IconButton 
        edge="start" 
        onClick={handleBack}
        sx={{ mr: 1, display: { sm: 'flex', md: 'none' } }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      {chatRoom.type === 'direct' ? (
        <Avatar 
          src={chatRoom.participants[0].avatar} 
          sx={{ 
            width: 40, 
            height: 40, 
            mr: 2,
            bgcolor: getAvatarColor(chatRoom.participants[0].name)
          }}
        >
          {getInitials(chatRoom.participants[0].name)}
        </Avatar>
      ) : (
        <AvatarGroup 
          max={2}
          sx={{ 
            mr: 2,
            '& .MuiAvatar-root': { width: 40, height: 40 }
          }}
        >
          {chatRoom.participants.slice(0, 3).map(participant => (
            <Avatar 
              key={participant.id}
              src={participant.avatar}
              sx={{ bgcolor: getAvatarColor(participant.name) }}
            >
              {getInitials(participant.name)}
            </Avatar>
          ))}
        </AvatarGroup>
      )}
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div">
          {chatRoom.name}
        </Typography>
        
        {chatRoom.type === 'group' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              label={`${chatRoom.participants.length} members`} 
              size="small" 
              variant="outlined"
              sx={{ mr: 1, height: 20, fontSize: '0.7rem' }}
            />
          </Box>
        )}
      </Box>
      
      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Call">
          <IconButton color="primary">
            <PhoneIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Video call">
          <IconButton color="primary">
            <VideocamOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Chat info">
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="More options">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

ChatHeader.propTypes = {
  chatRoom: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['direct', 'group']).isRequired,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default ChatHeader; 