import React, { useState } from 'react';
import { Box, Container, Paper, Grid, useTheme, useMediaQuery, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import PromoFeatures from './PromoFeatures';
import AnimatedTree from './AnimatedTrees';
import AnimatedBackground from './AnimatedBackground';
import { CentralDecoration, DecorativeLine, BottomDecoration } from './DecorativeElements';

const AuthForm = () => {
  const [viewMode, setViewMode] = useState('login');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleToggleForm = () => {
    setViewMode(viewMode === 'login' ? 'register' : 'login');
  };
  
  const handleForgotPassword = () => {
    setViewMode('forgotPassword');
  };
  
  const handleBackToLogin = () => {
    setViewMode('login');
  };

  const formVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Animated Trees (hidden on mobile) */}
      {!isMobile && (
        <>
          <AnimatedTree side="left" scale={1.1} />
          <AnimatedTree side="right" scale={0.9} />
        </>
      )}
      
      {/* Main Container */}
      <Paper 
        elevation={16}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '95%', md: '90%', lg: '1200px' },
          borderRadius: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
          backgroundColor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.8)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <Grid container>
          {/* Promo features section (hidden on mobile) */}
          {!isMobile && (
            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              <PromoFeatures />
            </Grid>
          )}
          
          {/* Form Section */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 },
              position: 'relative',
              backgroundColor: theme => theme.palette.mode === 'dark' 
                ? 'rgba(18, 18, 18, 0.7)' 
                : 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Mobile App Title (shown only on mobile) */}
            {isMobile && (
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  fontWeight="bold"
                  color="primary"
                >
                  Family App
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Connect with your loved ones
                </Typography>
              </Box>
            )}

            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              {/* Top Decorative Element */}
              {viewMode !== 'forgotPassword' && <CentralDecoration />}
              
              {/* Login/Register/ForgotPassword Form with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {viewMode === 'login' ? (
                    <LoginForm 
                      onToggleForm={handleToggleForm} 
                      onForgotPassword={handleForgotPassword}
                    />
                  ) : viewMode === 'register' ? (
                    <RegisterForm 
                      onToggleForm={handleToggleForm}
                    />
                  ) : (
                    <ForgotPasswordForm 
                      onCancel={handleBackToLogin} 
                      onSuccess={handleBackToLogin}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Bottom Decorative Elements */}
              {viewMode !== 'forgotPassword' && (
                <>
                  <DecorativeLine />
                  <BottomDecoration />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuthForm; 