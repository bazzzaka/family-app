import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Colors
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(135deg, #111111 0%, #333333 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)'
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          background: `radial-gradient(circle at 30% 20%, ${isDark ? 'rgba(25,118,210,0.3)' : 'rgba(25,118,210,0.15)'} 0%, transparent 50%),
                       radial-gradient(circle at 70% 65%, ${isDark ? 'rgba(156,39,176,0.3)' : 'rgba(156,39,176,0.1)'} 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0
          }}
          animate={{ 
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ 
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: 5 + Math.random() * 10,
            height: 5 + Math.random() * 10,
            borderRadius: '50%',
            background: i % 2 === 0 ? primaryColor : secondaryColor,
            filter: `blur(${Math.random() * 2 + 1}px)`,
            opacity: 0.2
          }}
        />
      ))}
      
      {/* Animated Wave */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '15vh',
          opacity: 0.15
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,234.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ 
            pathLength: 1,
            pathOffset: [0, 1]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            pathOffset: { 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      </svg>
      
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20vh',
          opacity: 0.1
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,64L48,80C96,96,192,128,288,154.7C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)'}
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ 
            pathLength: 1,
            pathOffset: [0, -1]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            pathOffset: { 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      </svg>
    </Box>
  );
};

export default AnimatedBackground; 