const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

const defaultServices = [
  {
    title: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Modern, responsive websites and web applications built with React, Next.js, and Node.js.',
    fullDescription: 'We craft stunning, high-performance web applications using cutting-edge technologies like React, Next.js, and Node.js. Our websites are mobile-first, SEO-optimized, and built for scale.',
    icon: 'FaCode',
    image: '/services/web-development.jpg',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom CMS', 'E-commerce Solutions', 'Progressive Web Apps'],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    priceRange: 'Starting from ₹25,000',
    deliveryTime: '2-8 weeks',
    category: 'Development',
    order: 1
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    shortDescription: 'Cross-platform and native mobile apps for iOS and Android with seamless UX.',
    fullDescription: 'From concept to launch, we build powerful mobile applications that users love. We specialize in React Native for cross-platform development and Flutter for beautiful UI.',
    icon: 'FaMobile',
    image: '/services/mobile-app-development.jpg',
    features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support', 'App Store Deployment', 'UI/UX Design'],
    technologies: ['React Native', 'Flutter', 'Firebase', 'REST APIs', 'Swift', 'Kotlin'],
    priceRange: 'Starting from ₹50,000',
    deliveryTime: '4-12 weeks',
    category: 'Development',
    order: 2
  },
  {
    title: 'API Development',
    slug: 'api-development',
    shortDescription: 'Robust, scalable REST and GraphQL microservice architectures with JWT authentication.',
    fullDescription: 'We design and develop secure, well-documented APIs that power your applications. From microservices to monolithic APIs, we handle authentication, rate limiting, and documentation.',
    icon: 'FaServer',
    image: '/services/api-development.jpg',
    features: ['REST & GraphQL', 'Authentication & JWT', 'Rate Limiting', 'API Documentation', 'Microservices', 'Third-party Integrations'],
    technologies: ['Node.js', 'Express', 'GraphQL', 'Swagger', 'Postman', 'Docker'],
    priceRange: 'Starting from ₹20,000',
    deliveryTime: '1-4 weeks',
    category: 'Development',
    order: 3
  },
  {
    title: 'DevOps & Cloud',
    slug: 'devops-cloud',
    shortDescription: 'CI/CD automation, Docker/Kubernetes containerization, and AWS/GCP cloud architectures.',
    fullDescription: 'Streamline your development workflow with our DevOps expertise. We set up CI/CD pipelines, manage cloud infrastructure on AWS/GCP/Azure, and ensure your applications are always available.',
    icon: 'FaCloud',
    image: '/services/devops-cloud.jpg',
    features: ['CI/CD Pipelines', 'Docker & Kubernetes', 'AWS/GCP/Azure', 'Monitoring & Alerts', 'Auto Scaling', 'Security Hardening'],
    technologies: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions'],
    priceRange: 'Starting from ₹15,000/month',
    deliveryTime: '1-3 weeks setup',
    category: 'Infrastructure',
    order: 4
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription: 'User research, wireframing, high-fidelity Figma prototypes, and sleek design systems.',
    fullDescription: 'Great design is the foundation of great software. Our designers create wireframes, prototypes, and pixel-perfect designs that are both beautiful and functional.',
    icon: 'FaPalette',
    image: '/services/ui-ux-design.jpg',
    features: ['Wireframing', 'Prototyping', 'Brand Identity', 'Design Systems', 'User Research', 'Usability Testing'],
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Framer'],
    priceRange: 'Starting from ₹10,000',
    deliveryTime: '1-3 weeks',
    category: 'Design',
    order: 5
  },
  {
    title: 'Digital Marketing & SEO',
    slug: 'digital-marketing-seo',
    shortDescription: 'Data-driven SEO strategies, Google/Meta ad campaigns, and conversion rate optimization.',
    fullDescription: 'We help businesses grow online through SEO, social media marketing, PPC campaigns, and content strategy. Our data-driven approach ensures maximum ROI.',
    icon: 'FaChartLine',
    image: '/services/digital-marketing-seo.jpg',
    features: ['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Content Strategy', 'Email Marketing', 'Analytics & Reporting'],
    technologies: ['Google Ads', 'Meta Ads', 'SEMrush', 'Google Analytics', 'Mailchimp'],
    priceRange: 'Starting from ₹8,000/month',
    deliveryTime: 'Ongoing',
    category: 'Marketing',
    order: 6
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    shortDescription: 'Vulnerability assessment, penetration testing, SSL security hardening, and compliance.',
    fullDescription: 'Cybersecurity threats are evolving. We provide comprehensive security audits, penetration testing, and ongoing monitoring to keep your data and systems safe.',
    icon: 'FaShieldAlt',
    image: '/services/cybersecurity.jpg',
    features: ['Security Audits', 'Penetration Testing', 'SSL & Encryption', 'Firewall Setup', 'VAPT', 'Compliance (GDPR/ISO)'],
    technologies: ['Kali Linux', 'Burp Suite', 'Nessus', 'Metasploit', 'Wireshark', 'OWASP'],
    priceRange: 'Starting from ₹30,000',
    deliveryTime: '1-2 weeks',
    category: 'Security',
    order: 7
  },
  {
    title: 'IT Consulting',
    slug: 'it-consulting',
    shortDescription: 'Strategic architecture advice, technology modernization, and digital transformation roadmaps.',
    fullDescription: 'Not sure which technology stack to choose? Our experienced consultants provide strategic technology advice, architecture reviews, and digital transformation roadmaps.',
    icon: 'FaLightbulb',
    image: '/services/it-consulting.jpg',
    features: ['Tech Stack Advisory', 'Architecture Review', 'Digital Transformation', 'Project Management', 'Team Augmentation', 'Cost Optimization'],
    technologies: ['Cloud Architecture', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'System Design'],
    priceRange: 'Starting from ₹5,000/hour',
    deliveryTime: 'Flexible',
    category: 'Consulting',
    order: 8
  }
];

// GET all services (auto-seeds defaults if missing)
router.get('/', async (req, res) => {
  try {
    for (const ds of defaultServices) {
      const exists = await Service.findOne({ slug: ds.slug });
      if (!exists) {
        await Service.create(ds);
      } else if (!exists.image || exists.image.includes('images.unsplash.com')) {
        exists.image = ds.image;
        await exists.save();
      }
    }
    const services = await Service.find().sort({ order: 1 });
    if (!services || services.length === 0) {
      return res.json(defaultServices);
    }
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.json(defaultServices);
  }
});

// GET single service by slug
router.get('/:slug', async (req, res) => {
  try {
    let service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      const match = defaultServices.find(s => s.slug === req.params.slug);
      if (match) {
        service = await Service.create(match);
      }
    }
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    const match = defaultServices.find(s => s.slug === req.params.slug);
    if (match) return res.json(match);
    res.status(500).json({ message: err.message });
  }
});

// POST new service
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
