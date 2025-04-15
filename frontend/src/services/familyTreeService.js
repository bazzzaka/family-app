import { FamilyTreeAPI } from './api';

// Get all family members for a family group
export const getFamilyTree = async (familyGroupId) => {
  try {
    const response = await FamilyTreeAPI.getTree(familyGroupId);
    return response.data;
  } catch (error) {
    console.error('Error fetching family tree:', error);
    throw error;
  }
};

// Get a specific family member
export const getFamilyMember = async (memberId) => {
  try {
    const response = await FamilyTreeAPI.getMember(memberId);
    return response.data;
  } catch (error) {
    console.error('Error fetching family member:', error);
    throw error;
  }
};

// Create a new family member
export const createFamilyMember = async (memberData) => {
  try {
    const response = await FamilyTreeAPI.createMember(memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating family member:', error);
    throw error;
  }
};

// Update a family member
export const updateFamilyMember = async (memberId, memberData) => {
  try {
    const response = await FamilyTreeAPI.updateMember(memberId, memberData);
    return response.data;
  } catch (error) {
    console.error('Error updating family member:', error);
    throw error;
  }
};

// Delete a family member
export const deleteFamilyMember = async (memberId) => {
  try {
    const response = await FamilyTreeAPI.deleteMember(memberId);
    return response.data;
  } catch (error) {
    console.error('Error deleting family member:', error);
    throw error;
  }
}; 