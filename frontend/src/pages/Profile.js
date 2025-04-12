import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5">User Profile</Typography>
        <Typography variant="body1">
          This is a placeholder for the user profile page. In a complete implementation, 
          this would show the user's profile information and allow editing it.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile; 