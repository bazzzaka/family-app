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
  Container,
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
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      title: t('dashboard.familyGroups'),
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
        stiffness: 300, 
        damping: 24
      }
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      width: '100%',
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
        : 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          mb: 5,
          textAlign: 'center',
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
            }}
          >
            {t('dashboard.welcome')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400,
              maxWidth: 500,
              margin: '0 auto',
              color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.8) : '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: '1rem',
              lineHeight: 1.5
            }}
          >
            {t('dashboard.subtitle')}
          </Typography>
        </Box>
      </motion.div>

      {/* Quick Access Row */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {quickAccessFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Button
              variant="contained"
              startIcon={feature.icon}
              onClick={() => handleFeatureClick(feature.path)}
              sx={{
                backgroundColor: alpha(feature.color, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                color: feature.color,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: alpha(feature.color, theme.palette.mode === 'dark' ? 0.3 : 0.2),
                }
              }}
            >
              {feature.title}
            </Button>
          </motion.div>
        ))}
      </Box>

      {/* Primary Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Core Features
        </Typography>
        <Grid container spacing={3}>
          {primaryFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={itemVariants}>
                <MotionCard 
                  whileHover={{ 
                    y: -6,
                    boxShadow: `0 14px 24px ${alpha(feature.color, 0.15)}`,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ 
                    height: '100%',
                    borderRadius: '16px',
                    background: theme.palette.mode === 'dark' 
                      ? alpha('#2c2c2e', 0.6)
                      : alpha('#ffffff', 0.8),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.palette.mode === 'dark' 
                      ? alpha('#ffffff', 0.1) 
                      : alpha('#000000', 0.05)}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 4px 30px ${alpha('#000000', 0.2)}`
                      : `0 4px 20px ${alpha('#000000', 0.05)}`,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleFeatureClick(feature.path)}
                >
                  <CardContent sx={{ 
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    <Box sx={{ 
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      color: '#ffffff',
                      boxShadow: `0 8px 16px ${alpha(feature.color, 0.25)}`,
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 600,
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
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                  {/* Decorative gradient element */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: feature.gradient,
                    opacity: 0.05,
                    transform: 'translate(30%, -30%)',
                    zIndex: 1,
                  }} />
                </MotionCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Secondary Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Additional Tools
        </Typography>
        <Grid container spacing={2}>
          {secondaryFeatures.map((feature, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <MotionCard 
                whileHover={{ 
                  y: -4,
                  boxShadow: `0 10px 20px ${alpha(feature.color, 0.15)}`,
                }}
                whileTap={{ scale: 0.98 }}
                sx={{ 
                  height: '100%',
                  borderRadius: '16px',
                  background: theme.palette.mode === 'dark' 
                    ? alpha('#2c2c2e', 0.6)
                    : alpha('#ffffff', 0.8),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' 
                    ? alpha('#ffffff', 0.1) 
                    : alpha('#000000', 0.05)}`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 4px 20px ${alpha('#000000', 0.2)}`
                    : `0 4px 15px ${alpha('#000000', 0.05)}`,
                  cursor: 'pointer'
                }}
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardContent sx={{ 
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Box sx={{ 
                    width: 50,
                    height: 50,
                    borderRadius: '12px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.8rem',
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Recent Activity
          </Typography>
          <Paper 
            sx={{ 
              p: 3,
              borderRadius: '16px',
              background: theme.palette.mode === 'dark' 
                ? alpha('#2c2c2e', 0.6)
                : alpha('#ffffff', 0.8),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' 
                ? alpha('#ffffff', 0.1) 
                : alpha('#000000', 0.05)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 30px ${alpha('#000000', 0.2)}`
                : `0 4px 20px ${alpha('#000000', 0.05)}`,
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              No recent activity to show
            </Typography>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Dashboard; 