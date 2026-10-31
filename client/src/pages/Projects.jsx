import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const defaultProjects = [
  {
    _id: 'proj-1',
    title: 'Vishwageeta',
    description: 'A modern, high-performance Progressive Web Application (PWA) dedicated to sharing the timeless wisdom of the Shrimad Bhagavad Gita globally. Features multilingual chapters, shloka exploration, audio recitations, Sanskrit typography, and responsive offline access.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&auto=format&fit=crop&q=80',
    link: 'https://vishwageeta.org/',
    technologies: ['React', 'PWA', 'Tailwind CSS', 'Vite', 'Audio API'],
    featured: true
  },
  {
    _id: 'proj-2',
    title: 'Bank Khojo',
    description: 'Comprehensive financial comparison and discovery portal in India. Enables users to explore and compare interest rates across all major banks, calculate loan EMIs and fixed deposit returns, and review health insurance policies.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    link: 'https://bankkhojo.nexorasoft.io/',
    technologies: ['PHP', 'CodeIgniter', 'Bootstrap 5', 'MySQL', 'Financial Calculators'],
    featured: true
  },
  {
    _id: 'proj-3',
    title: 'CalcXpert',
    description: 'All-in-one suite of free, accurate online calculators for finance, health, mathematics, and date-time conversions. Designed with a clean responsive UI, instant mathematical computations, and internationalization.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    link: 'https://calcxpert.nexorasoft.io/',
    technologies: ['JavaScript', 'Bootstrap 5', 'HTML5', 'Algorithms', 'Responsive UI'],
    featured: true
  },
  {
    _id: 'proj-4',
    title: 'NEWS24x7 INDIA',
    description: 'High-traffic 24x7 digital journalism and news publishing portal delivering real-time regional and national headlines, breaking reports, multi-category journalism, and video broadcasting with blazing fast load times.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    link: 'https://www.news24x7india.com/',
    technologies: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Digital CMS'],
    featured: true
  },
  {
    _id: 'proj-5',
    title: 'Gwalior Management Association (GMA)',
    description: 'Official institutional management portal for GMA (affiliated with All India Management Association - AIMA). Powers corporate event scheduling, student & executive memberships, and professional leadership development programs.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
    link: 'https://gmagwalior.com/',
    technologies: ['PHP', 'Laravel', 'Bootstrap 5', 'MySQL', 'Event Management'],
    featured: true
  },
  {
    _id: 'proj-6',
    title: 'Interview Room Coach',
    description: 'Next-generation AI-powered mock interview and career preparation platform. Features interactive AI interview simulations, resume analysis, instant performance scoring, and tailored behavioral coaching.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
    link: 'https://interview-room-coach-2026-3ccbea966f18.herokuapp.com/',
    technologies: ['React', 'Vite', 'Node.js', 'Tailwind CSS', 'AI Coaching API'],
    featured: true
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f56a00]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full text-xs font-semibold tracking-wider text-orange-600 bg-orange-100 uppercase mb-3">
            Our Work &amp; Portfolio
          </span>
          <h2 className="text-4xl font-extrabold text-[#1a2d6b] sm:text-5xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Featured Client &amp; Live Projects
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Discover our latest software products, web platforms, and enterprise solutions showcasing our technical expertise and execution.
          </p>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 50 } } }} 
              key={project._id} 
              className="card bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col group"
            >
              <div className="h-60 overflow-hidden relative bg-gray-100">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a2d6b] flex items-center justify-center text-white opacity-90">
                    <span className="text-2xl font-semibold opacity-50">No Image</span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-[#f56a00] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-7 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#1a2d6b] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-50 text-[#1a2d6b] text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {project.link && (
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-bold text-[#f56a00] hover:text-[#d45a00] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      Visit Live Website
                      <svg 
                        className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
