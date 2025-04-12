import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  TextField, 
  IconButton, 
  Tooltip,
  InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!message.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Call the parent component's send message handler
      await onSendMessage(message);
      
      // Clear the input field after successful send
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box component="form" onSubmit={handleSendMessage}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPress}
        variant="outlined"
        disabled={isSubmitting}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Add emoji">
                <IconButton size="small" color="primary" edge="start">
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Attach file">
                <IconButton size="small" color="primary" edge="end">
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send message">
                <IconButton 
                  type="submit" 
                  color="primary" 
                  edge="end"
                  disabled={!message.trim() || isSubmitting}
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          }
        }}
      />
    </Box>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired
};

export default MessageInput; 