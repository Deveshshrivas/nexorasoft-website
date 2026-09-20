const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { SendMailClient } = require('zeptomail');
const AdminOTP = require('../models/AdminOTP');
const Settings = require('../models/Settings');

// Configuration
const ENV_ADMIN_EMAILS = process.env.ADMIN_EMAILS 
  ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) 
  : ['deveshshrivas060@gmail.com'];

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_please_change';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA'; // Cloudflare dummy key

// Helper to get all allowed emails
async function getAllowedEmails() {
  let allowed = [...ENV_ADMIN_EMAILS];
  try {
    const settings = await Settings.findOne();
    if (settings && settings.adminEmails) {
      allowed = [...allowed, ...settings.adminEmails.map(e => e.trim().toLowerCase())];
    }
  } catch (err) {
    console.error('Failed to fetch settings emails:', err);
  }
  return allowed;
}

// Request OTP Route
router.post('/request-otp', async (req, res) => {
  const { email, turnstileToken } = req.body;

  const allowedEmails = await getAllowedEmails();
  if (!allowedEmails.includes(email.toLowerCase())) {
    return res.status(401).json({ message: 'Unauthorized email address' });
  }

  // 1. Verify Turnstile Token
  try {
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', turnstileToken);

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const turnstileOutcome = await turnstileRes.json();

    if (!turnstileOutcome.success) {
      return res.status(403).json({ message: 'Bot verification failed' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Turnstile verification error' });
  }

  // 2. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 3. Save to DB (replaces existing OTP for this email if any)
  await AdminOTP.findOneAndDelete({ email });
  const otpRecord = new AdminOTP({ email, otp });
  await otpRecord.save();

      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'Nexora Admin'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Admin Login OTP - Nexora India',
        text: `Your OTP for Nexora Admin login is: ${otp}. It is valid for 5 minutes.`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #080f22; padding: 30px; text-align: center; border-bottom: 4px solid #f56a00;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 800;">NEXORA <span style="color: #f56a00;">ADMIN</span></h1>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Secure Login Request</h2>
                <p style="color: #475569; font-size: 16px; line-height: 1.6;">You recently requested a One-Time Password (OTP) to access the Nexora India Admin Dashboard.</p>
                
                <div style="margin: 35px 0; text-align: center;">
                  <span style="display: inline-block; background-color: #fff7ed; border: 2px dashed #f56a00; color: #f56a00; font-size: 36px; font-weight: 800; letter-spacing: 12px; padding: 20px 20px 20px 32px; border-radius: 12px;">${otp}</span>
                </div>
                
                <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-bottom: 0;">This security code is valid for <strong>5 minutes</strong>. If you did not attempt to log in, please secure your account immediately.</p>
              </div>
              <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Nexora India. All rights reserved.</p>
              </div>
            </div>
          </div>
        `
      };

  // 4. Send Email via ZeptoMail
  if (process.env.ZEPTO_TOKEN) {
    try {
      const url = "https://api.zeptomail.in/v1.1/email";
      const token = process.env.ZEPTO_TOKEN;
      const client = new SendMailClient({ url, token });

      await client.sendMail({
        "from": {
          "address": "noreply@nexorasoft.io",
          "name": "Nexora Admin"
        },
        "to": [
          {
            "email_address": {
              "address": email,
              "name": "Admin"
            }
          }
        ],
        "subject": mailOptions.subject,
        "htmlbody": mailOptions.html
      });
      console.log(`OTP sent to ${email} via ZeptoMail.`);
    } catch (err) {
      console.error('Error sending OTP email via ZeptoMail:', err);
      console.log("WARNING: ZeptoMail failed! Falling back to console OTP:", otp);
      // return res.status(500).json({ message: 'Error sending email via ZeptoMail' });
    }
  } else {
    console.log(`WARNING: ZEPTO_TOKEN not set. Console fallback OTP is: ${otp}`);
  }

  res.json({ message: 'OTP sent successfully' });
});

// Verify OTP Route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const allowedEmails = await getAllowedEmails();
  if (!allowedEmails.includes(email.toLowerCase())) {
    return res.status(401).json({ message: 'Unauthorized email address' });
  }

  const record = await AdminOTP.findOne({ email, otp });
  
  if (!record) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  // Valid OTP! Delete it so it can't be reused
  await AdminOTP.findByIdAndDelete(record._id);

  // Issue JWT Token
  const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '12h' });

  res.json({ token, message: 'Login successful' });
});

module.exports = router;


