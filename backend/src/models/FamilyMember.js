const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  dateOfDeath: {
    type: Date,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: ''
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  partners: [{
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember'
    },
    relationship: {
      type: String,
      enum: ['married', 'divorced', 'engaged', 'partners', 'other'],
      default: 'married'
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    }
  }],
  familyTree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyTree',
    required: true
  },
  isUnknown: {
    type: Boolean,
    default: false
  },
  isDistant: {
    type: Boolean,
    default: false
  },
  additionalInfo: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema); 