import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BudgetDetail = () => {
  const { budgetId } = useParams();
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: { 
        xs: '100%', 
        sm: '95%', 
        md: '92%', 
        lg: '1200px', 
        xl: '1800px',
        '@media (min-width:2560px)': '2400px',
        '@media (min-width:3840px)': '3200px'
      },
      mx: 'auto',
      width: '100%',
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
        : 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)',
    }}>
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: '16px',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(44, 44, 46, 0.6)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 30px rgba(0, 0, 0, 0.2)'
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Budget Details: {budgetId}
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          This is a placeholder for the budget detail page. In a complete implementation, 
          this would show detailed information about a specific budget, including transactions,
          charts, and budget management tools.
        </Typography>
      </Paper>
    </Box>
  );
};

export default BudgetDetail; 