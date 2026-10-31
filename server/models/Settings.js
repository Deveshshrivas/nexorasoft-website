const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  logo: { type: String, default: '/logo.jpg' }, // Base64 string or URL, defaulting to existing file
  privacyPolicy: { type: String, default: 'Your Privacy Policy goes here...' },
  termsOfService: { type: String, default: 'Your Terms of Service go here...' },
  adminEmails: [{ type: String }],
  contactEmail: { type: String, default: 'hello@nexoraindia.com' },
  contactPhone: { type: String, default: '+91-9111962091' },
  contactAddress: { type: String, default: 'Gwalior, Madhya Pradesh, India' },
  whatsappNumber: { type: String, default: '919111962091' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
