const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const menteeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ['mentor', 'mentee'],
  },
  about: {
    type: String,
  },
  experience: {
    type: String,
  },
  education: {
    type: String,
  },
});

// Hash the password before saving to the database
menteeSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const menteeModel = mongoose.model('mentees', menteeSchema);

module.exports = menteeModel;
