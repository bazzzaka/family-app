import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
  useMediaQuery,
  Button,
  Container
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Dashboard as DashboardIcon,
  Message as MessageIcon,
  PhotoLibrary as PhotoLibraryIcon,
  People as PeopleIcon,
  MonetizationOn as MonetizationOnIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { DrawerHeader } from './DrawerHeader';

const drawerWidth = 240;

// Create motion components using motion.create instead of motion()
const MotionDiv = motion.div;
const MotionIconButton = motion.create(IconButton);
const MotionListItem = motion.create(ListItem);

const AppLayout = ({ toggleTheme, darkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const navigateTo = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Animation variants
  const drawerVariants = {
    open: {
      width: drawerWidth,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    closed: {
      width: isMobile ? 0 : 64,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    closed: {
      x: -30,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
    hover: { 
      scale: 1.1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10
      }
    }
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Photo Albums', icon: <PhotoLibraryIcon />, path: '/albums' },
    { text: 'Family Groups', icon: <PeopleIcon />, path: '/family' },
    { text: 'Budget', icon: <MonetizationOnIcon />, path: '/budgets' },
  ];
  
  const secondaryMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'My Profile', icon: <AccountCircle />, path: '/profile' },
  ];

  const isActiveRoute = (path) => {
    // Check if current location matches the item path
    return location.pathname === path;
  };
  
  // Find the active route for displaying in the AppBar
  const activeRoute = menuItems.find(item => isActiveRoute(item.path)) || 
                     secondaryMenuItems.find(item => isActiveRoute(item.path));
  
  const activeTitle = activeRoute ? activeRoute.text : 'Сімейний Додаток';

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 64}px)` },
          ml: { md: drawerOpen ? `${drawerWidth}px` : '64px' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha('#1c1c1e', 0.8)
            : alpha('#ffffff', 0.8),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          color: theme.palette.text.primary,
          boxShadow: theme.palette.mode === 'dark'
            ? `0 4px 20px ${alpha('#000000', 0.2)}`
            : `0 4px 20px ${alpha('#000000', 0.05)}`,
        }}
      >
        <Toolbar
          sx={{
            pr: '24px',
            pl: { xs: '16px', md: '24px' },
            transition: theme.transitions.create(['margin', 'width', 'padding'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            '& .MuiIconButton-root': {
              mr: 2,
            },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
                ...(drawerOpen && { display: { xs: 'flex', md: 'none' } }),
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {(!drawerOpen || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" noWrap component="div">
                  {activeTitle}
                </Typography>
              </motion.div>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MotionIconButton
              onClick={toggleTheme}
              color="inherit"
              size="large"
              aria-label="toggle theme"
              animate={{ 
                rotate: darkMode ? 360 : 0,
                scale: 1.0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                transition: 'all 0.2s',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </MotionIconButton>
            
            <MotionIconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              size="large"
              aria-label="show notifications"
              color="inherit"
              onClick={handleNotificationsMenuOpen}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                transition: 'all 0.2s',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </MotionIconButton>
            <Tooltip title="Account settings">
              <MotionIconButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  background: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Avatar
                  alt={user?.firstName}
                  src={user?.profilePicture}
                  sx={{ 
                    width: 32, 
                    height: 32,
                    border: `2px solid ${theme.palette.primary.main}`
                  }}
                />
              </MotionIconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ 
          width: { md: drawerOpen ? drawerWidth : 64 }, 
          flexShrink: { md: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Mobile drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: 'none',
              },
            }}
          >
            <DrawerHeader sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: theme.spacing(0, 1),
              justifyContent: 'space-between',
              ...theme.mixins.toolbar 
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', paddingLeft: theme.spacing(2) }}
              >
                <Typography variant="h6" noWrap component="div">
                  {activeTitle}
                </Typography>
              </motion.div>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            
            <Divider />
            
            <List sx={{ paddingLeft: 0, marginLeft: 0 }}>
              {menuItems.map((route) => (
                <ListItem
                  key={route.path}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === route.path ? (
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)'
                      ) : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={route.text} 
                      sx={{ 
                        opacity: drawerOpen ? 1 : 0,
                        fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                        '& .MuiTypography-root': {
                          fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                          color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                        }
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <List sx={{ paddingLeft: 0, marginLeft: 0 }}>
              {secondaryMenuItems.map((route) => (
                <ListItem
                  key={route.path}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === route.path ? (
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)'
                      ) : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={route.text} 
                      sx={{ 
                        opacity: drawerOpen ? 1 : 0,
                        fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                        '& .MuiTypography-root': {
                          fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                          color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                        }
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    color: theme.palette.error.main
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.error.main }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout" 
                    sx={{ 
                      color: theme.palette.error.main,
                      '& .MuiTypography-root': {
                        color: theme.palette.error.main
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        )}
        
        {/* Desktop drawer */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            open={drawerOpen}
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerOpen ? drawerWidth : 64,
                overflowX: 'hidden',
                border: 'none',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              },
            }}
          >
            <DrawerHeader sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: theme.spacing(0, 1),
              justifyContent: 'space-between',
              ...theme.mixins.toolbar 
            }}>
              {drawerOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', paddingLeft: theme.spacing(2) }}
                >
                  <Typography variant="h6" noWrap component="div">
                    {activeTitle}
                  </Typography>
                </motion.div>
              )}
              <IconButton onClick={handleDrawerToggle}>
                {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            
            <Divider />
            
            <List sx={{ paddingLeft: 0, marginLeft: 0 }}>
              {menuItems.map((route) => (
                <ListItem
                  key={route.path}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === route.path ? (
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)'
                      ) : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={route.text} 
                      sx={{ 
                        opacity: drawerOpen ? 1 : 0,
                        fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                        '& .MuiTypography-root': {
                          fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                          color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                        }
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <List sx={{ paddingLeft: 0, marginLeft: 0 }}>
              {secondaryMenuItems.map((route) => (
                <ListItem
                  key={route.path}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: location.pathname === route.path ? (
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)'
                      ) : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={route.text} 
                      sx={{ 
                        opacity: drawerOpen ? 1 : 0,
                        fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                        '& .MuiTypography-root': {
                          fontWeight: location.pathname === route.path ? 'bold' : 'normal',
                          color: location.pathname === route.path ? theme.palette.primary.main : 'inherit',
                        }
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ 
              position: 'absolute', 
              bottom: 0, 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: 2,
              pb: 3,
              opacity: drawerOpen ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}>
              <Divider sx={{ width: '80%', mb: 2 }} />
              {drawerOpen && (
                <MotionIconButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  color="error"
                  sx={{
                    border: `1px solid ${alpha(theme.palette.error.main, 0.5)}`,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                    }
                  }}
                >
                  <LogoutIcon />
                </MotionIconButton>
              )}
            </Box>
          </Drawer>
        )}
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: {
            xs: '100%',
            md: `calc(100% - ${drawerOpen ? drawerWidth : 64}px)`,
          },
          ml: { md: drawerOpen ? `${drawerWidth}px` : '64px' },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: 8, // Space for AppBar
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: 0,
            margin: 0,
            px: { xs: 2, sm: 3, md: 4 },
            pb: 4,
            '& .MuiBox-root, & .MuiContainer-root, & .MuiPaper-root, & .MuiGrid-container, & .MuiGrid-item, & .MuiCardContent-root, & .MuiCard-root': {
              paddingLeft: '0 !important', 
              marginLeft: '0 !important',
              borderLeft: 'none !important'
            },
            '& .css-p43sob, & .css-14e3o55, & .css-1at9qkq, & .css-hhdjsd-MuiContainer-root, & .css-xnzxvf-MuiCardContent-root, & .css-1bohzk3': {
              paddingLeft: '0 !important',
              marginLeft: '0 !important',
              borderLeft: 'none !important'
            },
            '& .MuiCardContent-root': {
              borderRadius: '20px',
              '& > div': {
                margin: 0,
                padding: 0
              }
            },
            '& .MuiBox-root': {
              boxSizing: 'border-box',
              maxWidth: '100%'
            },
            '& > *': {
              maxWidth: '100%',
              boxSizing: 'border-box'
            }
          }}
        >
          <Outlet />
        </Box>
      </Box>
      
      {/* Profile menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            borderRadius: 2,
            minWidth: 180,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          },
        }}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          navigate('/profile');
        }} sx={{ 
          py: 1.5,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }}>
          <ListItemIcon>
            <AccountCircle color="primary" />
          </ListItemIcon>
          <Typography variant="body1">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose();
          navigate('/settings');
        }} sx={{ 
          py: 1.5,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }}>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <Typography variant="body1">Settings</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ 
          py: 1.5,
          color: theme.palette.error.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.error.main, 0.1)
          }
        }}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
      
      {/* Notifications menu */}
      <Menu
        id="notifications-menu"
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            borderRadius: 2,
            minWidth: 280,
            maxHeight: 340,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
        </Box>
        <MenuItem sx={{ 
          py: 1.5,
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05)
          }
        }}>
          <ListItemIcon>
            <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.primary.main, 0.2) }}>
              <MessageIcon color="primary" fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>New message from John</Typography>
            <Typography variant="caption" color="text.secondary">10 minutes ago</Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ 
          py: 1.5,
          borderLeft: `3px solid ${theme.palette.secondary.main}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.05)
          }
        }}>
          <ListItemIcon>
            <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.secondary.main, 0.2) }}>
              <PhotoLibraryIcon color="secondary" fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>Sarah added new photos</Typography>
            <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ 
          py: 1.5,
          borderLeft: `3px solid ${theme.palette.warning.main}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.warning.main, 0.05)
          }
        }}>
          <ListItemIcon>
            <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.warning.main, 0.2) }}>
              <MonetizationOnIcon sx={{ color: theme.palette.warning.main }} fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>Budget reminder: Utility bill due</Typography>
            <Typography variant="caption" color="text.secondary">Yesterday</Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ 
          py: 1.5,
          borderLeft: `3px solid ${theme.palette.success.main}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.success.main, 0.05)
          }
        }}>
          <ListItemIcon>
            <Avatar sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.success.main, 0.2) }}>
              <PeopleIcon sx={{ color: theme.palette.success.main }} fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>New family member added</Typography>
            <Typography variant="caption" color="text.secondary">3 days ago</Typography>
          </Box>
        </MenuItem>
        <Box sx={{ p: 1.5, textAlign: 'center', borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button 
            size="small" 
            sx={{ 
              borderRadius: '20px',
              px: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
            onClick={handleNotificationsMenuClose}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default AppLayout; 