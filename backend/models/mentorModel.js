const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: String,
  city: String,
  current_company: {
    name: String,
  },
  position: String,
  about: String,
  experience: mongoose.Schema.Types.Mixed, // Use mongoose Schema.Types.Mixed for EJSON data
  url: String,
  educations_details: mongoose.Schema.Types.Mixed,
  education: mongoose.Schema.Types.Mixed,
  avatar: String,
  certifications: mongoose.Schema.Types.Mixed,
  recommendations: String,
});

const Mentor = mongoose.model('mentors', mentorSchema);

module.exports = Mentor;
