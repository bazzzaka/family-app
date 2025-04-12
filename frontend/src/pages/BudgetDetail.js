import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

const BudgetDetail = () => {
  const { budgetId } = useParams();
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5">Budget Details: {budgetId}</Typography>
        <Typography variant="body1">
          This is a placeholder for the budget detail page. In a complete implementation, 
          this would show detailed information about a specific budget, including transactions,
          charts, and budget management tools.
        </Typography>
      </Paper>
    </Box>
  );
};

export default BudgetDetail; 