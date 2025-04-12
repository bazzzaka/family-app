import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Budget = () => {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5">Family Budget Management</Typography>
        <Typography variant="body1">
          This is a placeholder for the budget management interface. In a complete implementation, 
          this would show budget summaries for different family groups and allow creating and managing budgets.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Budget; 