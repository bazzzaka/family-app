const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  familyGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyGroup',
    default: null
  },
  privacy: {
    type: String,
    enum: ['private', 'family', 'public'],
    default: 'family'
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema); 