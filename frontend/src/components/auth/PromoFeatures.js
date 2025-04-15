import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChatIcon from '@mui/icons-material/Chat';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SecurityIcon from '@mui/icons-material/Security';

// Create motion components
const MotionListItem = motion(ListItem);

const PromoFeatures = () => {
  const theme = useTheme();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10
      } 
    }
  };
  
  const features = [
    { 
      icon: <FamilyRestroomIcon fontSize="large" />, 
      title: 'Connect with Family',
      description: 'Bring your entire family together in one private space' 
    },
    { 
      icon: <CalendarMonthIcon fontSize="large" />, 
      title: 'Family Calendar',
      description: 'Coordinate events and activities with shared calendars' 
    },
    { 
      icon: <PhotoLibraryIcon fontSize="large" />, 
      title: 'Photo Sharing',
      description: 'Create albums and share memories with your loved ones' 
    },
    { 
      icon: <ChatIcon fontSize="large" />, 
      title: 'Private Messaging',
      description: 'Keep conversations going with individual or group chats' 
    },
    { 
      icon: <TaskAltIcon fontSize="large" />, 
      title: 'Task Management',
      description: 'Assign and track family chores and responsibilities' 
    },
    { 
      icon: <SecurityIcon fontSize="large" />, 
      title: 'Privacy & Security',
      description: 'Your family data stays private and secure' 
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4,
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
          : 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        sx={{ 
          position: 'relative',
          zIndex: 1,
          mb: 4
        }}
      >
        Family App
      </Typography>
      
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          position: 'relative',
          zIndex: 1,
          mb: 4,
          fontWeight: 300
        }}
      >
        Bring your family closer together
      </Typography>
      
      <List 
        component={motion.ul}
        variants={container}
        initial="hidden"
        animate="show"
        sx={{ 
          position: 'relative',
          zIndex: 1,
          '& .MuiListItemIcon-root': {
            color: 'white'
          }
        }}
      >
        {features.map((feature, index) => (
          <MotionListItem 
            key={index} 
            variants={item}
            sx={{ 
              px: 0, 
              py: 1.5,
              alignItems: 'flex-start'
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {feature.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {feature.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {feature.description}
                </Typography>
              }
            />
          </MotionListItem>
        ))}
      </List>
    </Box>
  );
};

export default PromoFeatures; 