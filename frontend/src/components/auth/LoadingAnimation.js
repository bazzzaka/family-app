import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingAnimation = ({ message = 'Loading...' }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Colors for the animation shapes
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const infoColor = theme.palette.info.main;
  
  // Animation variants
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const dotVariants = {
    initial: { y: 0, opacity: 0.2 },
    animate: { 
      y: [0, -15, 0], 
      opacity: [0.2, 1, 0.2],
      transition: { 
        duration: 1.2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };
  
  const circleVariants = {
    initial: { 
      rotate: 0,
      opacity: 0.3
    },
    animate: { 
      rotate: 360,
      opacity: [0.3, 0.8, 0.3],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "linear" 
      }
    }
  };
  
  const messageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { delay: 0.5 }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        p: 3
      }}
    >
      {/* Animated Circle */}
      <Box sx={{ position: 'relative', width: 60, height: 60, mb: 3 }}>
        <motion.div
          variants={circleVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `3px solid ${primaryColor}`,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
          }}
        />
        
        <motion.div
          variants={circleVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            border: `2px solid ${secondaryColor}`,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            animationDelay: '-0.5s'
          }}
        />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0.5, 1, 0.5],
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
          style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            backgroundColor: alpha(infoColor, 0.7)
          }}
        />
      </Box>
      
      {/* Bouncing Dots */}
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        sx={{ 
          display: 'flex', 
          gap: 1,
          mb: 2 
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: i === 0 ? primaryColor : i === 1 ? secondaryColor : infoColor
            }}
          />
        ))}
      </Box>
      
      {/* Loading Message */}
      <motion.div
        variants={messageVariants}
        initial="initial"
        animate="animate"
      >
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingAnimation; 