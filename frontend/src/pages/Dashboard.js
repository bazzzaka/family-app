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
  alpha
} from '@mui/material';
import { 
  FamilyRestroom as FamilyIcon,
  AccountTree as TreeIcon,
  Chat as ChatIcon,
  PhotoLibrary as MediaIcon,
  AccountBalance as BudgetIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: t('dashboard.familyGroups'),
      icon: <FamilyIcon sx={{ fontSize: 40 }} />,
      path: '/family-groups',
      color: '#007AFF',
      gradient: 'linear-gradient(135deg, #007AFF 0%, #00BFFF 100%)'
    },
    {
      title: t('dashboard.familyTree'),
      icon: <TreeIcon sx={{ fontSize: 40 }} />,
      path: '/family-tree',
      color: '#34C759',
      gradient: 'linear-gradient(135deg, #34C759 0%, #4CD964 100%)'
    },
    {
      title: t('dashboard.chat'),
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      path: '/chat',
      color: '#FF9500',
      gradient: 'linear-gradient(135deg, #FF9500 0%, #FFB700 100%)'
    },
    {
      title: t('dashboard.media'),
      icon: <MediaIcon sx={{ fontSize: 40 }} />,
      path: '/media',
      color: '#5856D6',
      gradient: 'linear-gradient(135deg, #5856D6 0%, #7B7BFF 100%)'
    },
    {
      title: t('dashboard.budget'),
      icon: <BudgetIcon sx={{ fontSize: 40 }} />,
      path: '/budget',
      color: '#FF2D55',
      gradient: 'linear-gradient(135deg, #FF2D55 0%, #FF3B30 100%)'
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: 1400,
      margin: '0 auto',
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 6,
        textAlign: 'center',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.divider, 0.3)}, transparent)`
        }
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #000000 30%, #434343 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}
        >
          {t('dashboard.welcome')}
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontWeight: 400,
            maxWidth: 600,
            margin: '0 auto',
            opacity: 0.8
          }}
        >
          {t('dashboard.subtitle')}
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionCard 
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              sx={{ 
                height: '100%',
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)} 0%, ${alpha(feature.color, 0.05)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(feature.color, 0.1)}`,
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                }
              }}
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardContent sx={{ 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feature.gradient,
                  opacity: 0.1,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 0.2,
                }
              }}>
                <Box sx={{ 
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: feature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  boxShadow: `0 8px 24px ${alpha(feature.color, 0.3)}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    background: feature.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    opacity: 0.8,
                    lineHeight: 1.6
                  }}
                >
                  {t(`dashboard.${feature.title.toLowerCase().replace(' ', '')}Description`)}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Box sx={{ mt: 8 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #000000 30%, #434343 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {t('dashboard.recentActivity')}
        </Typography>
        <Paper 
          sx={{ 
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 20px 40px ${alpha(theme.palette.divider, 0.1)}`,
            }
          }}
        >
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              opacity: 0.8
            }}
          >
            {t('dashboard.noRecentActivity')}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 