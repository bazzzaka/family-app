const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const FamilyGroup = require('../models/FamilyGroup');
const { authenticate } = require('../middlewares/auth');

// Create a new budget for a family group
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, familyGroupId, startDate, endDate, categories, currency, totalBudget } = req.body;
    
    // Check if family group exists and user is a member
    const familyGroup = await FamilyGroup.findById(familyGroupId);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    const isMember = familyGroup.members.some(
      member => member.user.toString() === req.userId.toString()
    );
    
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized to create a budget for this family group' });
    }
    
    // Create budget
    const budget = new Budget({
      name,
      description,
      familyGroup: familyGroupId,
      creator: req.userId,
      contributors: [req.userId],
      startDate: startDate || Date.now(),
      endDate: endDate || null,
      categories: categories || [],
      currency: currency || 'USD',
      totalBudget: totalBudget || 0
    });
    
    await budget.save();
    
    res.status(201).json(budget);
  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all budgets for a family group
router.get('/family/:familyGroupId', authenticate, async (req, res) => {
  try {
    const familyGroup = await FamilyGroup.findById(req.params.familyGroupId);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    const isMember = familyGroup.members.some(
      member => member.user.toString() === req.userId.toString()
    );
    
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized to view budgets for this family group' });
    }
    
    const budgets = await Budget.find({ 
      familyGroup: req.params.familyGroupId,
      isActive: true
    }).sort({ createdAt: -1 });
    
    res.json(budgets);
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get budget by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)
      .populate('creator', 'username firstName lastName')
      .populate('contributors', 'username firstName lastName');
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is a contributor or family group member
    const isContributor = budget.contributors.some(
      contributor => contributor._id.toString() === req.userId.toString()
    );
    
    if (!isContributor) {
      const familyGroup = await FamilyGroup.findById(budget.familyGroup);
      
      if (!familyGroup) {
        return res.status(404).json({ message: 'Family group not found' });
      }
      
      const isFamilyMember = familyGroup.members.some(
        member => member.user.toString() === req.userId.toString()
      );
      
      if (!isFamilyMember) {
        return res.status(403).json({ message: 'Not authorized to view this budget' });
      }
    }
    
    res.json(budget);
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update budget
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { 
      name, description, startDate, endDate, 
      categories, currency, totalBudget, isActive 
    } = req.body;
    
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is creator or contributor
    const isCreator = budget.creator.toString() === req.userId.toString();
    const isContributor = budget.contributors.some(
      contributor => contributor.toString() === req.userId.toString()
    );
    
    if (!isCreator && !isContributor) {
      return res.status(403).json({ message: 'Not authorized to update this budget' });
    }
    
    // Update fields
    if (name) budget.name = name;
    if (description !== undefined) budget.description = description;
    if (startDate) budget.startDate = startDate;
    if (endDate !== undefined) budget.endDate = endDate;
    if (categories) budget.categories = categories;
    if (currency) budget.currency = currency;
    if (totalBudget !== undefined) budget.totalBudget = totalBudget;
    if (isActive !== undefined && isCreator) budget.isActive = isActive;
    
    await budget.save();
    
    res.json(budget);
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add transaction to budget
router.post('/:id/transactions', authenticate, async (req, res) => {
  try {
    const { title, amount, type, category, date, notes } = req.body;
    
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is contributor
    const isContributor = budget.contributors.some(
      contributor => contributor.toString() === req.userId.toString()
    );
    
    if (!isContributor) {
      return res.status(403).json({ message: 'Not authorized to add transactions to this budget' });
    }
    
    // Add transaction
    budget.transactions.push({
      title,
      amount,
      type,
      category: category || 'Uncategorized',
      date: date || Date.now(),
      addedBy: req.userId,
      notes: notes || ''
    });
    
    await budget.save();
    
    res.status(201).json(budget.transactions[budget.transactions.length - 1]);
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove transaction from budget
router.delete('/:id/transactions/:transactionId', authenticate, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Find transaction
    const transaction = budget.transactions.id(req.params.transactionId);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if user added the transaction or is creator
    const isCreator = budget.creator.toString() === req.userId.toString();
    const isTransactionCreator = transaction.addedBy.toString() === req.userId.toString();
    
    if (!isCreator && !isTransactionCreator) {
      return res.status(403).json({ message: 'Not authorized to remove this transaction' });
    }
    
    // Remove transaction
    transaction.remove();
    await budget.save();
    
    res.json({ message: 'Transaction removed successfully' });
  } catch (error) {
    console.error('Remove transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add contributor to budget
router.post('/:id/contributors', authenticate, async (req, res) => {
  try {
    const { userId } = req.body;
    
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is creator
    if (budget.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to add contributors to this budget' });
    }
    
    // Check if user is member of the family group
    const familyGroup = await FamilyGroup.findById(budget.familyGroup);
    
    if (!familyGroup) {
      return res.status(404).json({ message: 'Family group not found' });
    }
    
    const isFamilyMember = familyGroup.members.some(
      member => member.user.toString() === userId
    );
    
    if (!isFamilyMember) {
      return res.status(400).json({ message: 'User is not a member of the family group' });
    }
    
    // Check if already a contributor
    const isAlreadyContributor = budget.contributors.some(
      contributor => contributor.toString() === userId
    );
    
    if (isAlreadyContributor) {
      return res.status(400).json({ message: 'User is already a contributor to this budget' });
    }
    
    // Add contributor
    budget.contributors.push(userId);
    await budget.save();
    
    res.json(budget);
  } catch (error) {
    console.error('Add contributor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove contributor from budget
router.delete('/:id/contributors/:userId', authenticate, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is creator or removing self
    const isCreator = budget.creator.toString() === req.userId.toString();
    const isSelf = req.userId.toString() === req.params.userId;
    
    if (!isCreator && !isSelf) {
      return res.status(403).json({ message: 'Not authorized to remove contributors from this budget' });
    }
    
    // Cannot remove the creator
    if (budget.creator.toString() === req.params.userId) {
      return res.status(400).json({ message: 'Cannot remove the creator from contributors' });
    }
    
    // Remove contributor
    budget.contributors = budget.contributors.filter(
      contributor => contributor.toString() !== req.params.userId
    );
    
    await budget.save();
    
    res.json(budget);
  } catch (error) {
    console.error('Remove contributor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete budget
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // Check if user is creator
    if (budget.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this budget' });
    }
    
    await Budget.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 