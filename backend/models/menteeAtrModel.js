const mongoose = require('mongoose');

const AtriSchema = new mongoose.Schema({
  about: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
});

const Atri = mongoose.model('atributes', AtriSchema);

module.exports = Atri;
