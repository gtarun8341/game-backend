const SocialMedia = require('../models/SocialMedia');

// Get all social media links (WhatsApp, Telegram)
exports.getSocialMediaLinks = async (req, res) => {
  try {
    const socialMediaLinks = await SocialMedia.find();
    res.status(200).json(socialMediaLinks);
  } catch (error) {
    res.status(500).json({ error: 'Server error, unable to fetch social media links' });
  }
};

// Add a new social media link (WhatsApp or Telegram)
exports.addSocialMediaLink = async (req, res) => {
  console.log(req.body);
  const { platform, link } = req.body;

  if (!platform || !link) {
    return res.status(400).json({ error: 'Platform and link are required' });
  }

  // Validate platform value
  const validPlatforms = [
    'WhatsApp Number', 
    'WhatsApp Link', 
    'Telegram Username', 
    'Telegram Link', 
    'Phone Number'
  ];

  if (!validPlatforms.includes(platform)) {
    return res.status(400).json({ error: 'Invalid platform value' });
  }

  try {
    const newSocialMedia = new SocialMedia({ platform, link });
    await newSocialMedia.save();
    res.status(201).json({ message: `${platform} link added successfully`, data: newSocialMedia });
  } catch (error) {
    res.status(500).json({ error: 'Server error, unable to add link' });
  }
};

// Update an existing social media link
exports.updateSocialMediaLink = async (req, res) => {
  const { id } = req.params;
  const { platform, link } = req.body;

  if (!platform || !link) {
    return res.status(400).json({ error: 'Platform and link are required' });
  }

  // Validate platform value
  const validPlatforms = [
    'WhatsApp Number', 
    'WhatsApp Link', 
    'Telegram Username', 
    'Telegram Link', 
    'Phone Number'
  ];

  if (!validPlatforms.includes(platform)) {
    return res.status(400).json({ error: 'Invalid platform value' });
  }

  try {
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
      id,
      { platform, link },
      { new: true, runValidators: true }
    );

    if (!updatedSocialMedia) {
      return res.status(404).json({ error: 'Social media link not found' });
    }

    res.status(200).json({ message: `${platform} link updated successfully`, data: updatedSocialMedia });
  } catch (error) {
    res.status(500).json({ error: 'Server error, unable to update link' });
  }
};

// Delete a social media link
exports.deleteSocialMediaLink = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

    if (!deletedSocialMedia) {
      return res.status(404).json({ error: 'Social media link not found' });
    }

    res.status(200).json({ message: `${deletedSocialMedia.platform} link deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Server error, unable to delete link' });
  }
};
