const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Service = require('../models/Service');
const Project = require('../models/Project');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexoraindia';

const services = [
  { title: 'Web Development', slug: 'web-development', shortDescription: 'Modern, responsive websites and web applications built with latest technologies.', fullDescription: 'We craft stunning, high-performance web applications using cutting-edge technologies like React, Next.js, and Node.js. Our websites are mobile-first, SEO-optimized, and built for scale.', icon: 'FaCode', features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom CMS', 'E-commerce Solutions', 'Progressive Web Apps'], technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'WordPress'], priceRange: 'Starting from Rs.25,000', deliveryTime: '2-8 weeks', category: 'Development', order: 1 },
  { title: 'Mobile App Development', slug: 'mobile-app-development', shortDescription: 'Cross-platform and native mobile apps for iOS and Android.', fullDescription: 'From concept to launch, we build powerful mobile applications that users love. We specialize in React Native for cross-platform development and Flutter for beautiful UI.', icon: 'FaMobile', features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support', 'App Store Deployment', 'UI/UX Design'], technologies: ['React Native', 'Flutter', 'Firebase', 'REST APIs', 'Swift', 'Kotlin'], priceRange: 'Starting from Rs.50,000', deliveryTime: '4-12 weeks', category: 'Development', order: 2 },
  { title: 'API Development', slug: 'api-development', shortDescription: 'Robust, scalable REST and GraphQL APIs for your business needs.', fullDescription: 'We design and develop secure, well-documented APIs that power your applications. From microservices to monolithic APIs, we handle authentication, rate limiting, and documentation.', icon: 'FaServer', features: ['REST & GraphQL', 'Authentication & JWT', 'Rate Limiting', 'API Documentation', 'Microservices', 'Third-party Integrations'], technologies: ['Node.js', 'Express', 'GraphQL', 'Swagger', 'Postman', 'Docker'], priceRange: 'Starting from Rs.20,000', deliveryTime: '1-4 weeks', category: 'Development', order: 3 },
  { title: 'DevOps & Cloud', slug: 'devops-cloud', shortDescription: 'CI/CD pipelines, cloud infrastructure, and deployment automation.', fullDescription: 'Streamline your development workflow with our DevOps expertise. We set up CI/CD pipelines, manage cloud infrastructure on AWS/GCP/Azure, and ensure your applications are always available.', icon: 'FaCloud', features: ['CI/CD Pipelines', 'Docker & Kubernetes', 'AWS/GCP/Azure', 'Monitoring & Alerts', 'Auto Scaling', 'Security Hardening'], technologies: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions'], priceRange: 'Starting from Rs.15,000/month', deliveryTime: '1-3 weeks setup', category: 'Infrastructure', order: 4 },
  { title: 'UI/UX Design', slug: 'ui-ux-design', shortDescription: 'Beautiful, intuitive user interfaces that delight your customers.', fullDescription: 'Great design is the foundation of great software. Our designers create wireframes, prototypes, and pixel-perfect designs that are both beautiful and functional.', icon: 'FaPalette', features: ['Wireframing', 'Prototyping', 'Brand Identity', 'Design Systems', 'User Research', 'Usability Testing'], technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Framer', 'InVision'], priceRange: 'Starting from Rs.10,000', deliveryTime: '1-3 weeks', category: 'Design', order: 5 },
  { title: 'Digital Marketing & SEO', slug: 'digital-marketing-seo', shortDescription: 'Grow your online presence with data-driven marketing strategies.', fullDescription: 'We help businesses grow online through SEO, social media marketing, PPC campaigns, and content strategy. Our data-driven approach ensures maximum ROI.', icon: 'FaChartLine', features: ['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Content Strategy', 'Email Marketing', 'Analytics & Reporting'], technologies: ['Google Ads', 'Meta Ads', 'SEMrush', 'Google Analytics', 'Mailchimp', 'HubSpot'], priceRange: 'Starting from Rs.8,000/month', deliveryTime: 'Ongoing', category: 'Marketing', order: 6 },
  { title: 'Cybersecurity', slug: 'cybersecurity', shortDescription: 'Protect your business with enterprise-grade security solutions.', fullDescription: 'Cybersecurity threats are evolving. We provide comprehensive security audits, penetration testing, and ongoing monitoring to keep your data and systems safe.', icon: 'FaShieldAlt', features: ['Security Audits', 'Penetration Testing', 'SSL & Encryption', 'Firewall Setup', 'VAPT', 'Compliance (GDPR/ISO)'], technologies: ['Kali Linux', 'Burp Suite', 'Nessus', 'Metasploit', 'Wireshark', 'OWASP'], priceRange: 'Starting from Rs.30,000', deliveryTime: '1-2 weeks', category: 'Security', order: 7 },
  { title: 'IT Consulting', slug: 'it-consulting', shortDescription: 'Expert technology consulting to help your business grow smarter.', fullDescription: 'Not sure which technology stack to choose? Our experienced consultants provide strategic technology advice, architecture reviews, and digital transformation roadmaps.', icon: 'FaLightbulb', features: ['Tech Stack Advisory', 'Architecture Review', 'Digital Transformation', 'Project Management', 'Team Augmentation', 'Cost Optimization'], technologies: ['Various', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'Slack'], priceRange: 'Starting from Rs.5,000/hour', deliveryTime: 'Flexible', category: 'Consulting', order: 8 }
];

const projects = [
  {
    title: 'Vishwageeta',
    description: 'A modern, high-performance Progressive Web Application (PWA) dedicated to sharing the timeless wisdom of the Shrimad Bhagavad Gita globally. Features multilingual chapters, shloka exploration, audio recitations, Sanskrit typography, and responsive offline access.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&auto=format&fit=crop&q=80',
    link: 'https://vishwageeta.org/',
    technologies: ['React', 'PWA', 'Tailwind CSS', 'Vite', 'Audio API'],
    featured: true
  },
  {
    title: 'Bank Khojo',
    description: 'Comprehensive financial comparison and discovery portal in India. Enables users to explore and compare interest rates across all major banks, calculate loan EMIs and fixed deposit returns, and review health insurance policies.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    link: 'https://bankkhojo.nexorasoft.io/',
    technologies: ['PHP', 'CodeIgniter', 'Bootstrap 5', 'MySQL', 'Financial Calculators'],
    featured: true
  },
  {
    title: 'CalcXpert',
    description: 'All-in-one suite of free, accurate online calculators for finance, health, mathematics, and date-time conversions. Designed with a clean responsive UI, instant mathematical computations, and internationalization.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    link: 'https://calcxpert.nexorasoft.io/',
    technologies: ['JavaScript', 'Bootstrap 5', 'HTML5', 'Algorithms', 'Responsive UI'],
    featured: true
  },
  {
    title: 'NEWS24x7 INDIA',
    description: 'High-traffic 24x7 digital journalism and news publishing portal delivering real-time regional and national headlines, breaking reports, multi-category journalism, and video broadcasting with blazing fast load times.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    link: 'https://www.news24x7india.com/',
    technologies: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Digital CMS'],
    featured: true
  },
  {
    title: 'Gwalior Management Association (GMA)',
    description: 'Official institutional management portal for GMA (affiliated with All India Management Association - AIMA). Powers corporate event scheduling, student & executive memberships, and professional leadership development programs.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
    link: 'https://gmagwalior.com/',
    technologies: ['PHP', 'Laravel', 'Bootstrap 5', 'MySQL', 'Event Management'],
    featured: true
  },
  {
    title: 'Interview Room Coach',
    description: 'Next-generation AI-powered mock interview and career preparation platform. Features interactive AI interview simulations, resume analysis, instant performance scoring, and tailored behavioral coaching.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
    link: 'https://interview-room-coach-2026-3ccbea966f18.herokuapp.com/',
    technologies: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'AI Coaching API'],
    featured: true
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');
    await Service.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data...');
    await Service.insertMany(services);
    console.log('Seeded ' + services.length + ' services');
    await Project.insertMany(projects);
    console.log('Seeded ' + projects.length + ' projects');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();
