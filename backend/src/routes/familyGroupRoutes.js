const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const familyGroupController = require('../controllers/familyGroupController');

// Get all family groups
router.get('/', auth, familyGroupController.getFamilyGroups);

// Get a specific family group
router.get('/:id', auth, familyGroupController.getFamilyGroup);

// Create a new family group
router.post('/', auth, familyGroupController.createFamilyGroup);

// Update a family group
router.put('/:id', auth, familyGroupController.updateFamilyGroup);

// Delete a family group
router.delete('/:id', auth, familyGroupController.deleteFamilyGroup);

// Add a member to a family group
router.post('/:id/members', auth, familyGroupController.addMember);

// Remove a member from a family group
router.delete('/:id/members/:userId', auth, familyGroupController.removeMember);

module.exports = router; 