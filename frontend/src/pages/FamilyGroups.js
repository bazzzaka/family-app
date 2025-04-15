import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FamilyGroupAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const FamilyGroups = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [familyGroups, setFamilyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Fetch family groups
  useEffect(() => {
    fetchFamilyGroups();
  }, []);

  // Get all family groups
  const fetchFamilyGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await FamilyGroupAPI.getAll();
      setFamilyGroups(response.data);
    } catch (err) {
      console.error('Error fetching family groups:', err);
      setError(t('familyGroups.errors.network'));
      
      // Show network errors in a more user-friendly way
      if (err.message === 'Network Error') {
        setError(t('familyGroups.errors.network'));
      } else if (err.response?.status === 401) {
        setError(t('familyGroups.errors.unauthorized'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
  };

  // Close create dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewGroupName('');
    setNewGroupDescription('');
  };

  // Handle field changes
  const handleNameChange = (e) => {
    setNewGroupName(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setNewGroupDescription(e.target.value);
  };

  // Create new family group
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    
    setCreating(true);
    try {
      const response = await FamilyGroupAPI.create({ 
        name: newGroupName,
        description: newGroupDescription
      });
      
      // Add new group to list and close dialog
      setFamilyGroups([...familyGroups, response.data]);
      handleCloseDialog();
      
      // Show success message
      setSnackbar({
        open: true,
        message: t('familyGroups.success.created'),
        severity: 'success'
      });
      
      // Navigate to the new group
      navigate(`/family/${response.data._id}`);
    } catch (err) {
      console.error('Error creating family group:', err);
      
      // Handle different error scenarios
      if (err.message === 'Network Error') {
        setSnackbar({
          open: true,
          message: t('familyGroups.errors.network'),
          severity: 'error'
        });
      } else if (err.response?.status === 401) {
        setSnackbar({
          open: true,
          message: t('familyGroups.errors.createUnauthorized'),
          severity: 'error'
        });
      } else {
        setSnackbar({
          open: true,
          message: t('familyGroups.errors.createFailed'),
          severity: 'error'
        });
      }
    } finally {
      setCreating(false);
    }
  };

  // Navigate to group detail page
  const handleGroupClick = (groupId) => {
    navigate(`/family/${groupId}`);
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {t('familyGroups.title')}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
          >
            {t('familyGroups.createButton')}
          </Button>
        </Grid>
        
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : familyGroups.length > 0 ? (
              <List>
                {familyGroups.map((group) => (
                  <ListItem 
                    key={group._id} 
                    disablePadding
                    divider
                  >
                    <ListItemButton onClick={() => handleGroupClick(group._id)}>
                      <ListItemText 
                        primary={group.name} 
                        secondary={group.description || t('familyGroups.noDescription')}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body1" color="textSecondary">
                  {t('familyGroups.noGroups')}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Create Family Group Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t('familyGroups.createDialog.title')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('familyGroups.createDialog.nameLabel')}
            fullWidth
            value={newGroupName}
            onChange={handleNameChange}
            disabled={creating}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={t('familyGroups.createDialog.descriptionLabel')}
            fullWidth
            multiline
            rows={3}
            value={newGroupDescription}
            onChange={handleDescriptionChange}
            disabled={creating}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={creating}>
            {t('familyGroups.createDialog.cancelButton')}
          </Button>
          <Button 
            onClick={handleCreateGroup} 
            color="primary"
            disabled={!newGroupName.trim() || creating}
            variant="contained"
          >
            {creating ? <CircularProgress size={24} /> : t('familyGroups.createDialog.createButton')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FamilyGroups; 