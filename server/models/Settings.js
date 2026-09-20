const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  logo: { type: String, default: '/logo.jpg' }, // Base64 string or URL, defaulting to existing file
  privacyPolicy: { type: String, default: 'Your Privacy Policy goes here...' },
  termsOfService: { type: String, default: 'Your Terms of Service go here...' },
  adminEmails: [{ type: String }],
  contactEmail: { type: String, default: 'hello@nexoraindia.com' },
  contactPhone: { type: String, default: '+91 98765 43210' },
  contactAddress: { type: String, default: '123 Business Hub, Mumbai, Maharashtra 400001, India' },
  whatsappNumber: { type: String, default: '919876543210' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
