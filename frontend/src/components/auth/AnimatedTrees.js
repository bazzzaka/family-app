import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export const AnimatedTree = ({ side = 'left', scale = 1 }) => {
  const theme = useTheme();
  const isLeft = side === 'left';
  
  // Colors from theme
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  
  // Apply different colors based on side
  const leafColor = isLeft ? primaryColor : secondaryColor;
  const trunkColor = theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.6)' 
    : 'rgba(101, 67, 33, 0.8)';
  
  // Wind animation variants - different for each side
  const windAnimation = {
    animate: {
      rotate: isLeft ? [-1, 2, -1] : [1, -2, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Leaf growth animation
  const leafGrow = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: Math.random() * 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        [side]: { xs: '5%', sm: '8%', md: '10%' },
        bottom: 0,
        height: { xs: '50%', sm: '70%', md: '85%' },
        width: '20%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      {/* Tree trunk */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '8%',
          backgroundColor: trunkColor,
          borderRadius: '10px 10px 0 0',
          zIndex: 1
        }}
      />
      
      {/* Main branch that sways in the wind */}
      <motion.div
        variants={windAnimation}
        animate="animate"
        style={{
          position: 'absolute',
          bottom: '40%',
          transformOrigin: 'bottom center',
          height: '60%',
          width: '100%',
          zIndex: 2
        }}
      >
        {/* Tree crown/leaves */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: scale }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            ease: "elastic.out(1, 0.5)" 
          }}
          style={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {/* Generate several leaf clusters */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={leafGrow}
              initial="initial"
              animate="animate"
              style={{
                position: 'absolute',
                top: `${15 + i * 15}%`,
                width: `${100 - i * 15}%`,
                height: `${20 - i * 2}%`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${leafColor}50, ${leafColor}95)`,
                filter: `drop-shadow(0 3px 5px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'})`
              }}
            />
          ))}
          
          {/* Small branches */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`branch-${i}`}
              initial={{ width: 0 }}
              animate={{ width: `${40 - i * 10}%` }}
              transition={{ 
                duration: 0.8, 
                delay: 1 + i * 0.2,
                ease: "easeOut" 
              }}
              style={{
                position: 'absolute',
                top: `${30 + i * 20}%`,
                [isLeft ? 'right' : 'left']: '48%',
                height: '3%',
                backgroundColor: trunkColor,
                borderRadius: isLeft ? '5px 0 0 5px' : '0 5px 5px 0',
                zIndex: 0
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Falling leaves animation */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          initial={{ 
            top: `-${Math.random() * 10}%`,
            [isLeft ? 'left' : 'right']: `${Math.random() * 50 + 25}%`,
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            top: '120%',
            [isLeft ? 'left' : 'right']: `${Math.random() * 80}%`,
            opacity: [0, 0.8, 0],
            rotate: isLeft ? 360 : -360
          }}
          transition={{ 
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 10 + Math.random() * 8,
            height: 10 + Math.random() * 8,
            borderRadius: '50%',
            backgroundColor: leafColor,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </Box>
  );
};

export default AnimatedTree; 