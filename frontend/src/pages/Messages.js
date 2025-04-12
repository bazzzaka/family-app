import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Divider,
  TextField,
  IconButton,
  InputAdornment,
  Badge,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Circle as CircleIcon
} from '@mui/icons-material';

// Mock data - in a real app, this would come from an API
const mockChatRooms = [
  {
    id: '1',
    name: 'Smith Family',
    type: 'group',
    lastMessage: {
      sender: 'Sarah Smith',
      content: 'When is the family dinner?',
      timestamp: '11:30 AM'
    },
    unreadCount: 3,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' },
      { id: '2', name: 'Mary Smith', avatar: '' },
      { id: '3', name: 'Sarah Smith', avatar: '' }
    ]
  },
  {
    id: '2',
    name: 'John Smith',
    type: 'direct',
    lastMessage: {
      sender: 'John Smith',
      content: 'Did you see the photos I shared?',
      timestamp: 'Yesterday'
    },
    unreadCount: 0,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' }
    ]
  },
  {
    id: '3',
    name: 'Birthday Planning',
    type: 'group',
    lastMessage: {
      sender: 'Michael Johnson',
      content: 'I can bring the cake!',
      timestamp: '2 days ago'
    },
    unreadCount: 0,
    participants: [
      { id: '1', name: 'John Smith', avatar: '' },
      { id: '4', name: 'Michael Johnson', avatar: '' },
      { id: '5', name: 'Emily Wilson', avatar: '' }
    ]
  },
  {
    id: '4',
    name: 'Mary Smith',
    type: 'direct',
    lastMessage: {
      sender: 'Mary Smith',
      content: 'Let\'s talk about the budget for this month.',
      timestamp: '1 week ago'
    },
    unreadCount: 0,
    participants: [
      { id: '2', name: 'Mary Smith', avatar: '' }
    ]
  }
];

const Messages = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatRooms(mockChatRooms);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter chat rooms based on search query
  const filteredChatRooms = chatRooms.filter(
    room => room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Get initials from name for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Get avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', 
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
      '#FFC107', '#FF9800', '#FF5722'
    ];
    
    // Simple hash function for name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h5">Messages</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="new message">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper>
        {loading ? (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width="40%" />}
                    secondary={<Skeleton width="70%" />}
                  />
                  <Box>
                    <Skeleton width={40} />
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredChatRooms.length > 0 ? (
              filteredChatRooms.map((room, index) => (
                <React.Fragment key={room.id}>
                  <ListItemButton component={RouterLink} to={`/messages/${room.id}`}>
                    <ListItemAvatar>
                      {room.type === 'direct' ? (
                        <Avatar 
                          src={room.participants[0].avatar} 
                          sx={{ bgcolor: getAvatarColor(room.participants[0].name) }}
                        >
                          {getInitials(room.participants[0].name)}
                        </Avatar>
                      ) : (
                        <Avatar 
                          sx={{ 
                            bgcolor: room.name === 'Smith Family' 
                              ? '#4CAF50' 
                              : '#F44336'
                          }}
                        >
                          {getInitials(room.name)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography component="span" variant="subtitle1">
                            {room.name}
                          </Typography>
                          <Typography component="span" variant="caption" color="text.secondary">
                            {room.lastMessage.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color={room.unreadCount > 0 ? "text.primary" : "text.secondary"}
                          sx={{
                            display: 'flex',
                            fontWeight: room.unreadCount > 0 ? 'bold' : 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: { xs: '200px', sm: '300px', md: '400px' }
                          }}
                        >
                          {room.type === 'group' && `${room.lastMessage.sender}: `}
                          {room.lastMessage.content}
                        </Typography>
                      }
                    />
                    {room.unreadCount > 0 && (
                      <Badge 
                        badgeContent={room.unreadCount} 
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </ListItemButton>
                  {index < filteredChatRooms.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                      No conversations found matching "{searchQuery}"
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Messages; 