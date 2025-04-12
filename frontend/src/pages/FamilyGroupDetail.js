import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

const FamilyGroupDetail = () => {
  const { groupId } = useParams();
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5">Family Group: {groupId}</Typography>
        <Typography variant="body1">
          This is a placeholder for the family group detail page. In a complete implementation, 
          this would show information about the family group, its members, and allow managing
          the group.
        </Typography>
      </Paper>
    </Box>
  );
};

export default FamilyGroupDetail; 