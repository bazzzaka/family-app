import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  useTheme,
  useMediaQuery,
  alpha,
  Button
} from '@mui/material';
import { 
  FamilyRestroom as FamilyIcon,
  AccountTree as TreeIcon,
  Chat as ChatIcon,
  PhotoLibrary as MediaIcon,
  AccountBalance as BudgetIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
  Notifications as NotificationsIcon,
  CalendarMonth as CalendarIcon,
  EventNote as EventIcon,
  CheckCircle as TaskIcon,
  BarChart as StatisticsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Create motion components using motion.create() instead of motion()
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);
const MotionDiv = motion.div;

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const theme = useTheme();

  // Apple-inspired color palette
  const appleColors = {
    blue: '#0A84FF',
    green: '#30D158',
    indigo: '#5E5CE6',
    orange: '#FF9F0A',
    pink: '#FF375F',
    purple: '#BF5AF2',
    red: '#FF453A',
    teal: '#64D2FF',
    yellow: '#FFD60A',
    gray: '#8E8E93',
  };

  // Primary features (main modules)
  const primaryFeatures = [
    {
      title: t('dashboard.myFamily'),
      icon: <FamilyIcon sx={{ fontSize: 36 }} />,
      path: '/family',
      description: 'Connect with your family circles',
      color: appleColors.blue,
      gradient: `linear-gradient(135deg, ${appleColors.blue} 0%, ${alpha(appleColors.blue, 0.7)} 100%)`
    },
    {
      title: t('dashboard.familyTree'),
      icon: <TreeIcon sx={{ fontSize: 36 }} />,
      path: '/family-tree/main',
      description: 'Explore your family history and connections',
      color: appleColors.green,
      gradient: `linear-gradient(135deg, ${appleColors.green} 0%, ${alpha(appleColors.green, 0.7)} 100%)`
    },
    {
      title: t('dashboard.chat'),
      icon: <ChatIcon sx={{ fontSize: 36 }} />,
      path: '/messages',
      description: 'Connect with your family members',
      color: appleColors.orange,
      gradient: `linear-gradient(135deg, ${appleColors.orange} 0%, ${alpha(appleColors.orange, 0.7)} 100%)`
    },
    {
      title: t('dashboard.media'),
      icon: <MediaIcon sx={{ fontSize: 36 }} />,
      path: '/albums',
      description: 'Share and view family photos and videos',
      color: appleColors.purple,
      gradient: `linear-gradient(135deg, ${appleColors.purple} 0%, ${alpha(appleColors.purple, 0.7)} 100%)`
    },
    {
      title: t('dashboard.budget'),
      icon: <BudgetIcon sx={{ fontSize: 36 }} />,
      path: '/budgets',
      description: 'Track family expenses and budgets',
      color: appleColors.pink,
      gradient: `linear-gradient(135deg, ${appleColors.pink} 0%, ${alpha(appleColors.pink, 0.7)} 100%)`
    }
  ];

  // Secondary features (additional modules)
  const secondaryFeatures = [
    {
      title: 'Calendar',
      icon: <CalendarIcon sx={{ fontSize: 28 }} />,
      path: '/calendar',
      description: 'Family events and schedules',
      color: appleColors.teal,
      gradient: `linear-gradient(135deg, ${appleColors.teal} 0%, ${alpha(appleColors.teal, 0.7)} 100%)`
    },
    {
      title: 'Tasks',
      icon: <TaskIcon sx={{ fontSize: 28 }} />,
      path: '/tasks',
      description: 'Family chores and to-dos',
      color: appleColors.yellow,
      gradient: `linear-gradient(135deg, ${appleColors.yellow} 0%, ${alpha(appleColors.yellow, 0.7)} 100%)`
    },
    {
      title: 'Events',
      icon: <EventIcon sx={{ fontSize: 28 }} />,
      path: '/events',
      description: 'Upcoming family gatherings',
      color: appleColors.indigo,
      gradient: `linear-gradient(135deg, ${appleColors.indigo} 0%, ${alpha(appleColors.indigo, 0.7)} 100%)`
    },
    {
      title: 'Statistics',
      icon: <StatisticsIcon sx={{ fontSize: 28 }} />,
      path: '/statistics',
      description: 'Family activity insights',
      color: appleColors.gray,
      gradient: `linear-gradient(135deg, ${appleColors.gray} 0%, ${alpha(appleColors.gray, 0.7)} 100%)`
    }
  ];

  // Quick access features
  const quickAccessFeatures = [
    {
      title: 'Profile',
      icon: <ProfileIcon sx={{ fontSize: 22 }} />,
      path: '/profile',
      color: appleColors.blue
    },
    {
      title: 'Settings',
      icon: <SettingsIcon sx={{ fontSize: 22 }} />,
      path: '/settings',
      color: appleColors.gray
    },
    {
      title: 'Notifications',
      icon: <NotificationsIcon sx={{ fontSize: 22 }} />,
      path: '/notifications',
      color: appleColors.red
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 24
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <Box 
      className="dashboard-container"
      sx={{ 
        p: 0,
        width: '100%',
        maxWidth: { 
          xs: '100%', 
          sm: '95%', 
          md: '92%', 
          lg: '1200px', 
          xl: '1800px',
          '@media (min-width:2560px)': '2400px',
          '@media (min-width:3840px)': '3200px'
        },
        minHeight: '100vh',
        mx: 'auto',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
          : 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        paddingLeft: '0 !important',
        marginLeft: '0 !important',
        borderLeft: 'none !important',
        left: 0,
        '&, & *, & *::before, & *::after': {
          boxSizing: 'border-box'
        },
        '& .MuiBox-root, & .MuiContainer-root, & .MuiGrid-root, & .MuiPaper-root, & .MuiCard-root, & .MuiCardContent-root, & div': {
          margin: 0,
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          transition: 'all 0.3s ease',
          border: 'none !important',
          borderLeft: 'none !important'
        },
        '& [class*="css-"], & .css-1vxp5yx, & .css-hhdjsd-MuiContainer-root, & .css-p43sob, & .css-14e3o55, & .css-1at9qkq': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          border: 'none !important',
          borderLeft: 'none !important'
        },
        '&.css-p43sob, &.css-14e3o55, &.css-1at9qkq, &.css-1vxp5yx, &.MuiContainer-root, &.css-hhdjsd-MuiContainer-root, & [class*="MuiBox-root"]': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          border: 'none !important',
          borderLeft: 'none !important'
        },
        '& > *': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          border: 'none !important',
          borderLeft: 'none !important'
        },
        '&.MuiBox-root': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          borderLeft: 'none !important'
        }
      }}
    >
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ marginLeft: 0, paddingLeft: 0 }}
      >
        <Box sx={{ 
          mb: 5,
          textAlign: 'center',
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: { xs: 1.5, sm: 2 },
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3rem' }
            }}
          >
            {t('dashboard.welcomeNoApp')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400,
              maxWidth: 600,
              margin: '0 auto',
              textAlign: 'center',
              color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.8) : '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.5
            }}
          >
            {t('dashboard.subtitle')}
          </Typography>
        </Box>
      </MotionDiv>

      {/* Quick Access Row */}
      <Box sx={{ 
        mb: { xs: 4, sm: 5, md: 6 }, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5, md: 2 },
        flexWrap: 'wrap',
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        width: '100%',
        paddingLeft: '0 !important',
        marginLeft: '0 !important',
        borderLeft: 'none !important',
        '& > *': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          borderLeft: 'none !important',
          height: '100%'
        }
      }}>
        <AnimatePresence>
          {quickAccessFeatures.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'flex' }}
            >
              <Button
                variant="contained"
                startIcon={feature.icon}
                onClick={() => handleFeatureClick(feature.path)}
                sx={{ 
                  backgroundColor: alpha(feature.color, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                  color: feature.color,
                  fontWeight: 600,
                  minWidth: { xs: '110px', sm: '120px', md: '130px' },
                  height: '100%',
                  px: { xs: 1.5, sm: 2, md: 3 },
                  py: { xs: 1, sm: 1.2, md: 1.3 },
                  borderRadius: { xs: '10px', sm: '12px' },
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 4px 12px ${alpha(feature.color, 0.2)}`,
                  transition: 'all 0.3s ease',
                  margin: 0,
                  '&:hover': {
                    backgroundColor: alpha(feature.color, theme.palette.mode === 'dark' ? 0.3 : 0.2),
                    transform: 'translateY(-3px)',
                    boxShadow: `0 6px 16px ${alpha(feature.color, 0.3)}`,
                  }
                }}
              >
                {feature.title}
              </Button>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </Box>

      {/* Primary Features Grid */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          marginTop: '40px', 
          width: '100%', 
          marginLeft: 0, 
          paddingLeft: 0,
          borderLeft: 'none' 
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ 
          px: { xs: 1, sm: 2, md: 3, lg: 4 }, 
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          margin: '0 !important',
          marginLeft: '0 !important',
          paddingLeft: '0 !important',
          '& .MuiGrid-item': {
            paddingLeft: { xs: '16px !important', sm: '16px !important', md: '24px !important' },
            paddingTop: { xs: '16px !important', sm: '16px !important', md: '24px !important' },
            display: 'flex',
          }
        }}>
          {primaryFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <MotionDiv variants={itemVariants} style={{ width: '100%', height: '100%' }}>
                <MotionCard 
                  whileHover="hover"
                  variants={cardHoverVariants}
                  whileTap={{ scale: 0.98 }}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: { xs: '20px', sm: '22px', md: '24px' },
                    background: theme.palette.mode === 'dark' 
                      ? alpha('#2c2c2e', 0.6)
                      : alpha('#ffffff', 0.8),
                    margin: 0,
                    paddingLeft: '0 !important',
                    marginLeft: '0 !important',
                    backdropFilter: 'blur(20px)',
                    border: theme.palette.mode === 'dark' 
                      ? `1px solid ${alpha('#ffffff', 0.1)}`
                      : `1px solid ${alpha('#000000', 0.05)}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 4px 30px ${alpha('#000000', 0.2)}`
                      : `0 4px 20px ${alpha('#000000', 0.05)}`,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleFeatureClick(feature.path)}
                >
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    paddingLeft: '0 !important',
                    marginLeft: '0 !important',
                    border: 'none !important',
                    borderLeft: 'none !important',
                    '&.MuiCardContent-root, &.css-1vxp5yx': {
                      paddingLeft: '0 !important',
                      marginLeft: '0 !important',
                      border: 'none !important',
                      borderLeft: 'none !important'
                    }
                  }}>
                    <MotionDiv
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Box sx={{ 
                        width: { xs: 50, sm: 60, md: 70 },
                        height: { xs: 50, sm: 60, md: 70 },
                        borderRadius: '50%',
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 2, sm: 2.5, md: 3 },
                        color: '#ffffff',
                        boxShadow: `0 8px 16px ${alpha(feature.color, 0.25)}`,
                      }}>
                        {feature.icon}
                      </Box>
                    </MotionDiv>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: { xs: 1, sm: 1.25, md: 1.5 },
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                        lineHeight: 1.5,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        px: 1,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '220px',
                        margin: '0 auto',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                  {/* Enhanced decorative gradient elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: feature.gradient,
                    opacity: 0.05,
                    transform: 'translate(30%, -30%)',
                    zIndex: 1,
                    filter: 'blur(40px)',
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: feature.gradient,
                    opacity: 0.05,
                    transform: 'translate(-30%, 30%)',
                    zIndex: 1,
                    filter: 'blur(30px)',
                  }} />
                </MotionCard>
              </MotionDiv>
            </Grid>
          ))}
        </Grid>
      </MotionDiv>

      {/* Secondary Features */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ 
          marginTop: '4rem', 
          width: '100%', 
          marginLeft: 0, 
          paddingLeft: 0 
        }}
      >
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ 
          px: { xs: 1, sm: 2, md: 3, lg: 4 }, 
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          margin: '0 !important',
          marginLeft: '0 !important',
          paddingLeft: '0 !important',
          '& .MuiGrid-item': {
            paddingLeft: { xs: '12px !important', sm: '16px !important', md: '16px !important' },
            paddingTop: { xs: '12px !important', sm: '16px !important', md: '16px !important' },
            display: 'flex',
            height: '100%',
          }
        }}>
          {secondaryFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <MotionCard 
                whileHover={{ 
                  y: -5,
                  boxShadow: `0 12px 20px ${alpha(feature.color, 0.15)}`,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                sx={{ 
                  height: '100%',
                  width: '100%',
                  borderRadius: { xs: '16px', sm: '18px', md: '20px' },
                  background: theme.palette.mode === 'dark' 
                    ? alpha('#2c2c2e', 0.6)
                    : alpha('#ffffff', 0.8),
                  margin: 0,
                  backdropFilter: 'blur(20px)',
                  border: theme.palette.mode === 'dark' 
                    ? `1px solid ${alpha('#ffffff', 0.1)}`
                    : `1px solid ${alpha('#000000', 0.05)}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardContent sx={{ 
                  p: { xs: 2, sm: 2.5, md: 3 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: { xs: 1.5, sm: 2, md: 3 },
                  height: '100%',
                }}>
                  <MotionDiv whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 200 }}>
                    <Box sx={{ 
                      width: { xs: 36, sm: 40, md: 50 },
                      height: { xs: 36, sm: 40, md: 50 },
                      borderRadius: { xs: '14px', sm: '16px' },
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${alpha(feature.color, 0.2)}`,
                    }}>
                      {feature.icon}
                    </Box>
                  </MotionDiv>
                  <Box sx={{ flexGrow: 1, width: '100%', minWidth: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        mb: { xs: 0.25, sm: 0.5 },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 1, sm: 2 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionDiv>

      {/* Recent Activity Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ 
          width: '100%', 
          marginLeft: 0, 
          paddingLeft: 0,
          marginTop: '3rem'
        }}
      >
        <Box sx={{ 
          px: { xs: 1, sm: 2, md: 3, lg: 4 }, 
          pb: { xs: 4, sm: 5, md: 6 }, 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%'
        }}>
          <MotionPaper 
            whileHover={{ 
              boxShadow: `0 8px 32px ${alpha('#000000', theme.palette.mode === 'dark' ? 0.3 : 0.1)}`,
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            sx={{ 
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: '20px', sm: '22px', md: '24px' },
              background: theme.palette.mode === 'dark' 
                ? alpha('#2c2c2e', 0.6)
                : alpha('#ffffff', 0.8),
              margin: 0,
              backdropFilter: 'blur(20px)',
              border: theme.palette.mode === 'dark' 
                ? `1px solid ${alpha('#ffffff', 0.1)}`
                : `1px solid ${alpha('#000000', 0.05)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 30px ${alpha('#000000', 0.2)}`
                : `0 4px 20px ${alpha('#000000', 0.05)}`,
              transition: 'all 0.3s ease',
              maxWidth: { xs: '95%', sm: '90%', md: '600px' },
              width: '100%',
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                padding: { xs: 1, sm: 2 },
              }}
            >
              No recent activity to show
            </Typography>
          </MotionPaper>
        </Box>
      </MotionDiv>
    </Box>
  );
};

export default Dashboard; 