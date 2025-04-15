import React, { useState } from 'react';
import { Box, Typography, Card, Button, Grid, Avatar, IconButton, Divider, LinearProgress, Menu, MenuItem, Paper, Stack, Chip, CardContent, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from '@mui/material';
import { styled, alpha } from '@mui/system';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import PieChartIcon from '@mui/icons-material/PieChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  }
}));

const BudgetProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.grey[200], 0.5),
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: value > 90 ? theme.palette.error.main : 
                     value > 75 ? theme.palette.warning.main : 
                     theme.palette.success.main,
  }
}));

// Create motion components using motion.create() instead of motion()
const MotionBox = motion(Box);
const MotionDiv = motion.div;

const Budget = () => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Mock data
  const familyBudgets = [
    { id: 1, name: 'Family Essentials', total: 2500, spent: 1850, color: theme.palette.primary.main },
    { id: 2, name: 'Home Improvements', total: 5000, spent: 2200, color: theme.palette.secondary.main },
    { id: 3, name: 'Kids Education', total: 3000, spent: 1200, color: theme.palette.success.main },
  ];
  
  const personalBudgets = [
    { id: 4, name: 'Groceries', total: 600, spent: 420, color: '#FF6B6B' },
    { id: 5, name: 'Entertainment', total: 300, spent: 275, color: '#48BEFF' },
    { id: 6, name: 'Transportation', total: 200, spent: 180, color: '#FFD166' },
  ];
  
  const recentTransactions = [
    { id: 1, title: 'Grocery Store', amount: -85.97, date: '2023-04-15', icon: <ShoppingCartIcon />, category: 'Groceries', color: '#FF6B6B' },
    { id: 2, title: 'Salary Deposit', amount: 2450.00, date: '2023-04-10', icon: <AttachMoneyIcon />, category: 'Income', color: '#4CAF50' },
    { id: 3, title: 'Restaurant', amount: -64.30, date: '2023-04-08', icon: <FastfoodIcon />, category: 'Dining', color: '#FF9800' },
    { id: 4, title: 'Gas Station', amount: -45.67, date: '2023-04-05', icon: <LocalGasStationIcon />, category: 'Transportation', color: '#FFD166' },
    { id: 5, title: 'Movie Tickets', amount: -28.50, date: '2023-04-02', icon: <ConfirmationNumberIcon />, category: 'Entertainment', color: '#48BEFF' },
  ];
  
  const categories = [
    { id: 1, name: 'Groceries', icon: <ShoppingCartIcon />, amount: 420, color: '#FF6B6B' },
    { id: 2, name: 'Dining', icon: <FastfoodIcon />, amount: 245, color: '#FF9800' },
    { id: 3, name: 'Transportation', icon: <LocalGasStationIcon />, amount: 180, color: '#FFD166' },
    { id: 4, name: 'Entertainment', icon: <ConfirmationNumberIcon />, amount: 275, color: '#48BEFF' },
    { id: 5, name: 'Education', icon: <SchoolIcon />, amount: 350, color: '#9C27B0' },
    { id: 6, name: 'Housing', icon: <HomeIcon />, amount: 1200, color: '#3F51B5' },
    { id: 7, name: 'Healthcare', icon: <LocalHospitalIcon />, amount: 175, color: '#f44336' },
    { id: 8, name: 'Travel', icon: <FlightIcon />, amount: 0, color: '#607D8B' },
  ];
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Calculate total income and expenses for the month
  const totalIncome = 7500;
  const totalExpenses = 4570;
  const savingsPercentage = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100);
  
  return (
    <Box
      component={MotionBox}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
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
      }}
    >
      {/* Header Section */}
      <Box
        component={MotionDiv}
        variants={itemVariants}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(90deg, #0A84FF, #30D158)' 
                : 'linear-gradient(90deg, #0A84FF, #5E5CE6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Budget Planner
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Track, manage and optimize your family finances
          </Typography>
        </Box>
        <MotionDiv 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 8,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              boxShadow: theme.shadows[4],
              background: 'linear-gradient(45deg, #0A84FF, #5E5CE6)',
              transition: 'all 0.3s ease',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #0A84FF, #5E5CE6)',
                boxShadow: '0 8px 20px rgba(10, 132, 255, 0.3)',
              }
            }}
          >
            New Budget
          </Button>
        </MotionDiv>
      </Box>
      
      {/* Budget Overview */}
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <GlassCard
            component={MotionDiv}
            variants={itemVariants}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                mb: 3, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Monthly Overview
                </Typography>
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    color: theme.palette.primary.main,
                  }}
                >
                  <AutoGraphIcon />
                </Avatar>
              </Box>
              
              <Box sx={{ 
                my: 4, 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Typography 
                    variant="h3" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      color: theme.palette.primary.main
                    }}
                  >
                    {formatCurrency(4570)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Total Spent This Month
                  </Typography>
                </MotionDiv>
                <Box 
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    filter: 'blur(20px)',
                    zIndex: 0,
                  }}
                />
              </Box>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Monthly Budget
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {formatCurrency(6500)}
                  </Typography>
                </Box>
                <BudgetProgressBar variant="determinate" value={70} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MotionDiv
                      whileHover={{ rotate: 10 }}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowUpwardIcon 
                        sx={{ 
                          fontSize: 16, 
                          mr: 0.5, 
                          color: theme.palette.success.main,
                          background: alpha(theme.palette.success.main, 0.1),
                          p: 0.5,
                          borderRadius: '50%',
                        }} 
                      />
                    </MotionDiv>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      Income: {formatCurrency(totalIncome)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MotionDiv
                      whileHover={{ rotate: -10 }}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowDownwardIcon 
                        sx={{ 
                          fontSize: 16, 
                          mr: 0.5, 
                          color: theme.palette.error.main,
                          background: alpha(theme.palette.error.main, 0.1),
                          p: 0.5,
                          borderRadius: '50%',
                        }} 
                      />
                    </MotionDiv>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.palette.error.main,
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      Expenses: {formatCurrency(totalExpenses)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  mt: 1,
                  gap: 1
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Savings Rate:
                  </Typography>
                  <Chip
                    label={`${savingsPercentage}%`}
                    sx={{
                      fontWeight: 600,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <GlassCard
            component={MotionDiv}
            variants={itemVariants}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                mb: 3, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Spending Breakdown
                </Typography>
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(theme.palette.secondary.main, 0.2),
                    color: theme.palette.secondary.main,
                  }}
                >
                  <PieChartIcon />
                </Avatar>
              </Box>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {categories.map((category) => (
                  <Grid item xs={6} sm={3} key={category.id}>
                    <MotionDiv 
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                      }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          borderRadius: 3,
                          border: `1px solid ${alpha(category.color, 0.3)}`,
                          backgroundColor: alpha(category.color, activeCategory === category.id ? 0.15 : 0.05),
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: `0 8px 25px ${alpha(category.color, 0.2)}`,
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: category.color,
                            mx: 'auto',
                            mb: 1,
                            width: 44,
                            height: 44,
                            transform: activeCategory === category.id ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                            boxShadow: activeCategory === category.id 
                              ? `0 6px 16px ${alpha(category.color, 0.3)}`
                              : 'none',
                          }}
                        >
                          {category.icon}
                        </Avatar>
                        <Typography 
                          variant="body2" 
                          fontWeight="medium"
                          sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                          }}
                        >
                          {category.name}
                        </Typography>
                        <Typography 
                          variant="subtitle2" 
                          fontWeight="bold"
                          sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                            color: theme.palette.mode === 'dark' ? category.color : 'inherit',
                          }}
                        >
                          {formatCurrency(category.amount)}
                        </Typography>
                      </Paper>
                    </MotionDiv>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </GlassCard>
        </Grid>
        
        {/* Family Budgets */}
        <Grid item xs={12}>
          <MotionDiv variants={itemVariants}>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                mt: 2, 
                mb: 2,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              Family Budgets
            </Typography>
          </MotionDiv>
          
          <Grid container spacing={3}>
            {familyBudgets.map((budget) => (
              <Grid item xs={12} sm={6} md={4} key={budget.id}>
                <GlassCard
                  component={MotionDiv}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 20 } 
                  }}
                  onMouseEnter={() => setHoveredItem(budget.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        fontWeight="medium"
                        sx={{ 
                          color: hoveredItem === budget.id ? budget.color : 'inherit',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {budget.name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={handleMenuOpen}
                        sx={{
                          bgcolor: alpha(budget.color, 0.1),
                          color: budget.color,
                          '&:hover': {
                            bgcolor: alpha(budget.color, 0.2),
                          }
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        textAlign: 'center', 
                        my: 3,
                        position: 'relative'
                      }}
                    >
                      <MotionDiv
                        animate={{ 
                          scale: hoveredItem === budget.id ? [1, 1.05, 1] : 1 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography 
                          variant="h4" 
                          fontWeight="bold" 
                          sx={{ color: budget.color }}
                        >
                          {formatCurrency(budget.spent)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          of {formatCurrency(budget.total)}
                        </Typography>
                      </MotionDiv>
                      {hoveredItem === budget.id && (
                        <Box 
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${alpha(budget.color, 0.15)} 0%, transparent 70%)`,
                            zIndex: -1,
                          }}
                        />
                      )}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {Math.round((budget.spent / budget.total) * 100)}%
                        </Typography>
                      </Box>
                      <BudgetProgressBar
                        variant="determinate"
                        value={(budget.spent / budget.total) * 100}
                      />
                    </Box>
                  </CardContent>
                </GlassCard>
              </Grid>
            ))}
            
            <Grid item xs={12} sm={6} md={4}>
              <MotionDiv
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 } 
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    borderRadius: 4,
                    border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                    backgroundColor: alpha(theme.palette.background.paper, 0.4),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      width: 64,
                      height: 64,
                      mb: 2
                    }}
                  >
                    <AddIcon fontSize="large" />
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    fontWeight="medium"
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Add New Family Budget
                  </Typography>
                </Card>
              </MotionDiv>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Lower sections - Personal budgets and Transactions */}
        <Grid item xs={12} md={6}>
          <MotionDiv variants={itemVariants}>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                mt: 2, 
                mb: 2,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 
              }}
            >
              Personal Budgets
            </Typography>
          </MotionDiv>
          
          <GlassCard
            component={MotionDiv}
            variants={itemVariants}
            sx={{ height: '100%' }}
          >
            {personalBudgets.map((budget, index) => (
              <React.Fragment key={budget.id}>
                {index > 0 && <Divider sx={{ opacity: 0.6 }} />}
                <Box 
                  sx={{ 
                    p: 2,
                    '&:hover': {
                      backgroundColor: alpha(budget.color, 0.05),
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: alpha(budget.color, 0.2),
                          color: budget.color
                        }}
                      >
                        {budget.id === 4 ? <ShoppingCartIcon fontSize="small" /> : 
                         budget.id === 5 ? <ConfirmationNumberIcon fontSize="small" /> : 
                         <LocalGasStationIcon fontSize="small" />}
                      </Avatar>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight="medium"
                        sx={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        }}
                      >
                        {budget.name}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      sx={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.total)}
                    </Typography>
                  </Box>
                  <BudgetProgressBar
                    variant="determinate"
                    value={(budget.spent / budget.total) * 100}
                  />
                </Box>
              </React.Fragment>
            ))}
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ 
                    borderRadius: 4,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: theme.palette.primary.main,
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  Add Personal Budget
                </Button>
              </MotionDiv>
            </Box>
          </GlassCard>
        </Grid>
        
        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <MotionDiv variants={itemVariants}>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                mt: 2, 
                mb: 2,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              Recent Transactions
            </Typography>
          </MotionDiv>
          
          <GlassCard
            component={MotionDiv}
            variants={itemVariants}
            sx={{ height: '100%' }}
          >
            {recentTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                {index > 0 && <Divider sx={{ opacity: 0.6 }} />}
                <MotionDiv
                  whileHover={{ 
                    backgroundColor: alpha(transaction.color, 0.05),
                    x: 5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <ListItem
                    sx={{ px: 2, py: 1.5 }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(transaction.color, 0.2),
                          color: transaction.color
                        }}
                      >
                        {transaction.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          fontWeight="medium"
                          sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                          }}
                        >
                          {transaction.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Chip
                            label={transaction.category}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: alpha(transaction.color, 0.1),
                              color: transaction.color,
                              mr: 1,
                              fontWeight: 500,
                            }}
                          />
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                            }}
                          >
                            {transaction.date}
                          </Typography>
                        </Box>
                      }
                    />
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color={transaction.amount > 0 ? 'success.main' : 'inherit'}
                      sx={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </Typography>
                  </ListItem>
                </MotionDiv>
              </React.Fragment>
            ))}
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="text"
                  size="small"
                  sx={{ 
                    borderRadius: 4,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  View All Transactions
                </Button>
              </MotionDiv>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
      
      {/* Budget options menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            minWidth: 180,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
            mt: 1.5,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="body2">Edit Budget</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PieChartIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <AddIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="body2">Add Transaction</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main', py: 1.5 }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="body2">Delete Budget</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Budget; 