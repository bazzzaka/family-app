const mongoose = require('mongoose');

const FamilyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['micro', 'general'],
    default: 'micro'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPrivate: {
    type: Boolean,
    default: false
  },
  coverImage: {
    type: String,
    default: ''
  },
  parentFamily: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyGroup',
    default: null
  }
}, {
  timestamps: true
});

// Index to improve query performance
FamilyGroupSchema.index({ 'members.user': 1 });
FamilyGroupSchema.index({ creator: 1 });
FamilyGroupSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('FamilyGroup', FamilyGroupSchema); 