const express = require('express');
const router = express.Router();
const {
  getSocialMediaLinks,
  addSocialMediaLink,
  updateSocialMediaLink,
  deleteSocialMediaLink,
} = require('../controllers/socialMediaController');
const verifyToken = require('../middlewares/verifyToken'); // Assuming you have a token verification middleware

// Get all social media links
router.get('/social-media',  getSocialMediaLinks);

// Add a new social media link (WhatsApp or Telegram)
router.post('/social-media', addSocialMediaLink);

// Update an existing social media link
router.put('/social-media/:id',  updateSocialMediaLink);

// Delete a social media link
router.delete('/social-media/:id',  deleteSocialMediaLink);

module.exports = router;
