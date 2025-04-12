import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Skeleton
} from '@mui/material';
import {
  Message as MessageIcon,
  PhotoLibrary as PhotoIcon,
  People as PeopleIcon,
  MonetizationOn as BudgetIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

// Mock data (would come from API in real app)
const mockFamilyGroups = [
  { id: '1', name: 'Smith Family', members: 7, coverImage: 'https://source.unsplash.com/random/300x200/?family' },
  { id: '2', name: 'Parents & Kids', members: 4, coverImage: 'https://source.unsplash.com/random/300x200/?children' }
];

const mockRecentMessages = [
  { id: '1', sender: 'John Smith', content: 'When are we meeting for dinner?', time: '2 hours ago', avatar: '' },
  { id: '2', sender: 'Sarah Williams', content: 'I uploaded new photos from our trip!', time: '5 hours ago', avatar: '' },
  { id: '3', sender: 'Michael Johnson', content: 'Don\'t forget about the budget meeting tomorrow.', time: 'Yesterday', avatar: '' }
];

const mockRecentPhotos = [
  { id: '1', title: 'Family Trip', image: 'https://source.unsplash.com/random/200x200/?vacation' },
  { id: '2', title: 'Birthday Party', image: 'https://source.unsplash.com/random/200x200/?birthday' },
  { id: '3', title: 'Graduation', image: 'https://source.unsplash.com/random/200x200/?graduation' },
  { id: '4', title: 'Christmas', image: 'https://source.unsplash.com/random/200x200/?christmas' }
];

const mockUpcomingEvents = [
  { id: '1', title: 'Family Dinner', date: 'Tomorrow, 7:00 PM' },
  { id: '2', title: 'Budget Review', date: 'May 15, 3:00 PM' },
  { id: '3', title: 'Sarah\'s Birthday', date: 'May 20' }
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Welcome section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your family
            </Typography>
          </Paper>
        </Grid>
        
        {/* Quick access cards */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Quick Access
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea component={RouterLink} to="/messages">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <MessageIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="subtitle1">Messages</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea component={RouterLink} to="/albums">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <PhotoIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="subtitle1">Photos</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea component={RouterLink} to="/family">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <PeopleIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="subtitle1">Family Groups</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea component={RouterLink} to="/budgets">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <BudgetIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="subtitle1">Budget</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Family groups section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Your Family Groups</Typography>
              <Button component={RouterLink} to="/family" size="small">View All</Button>
            </Box>
            
            {loading ? (
              <Box>
                {[1, 2].map((item) => (
                  <Box key={item} sx={{ display: 'flex', mb: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={80} sx={{ mr: 2 }} />
                    <Box sx={{ width: '100%' }}>
                      <Skeleton width="60%" height={30} />
                      <Skeleton width="40%" />
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Grid container spacing={2}>
                {mockFamilyGroups.map((group) => (
                  <Grid item xs={12} key={group.id}>
                    <Card sx={{ display: 'flex', mb: 1 }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: 80 }}
                        image={group.coverImage}
                        alt={group.name}
                      />
                      <CardContent sx={{ flex: 1, pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
                        <Typography variant="subtitle1" component="div">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {group.members} members
                        </Typography>
                        <Button 
                          component={RouterLink} 
                          to={`/family/${group.id}`}
                          size="small" 
                          sx={{ mt: 1 }}
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    component={RouterLink} 
                    to="/family"
                    startIcon={<PeopleIcon />}
                  >
                    Create New Family Group
                  </Button>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        
        {/* Recent messages section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Messages</Typography>
              <Button component={RouterLink} to="/messages" size="small">View All</Button>
            </Box>
            
            {loading ? (
              <Box>
                {[1, 2, 3].map((item) => (
                  <Box key={item} sx={{ display: 'flex', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ width: '100%' }}>
                      <Skeleton width="60%" height={24} />
                      <Skeleton width="90%" />
                      <Skeleton width="30%" />
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {mockRecentMessages.map((message, index) => (
                  <React.Fragment key={message.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={message.sender} src={message.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="span" variant="subtitle2">
                              {message.sender}
                            </Typography>
                            <Typography component="span" variant="caption" color="text.secondary">
                              {message.time}
                            </Typography>
                          </Box>
                        }
                        secondary={message.content}
                      />
                    </ListItem>
                    {index < mockRecentMessages.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
                <ListItem>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    component={RouterLink} 
                    to="/messages"
                    startIcon={<MessageIcon />}
                  >
                    Open Messages
                  </Button>
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Recent photos section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Photos</Typography>
              <Button component={RouterLink} to="/albums" size="small">View All</Button>
            </Box>
            
            {loading ? (
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={6} sm={3} key={item}>
                    <Skeleton variant="rectangular" width="100%" height={120} />
                    <Skeleton width="60%" sx={{ mt: 1 }} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {mockRecentPhotos.map((photo) => (
                  <Grid item xs={6} sm={3} key={photo.id}>
                    <Card>
                      <CardActionArea component={RouterLink} to={`/albums`}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={photo.image}
                          alt={photo.title}
                        />
                        <CardContent sx={{ pt: 1, pb: 1, '&:last-child': { pb: 1 } }}>
                          <Typography variant="body2" component="div" noWrap>
                            {photo.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
        
        {/* Upcoming events section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Upcoming Events</Typography>
            </Box>
            
            {loading ? (
              <Box>
                {[1, 2, 3].map((item) => (
                  <Box key={item} sx={{ mb: 2 }}>
                    <Skeleton width="70%" height={24} />
                    <Skeleton width="40%" />
                  </Box>
                ))}
              </Box>
            ) : (
              <List>
                {mockUpcomingEvents.map((event, index) => (
                  <React.Fragment key={event.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.title}
                        secondary={event.date}
                      />
                    </ListItem>
                    {index < mockUpcomingEvents.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 