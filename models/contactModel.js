const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);