import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Typography,
  Grid,
  MenuItem,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Avatar
} from '@mui/material';
import { createFamilyMember } from '../../services/familyTreeService';

const AddFamilyMemberForm = ({ familyGroupId, existingMembers = [], onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    photo: '',
    parents: [],
    partners: []
  });

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle parent selection
  const handleParentChange = (e) => {
    const parentId = e.target.value;
    
    // Check if this parent is already selected
    if (formData.parents.includes(parentId)) {
      return;
    }
    
    // Only allow up to two parents
    if (formData.parents.length >= 2) {
      setFormData(prev => ({
        ...prev,
        parents: [parentId, prev.parents[0]]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        parents: [...prev.parents, parentId]
      }));
    }
  };

  // Handle partner selection
  const handlePartnerChange = (e) => {
    const partnerId = e.target.value;
    
    // Check if this partner is already selected
    const existingPartnerIndex = formData.partners.findIndex(
      p => typeof p === 'string' ? p === partnerId : p.type === partnerId
    );
    
    if (existingPartnerIndex !== -1) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      partners: [...prev.partners, {
        type: partnerId,
        relationship: 'married'
      }]
    }));
  };

  // Handle removing a parent
  const handleRemoveParent = (parentId) => {
    setFormData(prev => ({
      ...prev,
      parents: prev.parents.filter(id => id !== parentId)
    }));
  };

  // Handle removing a partner
  const handleRemovePartner = (partnerId) => {
    setFormData(prev => ({
      ...prev,
      partners: prev.partners.filter(p => 
        typeof p === 'string' ? p !== partnerId : p.type !== partnerId
      )
    }));
  };

  // Handle relationship type change
  const handleRelationshipChange = (partnerId, relationship) => {
    setFormData(prev => ({
      ...prev,
      partners: prev.partners.map(p => {
        if (typeof p === 'string' ? p === partnerId : p.type === partnerId) {
          return { type: p.type, relationship };
        }
        return p;
      })
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Prepare data for API
      const memberData = {
        ...formData,
        familyGroup: familyGroupId
      };
      
      // Call API to create family member
      await createFamilyMember(memberData);
      
      // Clear form and notify parent component
      setFormData({
        name: '',
        gender: 'male',
        birthDate: '',
        photo: '',
        parents: [],
        partners: []
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error adding family member:', err);
      setError('Failed to add family member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = existingMembers.find(m => m._id === memberId);
    return member ? member.name : 'Unknown';
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          
          <FormControl component="fieldset" margin="normal" required>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="male" 
                control={<Radio />} 
                label="Male" 
                disabled={loading}
              />
              <FormControlLabel 
                value="female" 
                control={<Radio />} 
                label="Female" 
                disabled={loading}
              />
              <FormControlLabel 
                value="other" 
                control={<Radio />} 
                label="Other" 
                disabled={loading}
              />
            </RadioGroup>
          </FormControl>
          
          <TextField
            margin="normal"
            fullWidth
            id="birthDate"
            label="Birth Date (YYYY-MM-DD)"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="e.g. 1990-01-15"
            disabled={loading}
            helperText="Enter date in YYYY-MM-DD format"
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="photo"
            label="Photo URL"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            disabled={loading}
            helperText="Enter URL for the person's photo"
          />
          
          {formData.photo && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src={formData.photo}
                alt={formData.name || "Preview"}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Relationships
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Parents (max 2)</FormLabel>
              {existingMembers.length > 0 ? (
                <TextField
                  select
                  fullWidth
                  value=""
                  onChange={handleParentChange}
                  disabled={loading || formData.parents.length >= 2}
                  helperText={formData.parents.length >= 2 ? "Maximum 2 parents allowed" : ""}
                >
                  <MenuItem value="" disabled>
                    Select a parent
                  </MenuItem>
                  {existingMembers.map(member => (
                    <MenuItem key={member._id} value={member._id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No existing members to select as parents
                </Typography>
              )}
              
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.parents.map(parentId => (
                  <Chip
                    key={parentId}
                    label={getMemberName(parentId)}
                    onDelete={() => handleRemoveParent(parentId)}
                    disabled={loading}
                  />
                ))}
              </Box>
            </FormControl>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Partners</FormLabel>
              {existingMembers.length > 0 ? (
                <TextField
                  select
                  fullWidth
                  value=""
                  onChange={handlePartnerChange}
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select a partner
                  </MenuItem>
                  {existingMembers.map(member => (
                    <MenuItem key={member._id} value={member._id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No existing members to select as partners
                </Typography>
              )}
              
              <Box sx={{ mt: 1 }}>
                {formData.partners.map((partner, index) => {
                  const partnerId = typeof partner === 'string' ? partner : partner.type;
                  const relationship = typeof partner === 'string' ? 'married' : partner.relationship;
                  
                  return (
                    <Box 
                      key={index} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mt: 1, 
                        p: 1, 
                        border: '1px solid #e0e0e0', 
                        borderRadius: 1 
                      }}
                    >
                      <Typography>{getMemberName(partnerId)}</Typography>
                      <TextField
                        select
                        size="small"
                        value={relationship}
                        onChange={(e) => handleRelationshipChange(partnerId, e.target.value)}
                        sx={{ minWidth: 120, ml: 'auto' }}
                        disabled={loading}
                      >
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                        <MenuItem value="engaged">Engaged</MenuItem>
                        <MenuItem value="partner">Partner</MenuItem>
                      </TextField>
                      <Button 
                        color="error" 
                        size="small" 
                        onClick={() => handleRemovePartner(partnerId)}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !formData.name}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Family Member"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddFamilyMemberForm; 