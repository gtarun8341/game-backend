const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: [
      'WhatsApp Number', 
      'WhatsApp Link', 
      'Telegram Username', 
      'Telegram Link', 
      'Phone Number'
    ], // Allowed platforms
    required: true,
  },
  link: { // Field for the actual link or number
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema);

module.exports = SocialMedia;
