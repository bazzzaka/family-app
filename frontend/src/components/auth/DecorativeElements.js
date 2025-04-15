import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';

// Компонент центрального декоративного елемента
export const CentralDecoration = () => {
  const theme = useTheme();
  
  return (
    <Box 
      className="MuiBox-root css-tw4vmx"
      sx={{ 
        position: 'relative',
        width: '100%',
        height: 80,
        mb: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Центральна анімована іконка */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.0, 0.8],
          opacity: 1 
        }}
        transition={{ 
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: { duration: 0.5 }
        }}
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.secondary.main, 0.5)})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.6)}`,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke={theme.palette.primary.contrastText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <path d="M18 8l-6-6-6 6" />
            <path d="M12 2v10M18 21l-6-6-6 6" />
            <path d="M12 14v8" />
          </motion.svg>
        </Box>
      </motion.div>
      
      {/* Орбітальні кола */}
      <motion.div
        animate={{ 
          rotate: 360
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        }} />
      </motion.div>
      
      <motion.div
        animate={{ 
          rotate: -360
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{
          position: 'absolute',
          width: 90,
          height: 90,
          borderRadius: '50%',
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
        }} />
      </motion.div>
      
      {/* Плаваючі частинки */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 - 50,
            y: Math.random() * 60 - 30,
            opacity: 0
          }}
          animate={{ 
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 60 - 30, Math.random() * 60 - 30],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 8 + Math.random() * 5,
            height: 8 + Math.random() * 5,
            borderRadius: '50%',
            background: i % 2 === 0 
              ? theme.palette.primary.main 
              : theme.palette.secondary.main,
            filter: `blur(1px) drop-shadow(0 0 2px ${i % 2 === 0 
              ? theme.palette.primary.main 
              : theme.palette.secondary.main})`
          }}
        />
      ))}
    </Box>
  );
};

// Компонент декоративної лінії
export const DecorativeLine = () => {
  const theme = useTheme();
  
  return (
    <Box 
      className="MuiBox-root css-tw4vmx"
      sx={{ 
        position: 'relative',
        width: '100%',
        height: 30,
        my: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 1,
          background: `linear-gradient(to right, 
            transparent 0%, 
            ${alpha(theme.palette.primary.main, 0.3)} 20%, 
            ${alpha(theme.palette.primary.main, 0.5)} 50%,
            ${alpha(theme.palette.primary.main, 0.3)} 80%,
            transparent 100%
          )`,
        }}
      />
      
      {/* Плаваючі частинки на лінії */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: -50 + i * 50,
            opacity: 0.2
          }}
          animate={{ 
            x: [-50 + i * 50, 150 + i * 50],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: i * 0.7
          }}
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: theme.palette.secondary.main,
            filter: `blur(2px) drop-shadow(0 0 3px ${theme.palette.secondary.main})`,
            zIndex: 1
          }}
        />
      ))}
    </Box>
  );
};

// Компонент нижнього декоративного елемента
export const BottomDecoration = () => {
  const theme = useTheme();
  
  return (
    <Box 
      className="MuiBox-root css-tw4vmx"
      sx={{ 
        position: 'relative',
        width: '100%',
        height: 40,
        mt: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Нижній візерунок */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, i % 2 === 0 ? -5 : 5, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              repeat: Infinity, 
              repeatType: "mirror",
              delay: i * 0.2
            }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i % 3 === 0
                ? theme.palette.primary.main
                : i % 3 === 1
                  ? theme.palette.secondary.main
                  : theme.palette.info.main,
              boxShadow: `0 0 8px ${i % 3 === 0
                ? theme.palette.primary.main
                : i % 3 === 1
                  ? theme.palette.secondary.main
                  : theme.palette.info.main}`
            }}
          />
        ))}
      </motion.div>

      {/* Центральна анімована хвиля */}
      <motion.svg
        width="100%"
        height="20"
        viewBox="0 0 200 20"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0
        }}
      >
        <motion.path
          d="M0,10 Q25,20 50,10 T100,10 T150,10 T200,10"
          fill="none"
          stroke={alpha(theme.palette.primary.main, 0.4)}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.7,
            pathOffset: [0, 1]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 },
            pathOffset: { 
              repeat: Infinity, 
              duration: 5, 
              ease: "linear" 
            }
          }}
        />
      </motion.svg>
    </Box>
  );
}; 