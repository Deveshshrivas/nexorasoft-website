import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaCode, FaMobile, FaServer, FaCloud, FaPalette, FaChartLine, FaShieldAlt, FaLightbulb, FaRupeeSign } from 'react-icons/fa';
import { getService } from '../api/api';

const iconMap = { FaCode, FaMobile, FaServer, FaCloud, FaPalette, FaChartLine, FaShieldAlt, FaLightbulb };

const ServiceDetail = () => {
  const { slug }    = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    getService(slug)
      .then(r => setService(r.data))
      .catch(() => setError('Service not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="page-wrapper min-h-screen flex items-center justify-center">
      <div className="spinner" />
    </div>
  );

  if (error || !service) return (
    <div className="page-wrapper min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-5xl">ðŸ˜•</p>
      <p className="text-2xl font-bold text-gray-700">Service Not Found</p>
      <Link to="/services" className="btn btn-primary">â† Back to Services</Link>
    </div>
  );

  const Icon = iconMap[service.icon] || FaCode;

  return (
    <div className="page-wrapper">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-hero">
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm mb-8"
          >
            <FiArrowLeft /> All Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-6"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
              style={{ backgroundColor: '#f56a00' }}
            >
              <Icon className="text-4xl text-white" />
            </div>
            <div>
              <span
                className="pill-label pill-glass mb-3"
                style={{ display: 'inline-flex' }}
              >
                {service.category}
              </span>
              <h1
                className="text-4xl sm:text-5xl font-black text-white mb-3"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {service.title}
              </h1>
              <p className="text-gray-300 text-lg max-w-xl">{service.shortDescription}</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              {service.image && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                  <img src={service.image} alt={service.title} className="w-full h-72 object-cover rounded-3xl shadow-lg border border-gray-100" />
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}>
                  About This Service
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">{service.fullDescription}</p>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-bold mb-5" style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}>
                  What's Included
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#22c55e' }}
                      >
                        <FiCheck className="text-white text-xs" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold mb-5" style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}>
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {service.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: '#eef2ff', color: '#1a2d6b', border: '1.5px solid #c7d2fe' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-6 sticky top-24 border-2 border-gray-100 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-bold text-lg mb-5" style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}>
                  Service Details
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fff7ed' }}>
                      <FaRupeeSign style={{ color: '#f56a00' }} className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Starting Price</p>
                      <p className="font-bold text-sm mt-0.5" style={{ color: '#1a2d6b' }}>
                        {service.priceRange || 'Get a Quote'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fff7ed' }}>
                      <FiClock style={{ color: '#f56a00' }} className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Delivery Time</p>
                      <p className="font-bold text-sm mt-0.5" style={{ color: '#1a2d6b' }}>
                        {service.deliveryTime || 'Contact us'}
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="btn btn-primary w-full justify-center mb-3">
                  Get Free Quote <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-outline-navy w-full justify-center text-sm">
                  Schedule Consultation
                </Link>

                <p className="text-center text-xs text-gray-400 mt-4">
                  ðŸ”’ No hidden fees Â· Free initial consultation
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-12 bg-white text-center">
        <Link to="/services" className="btn btn-outline-navy">
          <FiArrowLeft /> View All Services
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;


