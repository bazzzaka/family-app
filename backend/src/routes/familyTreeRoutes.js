const express = require('express');
const router = express.Router();
const familyTreeController = require('../controllers/familyTreeController');
const auth = require('../middlewares/auth');

// Get all family members for a family group
router.get('/family-group/:familyGroupId', auth, familyTreeController.getFamilyTree);

// Get a specific family member
router.get('/member/:memberId', auth, familyTreeController.getFamilyMember);

// Create a new family member
router.post('/member', auth, familyTreeController.createFamilyMember);

// Update a family member
router.put('/member/:memberId', auth, familyTreeController.updateFamilyMember);

// Delete a family member
router.delete('/member/:memberId', auth, familyTreeController.deleteFamilyMember);

module.exports = router; 