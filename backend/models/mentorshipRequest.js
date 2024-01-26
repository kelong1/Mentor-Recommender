const mongoose = require('mongoose');

const mentorshipRequestSchema = new mongoose.Schema({
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mentees', // Reference to the User model (assuming you have a User model)
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mentors', // Reference to the User model (assuming you have a User model)
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MentorshipRequest = mongoose.model('MentorshipRequest', mentorshipRequestSchema);

module.exports = MentorshipRequest;
