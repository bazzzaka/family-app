import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Chat as ChatIcon, 
  People as PeopleIcon, 
  AccountTree as TreeIcon,
  PhotoLibrary as PhotoIcon, 
  AccountBalance as BudgetIcon, 
  Settings as SettingsIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [familyGroups, setFamilyGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch family groups when dialog opens
  const handleTreeClick = async () => {
    setOpenDialog(true);
    await fetchFamilyGroups();
  };

  // Fetch family groups from API
  const fetchFamilyGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/family-groups');
      setFamilyGroups(response.data);
    } catch (err) {
      console.error('Error fetching family groups:', err);
      setError('Failed to load family groups');
    } finally {
      setLoading(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle selecting a family group
  const handleGroupSelect = (groupId) => {
    navigate(`/family-tree/${groupId}`);
    setOpenDialog(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Family Groups', icon: <PeopleIcon />, path: '/family' },
    { 
      text: 'Family Tree', 
      icon: <TreeIcon />, 
      action: handleTreeClick 
    },
    { text: 'Photo Albums', icon: <PhotoIcon />, path: '/albums' },
    { text: 'Budget', icon: <BudgetIcon />, path: '/budgets' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              {index === 3 && <Divider />}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={item.action ? item.action : () => navigate(item.path)}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Family Group Selection Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Select Family Group</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : familyGroups.length === 0 ? (
            <Typography>No family groups found. Create a family group first.</Typography>
          ) : (
            <List>
              {familyGroups.map(group => (
                <ListItem key={group._id} disablePadding>
                  <ListItemButton onClick={() => handleGroupSelect(group._id)}>
                    <ListItemText primary={group.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => navigate('/family')} color="primary">
            Manage Family Groups
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar; 