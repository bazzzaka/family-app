import React from 'react';
import { Box, Button, Divider, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon
} from '@mui/icons-material';

// Create motion components
const MotionButton = motion(Button);

const SocialLoginButtons = ({ type = 'login' }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const buttonVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.97,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };
  
  // Common button style
  const buttonStyle = {
    py: 1.2,
    fontSize: '0.9rem',
    fontWeight: 500,
    borderRadius: 2,
    color: theme.palette.text.primary,
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
    }
  };

  const handleSocialAuth = (provider) => {
    console.log(`${type} with ${provider}`);
    // To be implemented with actual authentication
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 2, 
          mb: 3,
          width: '100%' 
        }}
      >
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
          {type === 'login' ? 'or sign in with' : 'or sign up with'}
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <MotionButton
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            ...buttonStyle,
            flex: { xs: '1', sm: '0 1 30%' },
            maxWidth: { sm: '160px' }
          }}
          onClick={() => handleSocialAuth('Google')}
          variants={buttonVariant}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring" }}
        >
          Google
        </MotionButton>
        
        <MotionButton
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{
            ...buttonStyle,
            flex: { xs: '1', sm: '0 1 30%' },
            maxWidth: { sm: '160px' }
          }}
          onClick={() => handleSocialAuth('Facebook')}
          variants={buttonVariant}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring" }}
        >
          Facebook
        </MotionButton>
        
        <MotionButton
          variant="outlined"
          startIcon={<AppleIcon />}
          sx={{
            ...buttonStyle,
            flex: { xs: '1', sm: '0 1 30%' },
            maxWidth: { sm: '160px' }
          }}
          onClick={() => handleSocialAuth('Apple')}
          variants={buttonVariant}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring" }}
        >
          Apple
        </MotionButton>
      </Box>
    </Box>
  );
};

export default SocialLoginButtons; 