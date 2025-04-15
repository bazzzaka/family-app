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
  Grid,
  Stack,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Person,
  Email,
  Lock,
  Phone
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import LoadingAnimation from './LoadingAnimation';
import SuccessAnimation from './SuccessAnimation';
import SocialLoginButtons from './SocialLoginButtons';

const MotionButton = motion(Button);

const RegisterForm = ({ onToggleForm }) => {
  const theme = useTheme();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'agreeTerms' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear register error message when user makes changes
    if (registerError) {
      setRegisterError('');
    }
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\+?[0-9\s()-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.phone
      );
      // Show success animation
      setShowSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(
        error.message === 'Email already in use'
          ? 'This email is already registered. Please use a different email.'
          : 'An error occurred during registration. Please try again.'
      );
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

  // For social login/registration
  const handleSocialAuth = (provider) => {
    console.log(`Authenticate with ${provider}`);
    // To be implemented
  };

  const socialButtonStyle = {
    borderRadius: 2,
    py: 1.2,
    fontWeight: 500,
    textTransform: 'none',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
  };

  // If success animation is active
  if (showSuccess) {
    return <SuccessAnimation message="Account created successfully!" />;
  }

  // If loading is active
  if (isSubmitting) {
    return <LoadingAnimation message="Creating your account..." />;
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', maxWidth: 550, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}
        >
          Create Your Account
        </Typography>

        {registerError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: 500 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {registerError}
            </Alert>
          </motion.div>
        )}

        <Grid container spacing={2} sx={{ width: '100%', maxWidth: 500 }}>
          <Grid item xs={12} sm={6}>
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            sx={{ mt: 2 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone (optional)"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
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
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility('password')}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link
                  href="#"
                  sx={{ 
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  href="#"
                  sx={{ 
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mb: 2 }}
          />
          {errors.agreeTerms && (
            <Typography color="error" variant="caption" sx={{ ml: 2 }}>
              {errors.agreeTerms}
            </Typography>
          )}
        </motion.div>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 3,
              py: 1.2,
              height: 56,
              fontWeight: 600,
              boxShadow: '0 4px 12px ' + alpha(theme.palette.primary.main, 0.3)
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </motion.div>

        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <SocialLoginButtons type="register" />
        </Box>

        <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 500 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={onToggleForm}
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default RegisterForm; 