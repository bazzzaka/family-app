import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  useMediaQuery,
  Container
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NeonTree from '../animations/NeonTree';
import GlowingParticles from '../animations/GlowingParticles';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Check if user is already authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' 
          : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        position: 'relative'
      }}
    >
      {/* Animated background with particles */}
      <GlowingParticles count={isMobile ? 15 : 30} speed={0.3} />
      
      <Container 
        maxWidth="sm" 
        sx={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Animated neon tree effect */}
        <Box sx={{ 
          position: 'absolute', 
          left: '-15%', 
          height: '130%', 
          width: '130%', 
          top: '-15%',
          display: { xs: 'none', sm: 'block' }
        }}>
          <NeonTree opacity={0.6} scale={0.9} />
        </Box>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 500,
            zIndex: 2
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeOut" 
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="primary"
              gutterBottom
              sx={{
                fontWeight: 'bold', 
                mb: 3, 
                textAlign: 'center',
                textShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.4)}`
              }}
            >
              Family App
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.5,
              ease: "easeOut" 
            }}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, sm: 4 },
                width: '100%',
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.85),
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px 0 ${alpha(theme.palette.primary.main, 0.2)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                zIndex: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle glow effect on hover */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                  opacity: 0.5,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Outlet />
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthLayout; 