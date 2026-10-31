const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const defaultProjects = [
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
  }
];

// GET all projects (auto-seeds default projects if empty)
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      projects = await Project.insertMany(defaultProjects);
    }
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
