import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
  IconButton,
  Link,
  Stack
} from '@mui/material';
import { 
  Email,
  Key,
  Lock,
  ArrowBack,
  Visibility, 
  VisibilityOff
} from '@mui/icons-material';
import { CentralDecoration } from './DecorativeElements';
import LoadingAnimation from './LoadingAnimation';

const ForgotPasswordForm = ({ onCancel, onSuccess }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form States
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const steps = [
    'Email Verification',
    'OTP Verification',
    'Reset Password'
  ];
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Verification code sent to your email');
      setActiveStep(1);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Code verified successfully');
      setActiveStep(2);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Password has been reset successfully');
      
      // Notify parent component
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    if (loading) {
      return (
        <LoadingAnimation 
          message={
            activeStep === 0 ? "Sending verification code..." :
            activeStep === 1 ? "Verifying code..." :
            "Resetting password..."
          }
        />
      );
    }
    
    switch (activeStep) {
      case 0:
        return (
          <Box component="form" onSubmit={handleEmailSubmit} sx={{ width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              Enter your email address and we will send you a verification code to reset your password
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>}
            
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 2,
                height: 56,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Send Verification Code
            </Button>
          </Box>
        );
        
      case 1:
        return (
          <Box component="form" onSubmit={handleVerifyCode} sx={{ width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              Please enter the verification code sent to {email}
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3, width: '100%' }}>{success}</Alert>}
            
            <TextField
              fullWidth
              id="verificationCode"
              label="Verification Code"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 2,
                height: 56,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                mb: 2
              }}
            >
              Verify Code
            </Button>
            
            <Button
              fullWidth
              color="inherit"
              onClick={() => {
                setActiveStep(0);
                setSuccess('');
              }}
              startIcon={<ArrowBack />}
              sx={{ 
                textTransform: 'none',
                width: '100%'
              }}
            >
              Back to Email
            </Button>
          </Box>
        );
        
      case 2:
        return (
          <Box component="form" onSubmit={handleResetPassword} sx={{ width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              Create a new password for your account
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3, width: '100%' }}>{success}</Alert>}
            
            <TextField
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 2,
                height: 56,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                mb: 2
              }}
            >
              Reset Password
            </Button>
            
            <Button
              fullWidth
              color="inherit"
              onClick={() => {
                setActiveStep(1);
                setSuccess('');
              }}
              startIcon={<ArrowBack />}
              sx={{ 
                textTransform: 'none',
                width: '100%'
              }}
            >
              Back to Verification
            </Button>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%'
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom textAlign="center">
          Reset Password
        </Typography>
        
        <CentralDecoration />
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', maxWidth: 500, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ width: '100%', maxWidth: 500, display: 'flex', justifyContent: 'center' }}>
          {renderStep()}
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onCancel}
            sx={{ fontWeight: 'medium' }}
          >
            Back to Login
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ForgotPasswordForm; 