import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { AccountTree as TreeIcon } from '@mui/icons-material';

const FamilyGroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  
  const navigateToFamilyTree = () => {
    navigate(`/family-tree/${groupId}`);
  };
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Family Group: {groupId}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<TreeIcon />}
            onClick={navigateToFamilyTree}
          >
            View Family Tree
          </Button>
        </Box>
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