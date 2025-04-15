const FamilyMember = require('../models/FamilyMember');

// Get all family members for a family group
exports.getFamilyTree = async (req, res) => {
  try {
    const { familyGroupId } = req.params;
    
    // Find all family members in this family group
    const familyMembers = await FamilyMember.find({ familyGroup: familyGroupId })
      .populate('parents', 'name gender photo')
      .populate('children', 'name gender photo')
      .populate('partners.type', 'name gender photo');
    
    if (!familyMembers.length) {
      return res.status(404).json({ message: 'No family members found in this family group' });
    }

    res.json(familyMembers);
  } catch (error) {
    console.error('Error fetching family tree:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific family member
exports.getFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    
    const member = await FamilyMember.findById(memberId)
      .populate('parents', 'name gender photo')
      .populate('children', 'name gender photo')
      .populate('partners.type', 'name gender photo');
    
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Error fetching family member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new family member
exports.createFamilyMember = async (req, res) => {
  try {
    const { 
      name, 
      gender, 
      birthDate, 
      photo, 
      familyGroup,
      parents,
      partners
    } = req.body;
    
    const newMember = new FamilyMember({
      name,
      gender,
      birthDate,
      photo,
      familyGroup,
      parents: parents || [],
      partners: partners || [],
      createdBy: req.user.id
    });
    
    const savedMember = await newMember.save();
    
    // If parents are specified, add this member as a child to each parent
    if (parents && parents.length) {
      await Promise.all(parents.map(parentId => 
        FamilyMember.findByIdAndUpdate(
          parentId,
          { $push: { children: savedMember._id } }
        )
      ));
    }
    
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error creating family member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a family member
exports.updateFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const updates = req.body;
    
    // Prevent updating certain fields directly
    delete updates.createdBy;
    delete updates.createdAt;
    updates.updatedAt = Date.now();
    
    const updatedMember = await FamilyMember.findByIdAndUpdate(
      memberId,
      { $set: updates },
      { new: true }
    );
    
    if (!updatedMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    
    res.json(updatedMember);
  } catch (error) {
    console.error('Error updating family member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a family member
exports.deleteFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    
    const member = await FamilyMember.findById(memberId);
    
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    
    // Remove this member from their parents' children arrays
    await Promise.all(member.parents.map(parentId =>
      FamilyMember.findByIdAndUpdate(
        parentId,
        { $pull: { children: memberId } }
      )
    ));
    
    // Remove this member from their children's parents arrays
    await Promise.all(member.children.map(childId =>
      FamilyMember.findByIdAndUpdate(
        childId,
        { $pull: { parents: memberId } }
      )
    ));
    
    // Remove this member from their partners' partners arrays
    await Promise.all(member.partners.map(partner =>
      FamilyMember.findByIdAndUpdate(
        partner.type,
        { $pull: { partners: { type: memberId } } }
      )
    ));
    
    await FamilyMember.findByIdAndDelete(memberId);
    
    res.json({ message: 'Family member deleted successfully' });
  } catch (error) {
    console.error('Error deleting family member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 