const mongoose = require('mongoose');

const FamilyTreeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  familyGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyGroup',
    required: true
  },
  rootMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  privacy: {
    type: String,
    enum: ['private', 'family', 'public'],
    default: 'family'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  editors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  settings: {
    showDates: {
      type: Boolean,
      default: true
    },
    showPhotos: {
      type: Boolean,
      default: true
    },
    layoutDirection: {
      type: String,
      enum: ['vertical', 'horizontal'],
      default: 'vertical'
    },
    theme: {
      type: String,
      default: 'default'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FamilyTree', FamilyTreeSchema); 