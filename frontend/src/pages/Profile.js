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
import { motion, AnimatePresence } from 'framer-motion';

// Create motion components using motion.create() instead of direct motion usage
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionAvatar = motion(Avatar);
const MotionDiv = motion.div;

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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.08,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 24
      }
    }
  };

  // Avatar animations
  const avatarVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Tab animations
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
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
      p: 0,
      pl: 0,
      width: '100%',
      maxWidth: { 
        xs: '100%', 
        sm: '95%', 
        md: '92%', 
        lg: '1200px', 
        xl: '1800px',
        '@media (min-width:2560px)': '2400px',
        '@media (min-width:3840px)': '3200px'
      },
      minHeight: '100vh',
      mx: 'auto',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%)' 
        : 'linear-gradient(180deg, #f2f2f7 0%, #ffffff 100%)',
      '& .MuiBox-root, & .MuiContainer-root, & .MuiGrid-root': {
        margin: 0,
        padding: 0,
        '&.css-p43sob, &.css-14e3o55, &.css-1at9qkq': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          '& > *': {
            paddingLeft: '0 !important',
            marginLeft: '0 !important',
          }
        }
      }
    }}>
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          pl: 0,
          ml: 0,
          boxSizing: 'border-box',
          position: 'relative',
          px: { xs: 2, sm: 3 },
          '& .MuiBox-root, & .MuiContainer-root, & .MuiGrid-root': {
            margin: 0,
            padding: 0,
            '&.css-p43sob, &.css-14e3o55': {
              paddingLeft: '0 !important',
              marginLeft: '0 !important',
              '& > *': {
                paddingLeft: '0 !important',
                marginLeft: '0 !important',
              }
            }
          }
        }}
      >
        {/* Header Section with Avatar and Basic Info */}
        <MotionPaper
          variants={itemVariants}
          sx={{ 
            p: 0,
            mb: 3,
            overflow: 'hidden',
            borderRadius: '24px',
            background: theme.palette.mode === 'dark' 
              ? alpha('#2c2c2e', 0.6)
              : alpha('#ffffff', 0.8),
            backdropFilter: 'blur(20px)',
            border: 'none',
            boxShadow: theme.palette.mode === 'dark'
              ? `0 8px 30px ${alpha('#000000', 0.3)}`
              : `0 8px 30px ${alpha('#000000', 0.1)}`,
            '& .MuiBox-root': {
              margin: 0,
              padding: 0,
              '&.css-p43sob, &.css-14e3o55': {
                paddingLeft: '0 !important',
                marginLeft: '0 !important',
                '& > *': {
                  paddingLeft: '0 !important',
                  marginLeft: '0 !important',
                }
              }
            },
            transition: 'all 0.3s ease-out'
          }}
        >
          {/* Cover Photo Area */}
          <Box sx={{ 
            height: { xs: 140, sm: 180 }, 
            background: `linear-gradient(135deg, ${appleColors.blue} 0%, ${appleColors.purple} 100%)`,
            position: 'relative',
            overflow: 'hidden'
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
            {/* Decorative Elements for the cover photo */}
            <Box 
              sx={{ 
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${appleColors.pink} 0%, ${appleColors.purple} 100%)`,
                opacity: 0.2,
                top: -150,
                right: -100,
                filter: 'blur(60px)'
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${appleColors.blue} 0%, ${appleColors.teal} 100%)`,
                opacity: 0.2,
                bottom: -80,
                left: 30,
                filter: 'blur(40px)'
              }} 
            />
          </Box>
          
          {/* Avatar and Name */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: { xs: 'center', md: 'space-between' },
            px: { xs: 2, sm: 4 },
            pb: 3,
            mt: { xs: -10, sm: -12 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3
            }}>
              {/* Profile Avatar */}
              <MotionAvatar
                whileHover="hover"
                variants={avatarVariants}
              >
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
                      width: { xs: 120, sm: 150 }, 
                      height: { xs: 120, sm: 150 },
                      border: `4px solid ${theme.palette.mode === 'dark' ? '#2c2c2e' : '#ffffff'}`,
                      boxShadow: `0 8px 32px ${alpha('#000000', 0.25)}`,
                      transition: 'all 0.3s ease'
                    }}
                    src={userData.avatar}
                  >
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                </Badge>
              </MotionAvatar>
              
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
                      fontSize: { xs: '1.8rem', sm: '2.2rem' },
                      lineHeight: 1.2
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
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    mb: 1
                  }}
                >
                  Member since {userData.joinDate}
                </Typography>
                <Box sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: 'wrap', 
                  justifyContent: { xs: 'center', sm: 'flex-start' } 
                }}>
                  <AnimatePresence>
                    {userData.familyGroups.map((group, index) => (
                      <MotionDiv
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 400
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Chip 
                          key={index}
                          label={group}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                            color: appleColors.blue,
                            fontWeight: 600,
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.3 : 0.15),
                            }
                          }}
                        />
                      </MotionDiv>
                    ))}
                  </AnimatePresence>
                </Box>
              </Box>
            </Box>
            
            {/* Edit/Save Buttons */}
            <Box sx={{ mt: { xs: 3, md: 0 } }}>
              {editMode ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
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
                  </MotionDiv>
                  <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
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
                  </MotionDiv>
                </Box>
              ) : (
                <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={toggleEditMode}
                    sx={{
                      backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                      color: appleColors.blue,
                      px: 3,
                      py: 1.2,
                      fontWeight: 600,
                      borderRadius: '12px',
                      '&:hover': {
                        backgroundColor: alpha(appleColors.blue, theme.palette.mode === 'dark' ? 0.3 : 0.2),
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${alpha(appleColors.blue, 0.3)}`,
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Edit Profile
                  </Button>
                </MotionDiv>
              )}
            </Box>
          </Box>
          
          {/* Stats Row */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            py: 2,
            px: 2,
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha('#000000', 0.2)
              : alpha('#f5f5f7', 0.5),
            border: 'none',
            '& .MuiBox-root': {
              margin: 0,
              padding: 0,
              '&.css-p43sob, &.css-14e3o55': {
                paddingLeft: '0 !important',
                marginLeft: '0 !important',
                '& > *': {
                  paddingLeft: '0 !important',
                  marginLeft: '0 !important',
                }
              }
            }
          }}>
            <AnimatePresence>
              {Object.entries(userData.stats).map(([key, value], index) => (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 500 }
                  }}
                >
                  <Box key={key} sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                        fontSize: { xs: '1.3rem', sm: '1.5rem' },
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : '#86868b',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        textTransform: 'capitalize',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      }}
                    >
                      {key}
                    </Typography>
                  </Box>
                </MotionDiv>
              ))}
            </AnimatePresence>
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
            border: 'none',
            boxShadow: 'none',
            overflow: 'hidden',
            '& .MuiTabs-root': {
              minHeight: '48px',
              paddingLeft: 0,
              marginLeft: 0
            },
            '& .MuiTab-root': {
              minHeight: '48px',
              padding: '12px 24px',
              paddingLeft: '24px !important',
              paddingRight: '24px !important',
              transition: 'all 0.3s ease'
            }
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
                borderRadius: '3px'
              },
              '& .MuiTab-root': {
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                color: theme.palette.mode === 'dark' ? alpha('#ffffff', 0.7) : alpha('#000000', 0.7),
                '&:hover': {
                  color: appleColors.blue + '!important',
                  opacity: 0.8
                }
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
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <MotionDiv
              key="about-tab"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              variants={tabVariants}
            >
              <MotionPaper
                variants={itemVariants}
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: '16px',
                  background: theme.palette.mode === 'dark' 
                    ? alpha('#2c2c2e', 0.6)
                    : alpha('#ffffff', 0.8),
                  backdropFilter: 'blur(20px)',
                  border: 'none',
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 4px 30px ${alpha('#000000', 0.2)}`
                    : `0 4px 20px ${alpha('#000000', 0.05)}`,
                  '& .MuiGrid-root': {
                    margin: 0,
                    '& .MuiGrid-item': {
                      paddingLeft: { xs: '8px !important', sm: '16px !important' },
                      paddingRight: { xs: '8px !important', sm: '16px !important' },
                      paddingBottom: '16px !important',
                    }
                  },
                  '& .MuiBox-root': {
                    margin: 0,
                    padding: '0 !important',
                    '.css-p43sob, .css-14e3o55': {
                      paddingLeft: '0 !important',
                      marginLeft: '0 !important',
                      '& > *': {
                        paddingLeft: '0 !important',
                        marginLeft: '0 !important',
                      }
                    },
                    '&.css-p43sob, &.css-14e3o55': {
                      paddingLeft: '0 !important',
                      marginLeft: '0 !important',
                      '& > *': {
                        paddingLeft: '0 !important',
                        marginLeft: '0 !important',
                      }
                    }
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
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
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {userData.bio}
                  </Typography>
                )}
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MotionDiv
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha('#ffffff', 0.05)
                          : alpha('#000000', 0.02),
                        transition: 'all 0.3s ease'
                      }}>
                        <EmailIcon sx={{ 
                          mr: 2, 
                          color: appleColors.blue,
                          fontSize: { xs: '1.3rem', sm: '1.5rem' }
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
                              fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                          >
                            {userData.email}
                          </Typography>
                        )}
                      </Box>
                    </MotionDiv>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MotionDiv
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha('#ffffff', 0.05)
                          : alpha('#000000', 0.02),
                        transition: 'all 0.3s ease'
                      }}>
                        <PhoneIcon sx={{ 
                          mr: 2, 
                          color: appleColors.green,
                          fontSize: { xs: '1.3rem', sm: '1.5rem' }
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
                              fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                          >
                            {userData.phone}
                          </Typography>
                        )}
                      </Box>
                    </MotionDiv>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MotionDiv
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha('#ffffff', 0.05)
                          : alpha('#000000', 0.02),
                        transition: 'all 0.3s ease'
                      }}>
                        <LocationIcon sx={{ 
                          mr: 2, 
                          color: appleColors.red,
                          fontSize: { xs: '1.3rem', sm: '1.5rem' }
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
                              fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                          >
                            {userData.location}
                          </Typography>
                        )}
                      </Box>
                    </MotionDiv>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <MotionDiv
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha('#ffffff', 0.05)
                          : alpha('#000000', 0.02),
                        transition: 'all 0.3s ease'
                      }}>
                        <BirthdayIcon sx={{ 
                          mr: 2, 
                          color: appleColors.purple,
                          fontSize: { xs: '1.3rem', sm: '1.5rem' }
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
                              fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                          >
                            {new Date(userData.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </Typography>
                        )}
                      </Box>
                    </MotionDiv>
                  </Grid>
                </Grid>
              </MotionPaper>
            </MotionDiv>
          )}
          
          {activeTab === 1 && (
            <MotionDiv
              key="preferences-tab"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              variants={tabVariants}
            >
              <MotionPaper
                variants={itemVariants}
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: '16px',
                  background: theme.palette.mode === 'dark' 
                    ? alpha('#2c2c2e', 0.6)
                    : alpha('#ffffff', 0.8),
                  backdropFilter: 'blur(20px)',
                  border: 'none',
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 4px 30px ${alpha('#000000', 0.2)}`
                    : `0 4px 20px ${alpha('#000000', 0.05)}`,
                  '& .MuiBox-root': {
                    padding: 'inherit !important'
                  }
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
            </MotionDiv>
          )}
          
          {activeTab === 2 && (
            <MotionDiv
              key="connected-accounts-tab"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              variants={tabVariants}
            >
              <MotionPaper
                variants={itemVariants}
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: '16px',
                  background: theme.palette.mode === 'dark' 
                    ? alpha('#2c2c2e', 0.6)
                    : alpha('#ffffff', 0.8),
                  backdropFilter: 'blur(20px)',
                  border: 'none',
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 4px 30px ${alpha('#000000', 0.2)}`
                    : `0 4px 20px ${alpha('#000000', 0.05)}`,
                  '& .MuiBox-root': {
                    padding: 'inherit !important'
                  }
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
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
};

export default Profile; 