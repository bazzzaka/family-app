import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear field error when typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        navigate('/');
      } catch (error) {
        // Error is handled by the AuthContext
        console.error('Login error:', error);
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography 
          component="h1" 
          variant="h4" 
          align="center" 
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{
            mb: 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`
          }}
        >
          Welcome Back
        </Typography>
        
        {/* Декоративні анімовані елементи */}
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
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2, 
                boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.15)}`
              }}
            >
              {error}
            </Alert>
          </motion.div>
        )}
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                },
                '&.Mui-focused': {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ 
                      color: showPassword ? theme.palette.primary.main : 'inherit'
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                },
                '&.Mui-focused': {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link 
                component={RouterLink} 
                to="/forgot-password" 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 'medium',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.primary.dark,
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </motion.div>
        
        {/* Декоративна лінія з анімованими елементами */}
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
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{ marginTop: '16px' }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={<LoginIcon />}
            sx={{
              mt: 1,
              mb: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                transform: 'translateY(-2px)'
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            }}
          >
            {loading ? (
              <CircularProgress 
                size={24} 
                sx={{ 
                  color: theme.palette.primary.contrastText 
                }} 
              />
            ) : (
              'Sign In'
            )}
          </Button>
        </motion.div>
        
        <Divider sx={{ my: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              px: 1
            }}
          >
            or
          </Typography>
        </Divider>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Don't have an account?
            </Typography>
            <Link 
              component={RouterLink} 
              to="/register" 
              sx={{
                textDecoration: 'none',
                fontWeight: 'medium',
                color: theme.palette.primary.main
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                Create an Account
              </Button>
            </Link>
          </Box>
        </motion.div>
        
        {/* Декоративний елемент внизу форми */}
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
      </Box>
    </motion.div>
  );
};

export default Login; 