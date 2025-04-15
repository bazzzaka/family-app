import React, { useEffect } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion, useAnimate, stagger } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessAnimation = ({ message = 'Success!', onComplete }) => {
  const theme = useTheme();
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    const runAnimation = async () => {
      // Initial animation for the circle
      await animate(
        '.success-circle',
        { scale: [0, 1.2, 1] },
        { duration: 0.6, ease: [0.2, 0.8, 0.2, 1.1] }
      );
      
      // Check mark animation
      await animate(
        '.success-check',
        { 
          opacity: 1,
          pathLength: [0, 1],
          pathOffset: [1, 0]
        },
        { duration: 0.6, ease: "easeOut" }
      );
      
      // Text animation
      await animate(
        '.success-text',
        { opacity: 1, y: [20, 0] },
        { duration: 0.4, ease: "easeOut" }
      );
      
      // Particles animation
      await animate(
        '.success-particle',
        { 
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          x: (index) => [0, (index % 2 === 0 ? 1 : -1) * (20 + Math.random() * 30)],
          y: (index) => [0, (index % 3 === 0 ? 1 : -1) * (20 + Math.random() * 30)],
        },
        { 
          duration: 0.8,
          delay: stagger(0.05),
          ease: "easeOut" 
        }
      );
      
      // Call onComplete after animations
      if (onComplete) {
        setTimeout(onComplete, 1000);
      }
    };
    
    runAnimation();
  }, [animate, onComplete]);
  
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  
  return (
    <Box 
      ref={scope}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative', mb: 3 }}>
        {/* Success Circle */}
        <Box 
          className="success-circle"
          component={motion.div}
          initial={{ scale: 0 }}
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.success.main, 0.2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 0 8px ${alpha(theme.palette.success.main, 0.1)}`
          }}
        >
          <CheckCircleOutlineIcon 
            className="success-check"
            sx={{ 
              fontSize: 50, 
              color: theme.palette.success.main,
              opacity: 0
            }} 
          />
        </Box>
        
        {/* Celebration particles */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            className="success-particle"
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 6 + Math.random() * 6,
              height: 6 + Math.random() * 6,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 
                ? theme.palette.success.main 
                : i % 3 === 1 
                  ? primaryColor 
                  : secondaryColor,
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }}
          />
        ))}
      </Box>
      
      {/* Success Message */}
      <Typography 
        className="success-text"
        variant="h6" 
        component="div" 
        align="center"
        sx={{ 
          fontWeight: 'medium', 
          color: theme.palette.success.main,
          opacity: 0
        }}
      >
        {message}
      </Typography>
      
      {/* Radial gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle, ${alpha(theme.palette.success.main, 0.4)} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
    </Box>
  );
};

export default SuccessAnimation; 