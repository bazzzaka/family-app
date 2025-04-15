import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Switch, 
  Divider, 
  ListSubheader,
  Button,
  Card,
  CardContent,
  Grid,
  alpha,
  MenuItem,
  FormControl,
  Select,
  Alert,
  Snackbar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Notifications as NotificationsIcon, 
  Lock as PrivacyIcon,
  Language as LanguageIcon,
  Palette as AppearanceIcon,
  DataUsage as StorageIcon,
  Help as HelpIcon,
  Info as AboutIcon,
  Security as SecurityIcon,
  Update as UpdateIcon,
  BugReport as BugIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Motion components
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionBox = motion(Box);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const Settings = () => {
  const theme = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateAccountEnabled, setPrivateAccountEnabled] = useState(false);
  const [dataUsageEnabled, setDataUsageEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    changeLanguage(newLanguage);
    setSnackbarMessage(`Language changed to ${newLanguage === 'en' ? 'English' : 'Ukrainian'}`);
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'uk', label: 'Українська' }
  ];
  
  return (
    <Box
      component={MotionBox}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: { 
          xs: '100%', 
          sm: '95%', 
          md: '92%', 
          lg: '1200px', 
          xl: '1800px',
          '@media (min-width:2560px)': '2400px',
          '@media (min-width:3840px)': '3200px'
        },
        mx: 'auto',
        minHeight: '100vh',
        width: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
          : 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)',
      }}
    >
      <Typography 
        variant="h4" 
        component={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, #0A84FF, #5E5CE6)' 
            : 'linear-gradient(90deg, #0A84FF, #5E5CE6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          textAlign: 'center'
        }}
      >
        {t('settings.title') || 'Settings'}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MotionCard
            variants={itemVariants}
            sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              background: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.2 : 0.7),
              overflow: 'hidden',
              mb: 3,
            }}
          >
            <List
              subheader={
                <ListSubheader 
                  sx={{ 
                    bgcolor: 'transparent',
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '1.1rem',
                    pt: 2,
                    pb: 1
                  }}
                >
                  {t('settings.preferences') || 'Preferences'}
                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.language') || 'Language'}
                  secondary={languages.find(l => l.value === selectedLanguage)?.label || 'English'}
                />
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.notifications') || 'Notifications'}
                  secondary={notificationsEnabled ? 
                    (t('settings.enabled') || 'Enabled') : 
                    (t('settings.disabled') || 'Disabled')}
                />
                <Switch
                  edge="end"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  color="primary"
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                  <PrivacyIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.privacy') || 'Private Account'}
                  secondary={privateAccountEnabled ? 
                    (t('settings.private') || 'Private') : 
                    (t('settings.public') || 'Public')}
                />
                <Switch
                  edge="end"
                  checked={privateAccountEnabled}
                  onChange={() => setPrivateAccountEnabled(!privateAccountEnabled)}
                  color="error"
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.success.main }}>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.data') || 'Optimize Data Usage'}
                  secondary={dataUsageEnabled ? 
                    (t('settings.optimized') || 'Optimized') : 
                    (t('settings.fullQuality') || 'Full Quality')}
                />
                <Switch
                  edge="end"
                  checked={dataUsageEnabled}
                  onChange={() => setDataUsageEnabled(!dataUsageEnabled)}
                  color="success"
                />
              </ListItem>
            </List>
          </MotionCard>
          
          <MotionCard
            variants={itemVariants}
            sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              background: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.2 : 0.7),
              overflow: 'hidden'
            }}
          >
            <List
              subheader={
                <ListSubheader 
                  sx={{ 
                    bgcolor: 'transparent',
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '1.1rem',
                    pt: 2,
                    pb: 1
                  }}
                >
                  {t('settings.about') || 'About'}
                </ListSubheader>
              }
            >
              <ListItem button>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <AboutIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.aboutApp') || 'About Family App'}
                  secondary={t('settings.version') || 'Version 1.0.0'}
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem button>
                <ListItemIcon sx={{ color: theme.palette.warning.main }}>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.privacy') || 'Privacy Policy'}
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem button>
                <ListItemIcon sx={{ color: theme.palette.info.main }}>
                  <UpdateIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.checkUpdates') || 'Check for Updates'}
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem button>
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                  <BugIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t('settings.reportIssue') || 'Report an Issue'}
                />
              </ListItem>
            </List>
          </MotionCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <MotionCard
            variants={itemVariants}
            sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              background: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.2 : 0.7),
              overflow: 'hidden',
              mb: 3,
              height: '100%'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AppearanceIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                <Typography 
                  variant="h6" 
                  fontWeight="600"
                  sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  {t('settings.appearance') || 'Appearance & Theme'}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                }}
              >
                {t('settings.appearanceDescription') || 'Customize the look and feel of the app to match your style.'}
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mt: 2
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography 
                      variant="subtitle1"
                      fontWeight="500"
                      sx={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {theme.palette.mode === 'dark' ? 
                        (t('settings.darkMode') || 'Dark Mode') : 
                        (t('settings.lightMode') || 'Light Mode')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {theme.palette.mode === 'dark' ? 
                        (t('settings.darkModeDescription') || 'Easier on the eyes in low light') : 
                        (t('settings.lightModeDescription') || 'Classic bright appearance')}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="500"
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      color: theme.palette.primary.main
                    }}
                  >
                    {theme.palette.mode === 'dark' ? 'On' : 'Off'}
                  </Typography>
                </Paper>
                
                <Box sx={{ mt: 1 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight="600"
                    sx={{
                      mb: 1,
                      mt: 3,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {t('settings.help') || 'Help & Support'}
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 2,
                      mt: 2
                    }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<HelpIcon />}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.05)
                        }
                      }}
                    >
                      {t('settings.helpCenter') || 'Help Center'}
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BugIcon />}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: alpha(theme.palette.error.main, 0.5),
                        color: theme.palette.error.main,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        '&:hover': {
                          borderColor: theme.palette.error.main,
                          backgroundColor: alpha(theme.palette.error.main, 0.05)
                        }
                      }}
                    >
                      {t('settings.reportIssue') || 'Report Issue'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ 
            borderRadius: 3,
            fontWeight: 500,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    </Box>
  );
};

export default Settings; 