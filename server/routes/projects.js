const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const defaultProjects = [
  {
    title: 'Vishwageeta',
    description: 'A modern, high-performance Progressive Web Application (PWA) dedicated to sharing the timeless wisdom of the Shrimad Bhagavad Gita globally. Features multilingual chapters, shloka exploration, audio recitations, Sanskrit typography, and responsive offline access.',
    image: '/projects/vishwageeta.jpg',
    link: 'https://vishwageeta.org/',
    technologies: ['React', 'PWA', 'Tailwind CSS', 'Vite', 'Audio API'],
    featured: true
  },
  {
    title: 'Bank Khojo',
    description: 'Comprehensive financial comparison and discovery portal in India. Enables users to explore and compare interest rates across all major banks, calculate loan EMIs and fixed deposit returns, and review health insurance policies.',
    image: '/projects/bank-khojo.jpg',
    link: 'https://bankkhojo.nexorasoft.io/',
    technologies: ['PHP', 'CodeIgniter', 'Bootstrap 5', 'MySQL', 'Financial Calculators'],
    featured: true
  },
  {
    title: 'CalcXpert',
    description: 'All-in-one suite of free, accurate online calculators for finance, health, mathematics, and date-time conversions. Designed with a clean responsive UI, instant mathematical computations, and internationalization.',
    image: '/projects/calcxpert.jpg',
    link: 'https://calcxpert.nexorasoft.io/',
    technologies: ['JavaScript', 'Bootstrap 5', 'HTML5', 'Algorithms', 'Responsive UI'],
    featured: true
  },
  {
    title: 'NEWS24x7 INDIA',
    description: 'High-traffic 24x7 digital journalism and news publishing portal delivering real-time regional and national headlines, breaking reports, multi-category journalism, and video broadcasting with blazing fast load times.',
    image: '/projects/news24x7india.jpg',
    link: 'https://www.news24x7india.com/',
    technologies: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Digital CMS'],
    featured: true
  },
  {
    title: 'Gwalior Management Association (GMA)',
    description: 'Official institutional management portal for GMA (affiliated with All India Management Association - AIMA). Powers corporate event scheduling, student & executive memberships, and professional leadership development programs.',
    image: '/projects/gma-gwalior.jpg',
    link: 'https://gmagwalior.com/',
    technologies: ['PHP', 'Laravel', 'Bootstrap 5', 'MySQL', 'Event Management'],
    featured: true
  },
  {
    title: 'Interview Room Coach',
    description: 'Next-generation AI-powered mock interview and career preparation platform. Features interactive AI interview simulations, resume analysis, instant performance scoring, and tailored behavioral coaching.',
    image: '/projects/interview-room-coach.jpg',
    link: 'https://interview-room-coach-2026-3ccbea966f18.herokuapp.com/',
    technologies: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'AI Coaching API'],
    featured: true
  }
];

// GET all projects (ensures default projects exist)
router.get('/', async (req, res) => {
  try {
    for (const dp of defaultProjects) {
      const exists = await Project.findOne({ link: dp.link });
      if (!exists) {
        await Project.create(dp);
      } else if (!exists.image || exists.image.includes('images.unsplash.com')) {
        exists.image = dp.image;
        await exists.save();
      }
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
