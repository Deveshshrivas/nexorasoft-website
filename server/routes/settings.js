const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings (creates default if none exist, or updates old phone)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        contactPhone: '+91-9111962091',
        whatsappNumber: '919111962091'
      });
      await settings.save();
    } else if (settings.contactPhone !== '+91-9111962091') {
      settings.contactPhone = '+91-9111962091';
      settings.whatsappNumber = '919111962091';
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const saved = await settings.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
