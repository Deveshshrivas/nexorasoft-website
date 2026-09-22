const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://nexorasoft.io';
    
    // Get all services for dynamic pages
    const services = await Service.find().select('slug updatedAt');
    
    // Define all public static routes
    const staticPages = [
      '',
      '/services',
      '/projects',
      '/about',
      '/contact',
      '/privacy-policy',
      '/terms'
    ];
    
    const today = new Date().toISOString();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Static Pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += '  </url>\n';
    });
    
    // Dynamic Service Pages
    services.forEach(service => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/services/${service.slug}</loc>\n`;
      xml += `    <lastmod>${service.updatedAt ? new Date(service.updatedAt).toISOString() : today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap generation error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
