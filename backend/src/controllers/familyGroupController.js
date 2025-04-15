const mongoose = require('mongoose');
const FamilyGroup = require('../models/FamilyGroup');

// Get all family groups for the authenticated user
exports.getFamilyGroups = async (req, res) => {
  try {
    const familyGroups = await FamilyGroup.find({
      'members.user': req.user.id
    }).sort({ updatedAt: -1 });
    
    res.json(familyGroups);
  } catch (error) {
    console.error('Error fetching family groups:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific family group
exports.getFamilyGroup = async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findOne({
      _id: req.params.id,
      'members.user': req.user.id
    }).populate('members.user', 'firstName lastName email profilePicture');
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    res.json(familyGroup);
  } catch (error) {
    console.error('Error fetching family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new family group
exports.createFamilyGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const newFamilyGroup = new FamilyGroup({
      name,
      description,
      members: [{
        user: req.user.id,
        role: 'admin'
      }],
      creator: req.user.id
    });
    
    const savedFamilyGroup = await newFamilyGroup.save();
    res.status(201).json(savedFamilyGroup);
  } catch (error) {
    console.error('Error creating family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a family group
exports.updateFamilyGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check if user is an admin of the group
    const familyGroup = await FamilyGroup.findOne({
      _id: req.params.id,
      'members.user': req.user.id,
      'members.role': 'admin'
    });
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found or you are not authorized to edit it' });
    }
    
    // Update the family group
    const updatedFamilyGroup = await FamilyGroup.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          name, 
          description,
          updatedAt: Date.now() 
        } 
      },
      { new: true }
    );
    
    res.json(updatedFamilyGroup);
  } catch (error) {
    console.error('Error updating family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a family group
exports.deleteFamilyGroup = async (req, res) => {
  try {
    // Check if user is an admin of the group
    const familyGroup = await FamilyGroup.findOne({
      _id: req.params.id,
      'members.user': req.user.id,
      'members.role': 'admin'
    });
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found or you are not authorized to delete it' });
    }
    
    await FamilyGroup.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Family group deleted successfully' });
  } catch (error) {
    console.error('Error deleting family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a member to a family group
exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    // Check if user is an admin of the group
    const familyGroup = await FamilyGroup.findOne({
      _id: req.params.id,
      'members.user': req.user.id,
      'members.role': 'admin'
    });
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found or you are not authorized to add members' });
    }
    
    // Check if user is already a member
    const isMember = familyGroup.members.some(member => member.user.toString() === userId);
    
    if (isMember) {
      return res.status(400).json({ message: 'User is already a member of this family group' });
    }
    
    // Add user to family group
    const updatedFamilyGroup = await FamilyGroup.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { 
          members: { 
            user: userId, 
            role: role || 'member',
            joinDate: Date.now() 
          } 
        },
        $set: { updatedAt: Date.now() } 
      },
      { new: true }
    ).populate('members.user', 'name email');
    
    res.json(updatedFamilyGroup);
  } catch (error) {
    console.error('Error adding member to family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove a member from a family group
exports.removeMember = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user is an admin of the group or the user being removed
    const familyGroup = await FamilyGroup.findOne({
      _id: req.params.id,
      $or: [
        { 'members.user': req.user.id, 'members.role': 'admin' },
        { _id: req.params.id, 'members.user': req.user.id, 'members.user': userId }
      ]
    });
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found or you are not authorized to remove this member' });
    }
    
    // Remove user from family group
    const updatedFamilyGroup = await FamilyGroup.findByIdAndUpdate(
      req.params.id,
      { 
        $pull: { members: { user: userId } },
        $set: { updatedAt: Date.now() } 
      },
      { new: true }
    ).populate('members.user', 'name email');
    
    res.json(updatedFamilyGroup);
  } catch (error) {
    console.error('Error removing member from family group:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 