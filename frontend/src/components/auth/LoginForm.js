import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
  useTheme,
  alpha,
  Stack,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  LoginOutlined,
  Email,
  Lock,
  Apple as AppleIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import LoadingAnimation from './LoadingAnimation';
import SuccessAnimation from './SuccessAnimation';
import SocialLoginButtons from './SocialLoginButtons';

const MotionButton = motion(Button);

const LoginForm = ({ onToggleForm, onForgotPassword }) => {
  const theme = useTheme();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'rememberMe' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear field-specific error when user edits that field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      await login(formData.email, formData.password, formData.rememberMe);
      // Show success animation before redirecting
      setShowSuccessAnimation(true);
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const socialButtonStyle = {
    borderRadius: 2,
    py: 1.2,
    fontWeight: 500,
    textTransform: 'none',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
  };

  if (showSuccessAnimation) {
    return <SuccessAnimation message="Login successful!" />;
  }

  if (isSubmitting) {
    return <LoadingAnimation message="Signing in..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom textAlign="center">
          Welcome Back
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} textAlign="center">
          Please sign in to continue to your family account
        </Typography>
        
        {loginError && (
          <Alert severity="error" sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
            {loginError}
          </Alert>
        )}
        
        <TextField
          label="Email"
          type="email"
          sx={{ width: '100%', maxWidth: 400 }}
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          sx={{ width: '100%', maxWidth: 400 }}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 400 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember me"
          />
          
          <Link 
            href="#" 
            variant="body2" 
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              if (onForgotPassword) onForgotPassword();
            }}
          >
            Forgot password?
          </Link>
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 2,
            height: 56,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            width: '100%',
            maxWidth: 400
          }}
        >
          Sign In
        </Button>
        
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <SocialLoginButtons type="login" />
        </Box>
        
        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 400 }}>
          <Typography variant="body2" display="inline">
            Don't have an account? 
          </Typography>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onToggleForm}
            sx={{ ml: 1, fontWeight: 'medium' }}
          >
            Create Account
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
};

export default LoginForm; 