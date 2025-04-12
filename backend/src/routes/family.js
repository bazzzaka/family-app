const express = require('express');
const router = express.Router();
const FamilyGroup = require('../models/FamilyGroup');
const User = require('../models/User');
const { authenticate } = require('../middlewares/auth');
const { uploadSingle } = require('../middlewares/upload');

// Create a new family group
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, type, isPrivate } = req.body;
    
    const familyGroup = new FamilyGroup({
      name,
      description,
      type,
      isPrivate,
      creator: req.userId,
      members: [{ user: req.userId, role: 'admin' }]
    });
    
    await familyGroup.save();
    
    // Add family group to user's groups
    await User.findByIdAndUpdate(req.userId, {
      $push: { familyGroups: familyGroup._id }
    });
    
    res.status(201).json(familyGroup);
  } catch (error) {
    console.error('Create family group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all family groups for current user
router.get('/', authenticate, async (req, res) => {
  try {
    // Find all family groups where user is a member
    const user = await User.findById(req.userId).populate('familyGroups');
    
    res.json(user.familyGroups);
  } catch (error) {
    console.error('Get family groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get family group by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findById(req.params.id)
      .populate('members.user', 'username firstName lastName profilePicture')
      .populate('creator', 'username firstName lastName profilePicture');
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is a member
    const isMember = familyGroup.members.some(member => 
      member.user._id.toString() === req.userId.toString()
    );
    
    if (!isMember && familyGroup.isPrivate) {
      return res.status(403).json({ message: 'Not authorized to view this family group' });
    }
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Get family group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update family group
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    
    const familyGroup = await FamilyGroup.findById(req.params.id);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is admin
    const memberIndex = familyGroup.members.findIndex(
      member => member.user.toString() === req.userId.toString()
    );
    
    if (memberIndex === -1 || familyGroup.members[memberIndex].role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this family group' });
    }
    
    // Update fields
    familyGroup.name = name || familyGroup.name;
    familyGroup.description = description || familyGroup.description;
    familyGroup.isPrivate = isPrivate !== undefined ? isPrivate : familyGroup.isPrivate;
    
    await familyGroup.save();
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Update family group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member to family group
router.post('/:id/members', authenticate, async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    const familyGroup = await FamilyGroup.findById(req.params.id);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is admin
    const memberIndex = familyGroup.members.findIndex(
      member => member.user.toString() === req.userId.toString()
    );
    
    if (memberIndex === -1 || familyGroup.members[memberIndex].role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to add members to this family group' });
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is already a member
    const isAlreadyMember = familyGroup.members.some(
      member => member.user.toString() === userId
    );
    
    if (isAlreadyMember) {
      return res.status(400).json({ message: 'User is already a member of this family group' });
    }
    
    // Add member
    familyGroup.members.push({ user: userId, role: role || 'member' });
    await familyGroup.save();
    
    // Add family group to user's groups
    await User.findByIdAndUpdate(userId, {
      $push: { familyGroups: familyGroup._id }
    });
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove member from family group
router.delete('/:id/members/:userId', authenticate, async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findById(req.params.id);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is admin or removing self
    const isAdmin = familyGroup.members.some(
      member => member.user.toString() === req.userId.toString() && member.role === 'admin'
    );
    
    const isSelf = req.userId.toString() === req.params.userId;
    
    if (!isAdmin && !isSelf) {
      return res.status(403).json({ message: 'Not authorized to remove members from this family group' });
    }
    
    // Cannot remove the creator unless it's self-removal
    const isCreator = familyGroup.creator.toString() === req.params.userId;
    
    if (isCreator && !isSelf) {
      return res.status(400).json({ message: 'Cannot remove the creator from the family group' });
    }
    
    // Remove member
    familyGroup.members = familyGroup.members.filter(
      member => member.user.toString() !== req.params.userId
    );
    
    // If creator is leaving, assign a new admin as creator
    if (isCreator && isSelf) {
      const newAdmin = familyGroup.members.find(member => member.role === 'admin');
      
      if (newAdmin) {
        familyGroup.creator = newAdmin.user;
      } else if (familyGroup.members.length > 0) {
        // If no admin, promote first member
        familyGroup.members[0].role = 'admin';
        familyGroup.creator = familyGroup.members[0].user;
      } else {
        // If no members left, delete the group
        await FamilyGroup.findByIdAndDelete(req.params.id);
        
        // Remove family group from user's groups
        await User.findByIdAndUpdate(req.params.userId, {
          $pull: { familyGroups: req.params.id }
        });
        
        return res.json({ message: 'Family group deleted as no members remain' });
      }
    }
    
    await familyGroup.save();
    
    // Remove family group from user's groups
    await User.findByIdAndUpdate(req.params.userId, {
      $pull: { familyGroups: req.params.id }
    });
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update family group cover image
router.put('/:id/cover', authenticate, uploadSingle('image'), async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findById(req.params.id);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is admin
    const isAdmin = familyGroup.members.some(
      member => member.user.toString() === req.userId.toString() && member.role === 'admin'
    );
    
    if (!isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this family group' });
    }
    
    // Update cover image
    if (req.file) {
      // Get path relative to uploads folder
      const filePath = `/uploads/${req.file.filename}`;
      familyGroup.coverImage = filePath;
      await familyGroup.save();
    }
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Update cover image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete family group
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findById(req.params.id);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    // Check if user is creator
    if (familyGroup.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this family group' });
    }
    
    // Remove family group from all members' groups
    for (const member of familyGroup.members) {
      await User.findByIdAndUpdate(member.user, {
        $pull: { familyGroups: req.params.id }
      });
    }
    
    await FamilyGroup.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Family group deleted successfully' });
  } catch (error) {
    console.error('Delete family group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 