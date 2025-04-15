import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Grid,
  Button,
  TextField,
  Switch,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Badge,
  alpha,
  useTheme,
  Stack,
  Chip
} from '@mui/material';
import { 
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  ChevronRight as ChevronRightIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Login as LoginIcon,
  Cake as BirthdayIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Lock as PrivacyIcon,
  Notifications as NotificationsIcon,
  Palette as AppearanceIcon,
  Language as LanguageIcon,
  GroupAdd as FamilyIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Profile = () => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    birthday: '1988-04-15',
    bio: 'Family person, tech enthusiast, and outdoor adventurer. Love spending time with my kids and exploring new places.',
    avatar: null, // no image by default
    joinDate: 'January 2023',
    familyGroups: ['Johnson Family', 'Beach Vacation Group'],
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'English',
      privacy: 'Friends Only'
    },
    stats: {
      posts: 24,
      photos: 128,
      familyMembers: 16,
      events: 7
    },
    connectedAccounts: {
      facebook: true,
      twitter: false,
      instagram: true
    }
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    // For now, we'll just exit edit mode
    setEditMode(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
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
        damping: 24
      }
    }
  };

  // Apple-inspired colors
  const appleColors = {
    blue: '#0A84FF',
    green: '#30D158',
    indigo: '#5E5CE6',
    orange: '#FF9F0A',
    pink: '#FF375F',
    purple: '#BF5AF2',
    red: '#FF453A',
    teal: '#64D2FF',
    yellow: '#FFD60A',
    gray: '#8E8E93',
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      width: '100%',
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
        : 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)',
    }}>
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section with Avatar and Basic Info */}
        <MotionPaper
          variants={itemVariants}
          sx={{ 
            p: 0,
            mb: 3,
            overflow: 'hidden',
            borderRadius: '20px',
            background: theme.palette.mode === 'dark' 
              ? alpha('#2c2c2e', 0.6)
              : alpha('#ffffff', 0.8),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? alpha('#ffffff', 0.1) 
              : alpha('#000000', 0.05)}`,
            boxShadow: theme.palette.mode === 'dark'
              ? `0 4px 30px ${alpha('#000000', 0.2)}`
              : `0 4px 20px ${alpha('#000000', 0.05)}`,
          }}
        >
          {/* Cover Photo Area */}
          <Box sx={{ 
            height: 180, 
            background: `linear-gradient(135deg, ${appleColors.blue} 0%, ${appleColors.purple} 100%)`,
            position: 'relative'
          }}>
            {editMode && (
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  right: 16, 
                  top: 16,
                  backgroundColor: alpha('#ffffff', 0.2),
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.3),
                  }
                }}
              >
                <CameraIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            )}
          </Box>
          
          {/* Avatar and Name */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: { xs: 'center', md: 'space-between' },
            px: 4,
            pb: 3,
            mt: -8
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3
            }}>
              {/* Profile Avatar */}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  editMode && (
                    <IconButton 
                      sx={{ 
                        backgroundColor: appleColors.blue,
                        '&:hover': {
                          backgroundColor: alpha(appleColors.blue, 0.9),
                        }
                      }}
                      size="small"
                    >
                      <CameraIcon sx={{ color: '#ffffff', fontSize: 16 }} />
                    </IconButton>
                  )
                }
              >
                <Avatar 
                  sx={{ 
                    width: 150, 
                    height: 150,
                    border: `4px solid ${theme.palette.mode === 'dark' ? '#2c2c2e' : '#ffffff'}`,
                    boxShadow: `0 4px 20px ${alpha('#000000', 0.2)}`
                  }}
                  src={userData.avatar}
                >
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
              </Badge>
              
              {/* Name and Basic Info */}
              <Box sx={{ 
                textAlign: { xs: 'center', sm: 'left' },
                mt: { xs: 2, sm: 0 }
              }}>
                {editMode ? (
                  <TextField
                    variant="outlined"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    size="small"
                  />
                ) : (
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                    }}
                  >
                    {userData.name}
                  </Typography>
                )}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Member since {userData.joinDate}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  {userData.familyGroups.map((group, index) => (
                    <Chip 
                      key={index}
                      label={group}
                      size="small"
                      sx={{ 
                        backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                        color: appleColors.blue,
                        fontWeight: 500,
                        borderRadius: '8px'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            
            {/* Edit/Save Buttons */}
            <Box sx={{ mt: { xs: 3, md: 0 } }}>
              {editMode ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={toggleEditMode}
                    sx={{
                      borderColor: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.2) : alpha('#000000', 0.1),
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                      '&:hover': {
                        borderColor: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.3) : alpha('#000000', 0.2),
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                      backgroundColor: appleColors.blue,
                      '&:hover': {
                        backgroundColor: alpha(appleColors.blue, 0.9)
                      }
                    }}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={toggleEditMode}
                  sx={{
                    backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                    color: appleColors.blue,
                    '&:hover': {
                      backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.3 : 0.2)
                    }
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Box>
          
          {/* Stats Row */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            py: 2,
            px: 4,
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha('#000000', 0.2)
              : alpha('#f5f5f7', 0.5)
          }}>
            {Object.entries(userData.stats).map(([key, value]) => (
              <Box key={key} sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  }}
                >
                  {value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    textTransform: 'capitalize'
                  }}
                >
                  {key}
                </Typography>
              </Box>
            ))}
          </Box>
        </MotionPaper>
        
        {/* Tabs Navigation */}
        <MotionPaper
          variants={itemVariants}
          sx={{ 
            mb: 3,
            borderRadius: '16px',
            background: theme.palette.mode === 'dark' 
              ? alpha('#2c2c2e', 0.6)
              : alpha('#ffffff', 0.8),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? alpha('#ffffff', 0.1) 
              : alpha('#000000', 0.05)}`,
            boxShadow: 'none',
            overflow: 'hidden'
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: appleColors.blue,
                height: 3,
              },
              '& .MuiTab-root': {
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              },
              '& .Mui-selected': {
                color: appleColors.blue + ' !important',
              }
            }}
          >
            <Tab label="About" />
            <Tab label="Preferences" />
            <Tab label="Connected Accounts" />
          </Tabs>
        </MotionPaper>
        
        {/* Tab Content */}
        {activeTab === 0 && (
          <MotionPaper
            variants={itemVariants}
            sx={{ 
              p: 3,
              borderRadius: '16px',
              background: theme.palette.mode === 'dark' 
                ? alpha('#2c2c2e', 0.6)
                : alpha('#ffffff', 0.8),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' 
                ? alpha('#ffffff', 0.1) 
                : alpha('#000000', 0.05)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 30px ${alpha('#000000', 0.2)}`
                : `0 4px 20px ${alpha('#000000', 0.05)}`,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
              }}
            >
              About Me
            </Typography>
            
            {editMode ? (
              <TextField
                variant="outlined"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
            ) : (
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  lineHeight: 1.6
                }}
              >
                {userData.bio}
              </Typography>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ 
                    mr: 2, 
                    color: appleColors.blue
                  }} />
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {userData.email}
                    </Typography>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ 
                    mr: 2, 
                    color: appleColors.green
                  }} />
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {userData.phone}
                    </Typography>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ 
                    mr: 2, 
                    color: appleColors.red
                  }} />
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="location"
                      value={userData.location}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {userData.location}
                    </Typography>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BirthdayIcon sx={{ 
                    mr: 2, 
                    color: appleColors.purple
                  }} />
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      type="date"
                    />
                  ) : (
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {new Date(userData.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </MotionPaper>
        )}
        
        {activeTab === 1 && (
          <MotionPaper
            variants={itemVariants}
            sx={{ 
              p: 3,
              borderRadius: '16px',
              background: theme.palette.mode === 'dark' 
                ? alpha('#2c2c2e', 0.6)
                : alpha('#ffffff', 0.8),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' 
                ? alpha('#ffffff', 0.1) 
                : alpha('#000000', 0.05)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 30px ${alpha('#000000', 0.2)}`
                : `0 4px 20px ${alpha('#000000', 0.05)}`,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
              }}
            >
              App Preferences
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NotificationsIcon sx={{ 
                    mr: 2, 
                    color: appleColors.orange
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Notifications
                  </Typography>
                </Box>
                <Switch 
                  checked={userData.preferences.notifications}
                  color="primary"
                  disabled={!editMode}
                />
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AppearanceIcon sx={{ 
                    mr: 2, 
                    color: appleColors.indigo
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Dark Mode
                  </Typography>
                </Box>
                <Switch 
                  checked={userData.preferences.darkMode}
                  color="primary"
                  disabled={!editMode}
                />
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageIcon sx={{ 
                    mr: 2, 
                    color: appleColors.teal
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Language
                  </Typography>
                </Box>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  {userData.preferences.language}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PrivacyIcon sx={{ 
                    mr: 2, 
                    color: appleColors.gray
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Privacy
                  </Typography>
                </Box>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  {userData.preferences.privacy}
                </Typography>
              </Box>
            </Stack>
          </MotionPaper>
        )}
        
        {activeTab === 2 && (
          <MotionPaper
            variants={itemVariants}
            sx={{ 
              p: 3,
              borderRadius: '16px',
              background: theme.palette.mode === 'dark' 
                ? alpha('#2c2c2e', 0.6)
                : alpha('#ffffff', 0.8),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' 
                ? alpha('#ffffff', 0.1) 
                : alpha('#000000', 0.05)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 4px 30px ${alpha('#000000', 0.2)}`
                : `0 4px 20px ${alpha('#000000', 0.05)}`,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
              }}
            >
              Connected Accounts
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FacebookIcon sx={{ 
                    mr: 2, 
                    color: '#1877F2' // Facebook blue
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Facebook
                  </Typography>
                </Box>
                {userData.connectedAccounts.facebook ? (
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: appleColors.green,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Connected
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<LoginIcon />}
                    disabled={!editMode}
                    sx={{
                      color: appleColors.blue,
                    }}
                  >
                    Connect
                  </Button>
                )}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TwitterIcon sx={{ 
                    mr: 2, 
                    color: '#1DA1F2' // Twitter blue
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Twitter
                  </Typography>
                </Box>
                {userData.connectedAccounts.twitter ? (
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: appleColors.green,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Connected
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<LoginIcon />}
                    disabled={!editMode}
                    sx={{
                      color: appleColors.blue,
                    }}
                  >
                    Connect
                  </Button>
                )}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InstagramIcon sx={{ 
                    mr: 2, 
                    color: '#E1306C' // Instagram color
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Instagram
                  </Typography>
                </Box>
                {userData.connectedAccounts.instagram ? (
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: appleColors.green,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Connected
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<LoginIcon />}
                    disabled={!editMode}
                    sx={{
                      color: appleColors.blue,
                    }}
                  >
                    Connect
                  </Button>
                )}
              </Box>
              
              {/* Add Family Networks */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha('#ffffff', 0.05)
                  : alpha('#000000', 0.02),
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FamilyIcon sx={{ 
                    mr: 2, 
                    color: appleColors.purple
                  }} />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.9) : '#1d1d1f',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Family Networks
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<ChevronRightIcon />}
                  sx={{
                    color: appleColors.blue,
                  }}
                >
                  Manage
                </Button>
              </Box>
            </Stack>
          </MotionPaper>
        )}
      </MotionBox>
    </Box>
  );
};

export default Profile; 