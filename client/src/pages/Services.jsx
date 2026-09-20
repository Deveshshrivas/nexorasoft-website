import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { getServices } from '../api/api';
import ServiceCard from '../components/ServiceCard';

const categories = ['All', 'Development', 'Infrastructure', 'Design', 'Marketing', 'Security', 'Consulting'];

const Services = () => {
  const [services, setServices]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]       = useState('');useEffect(() => {
    getServices()
      .then(r => { setServices(r.data); setFiltered(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let res = services;
    if (activeCategory !== 'All') res = res.filter(s => s.category === activeCategory);
    if (search) res = res.filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(res);
  }, [activeCategory, search, services]);

  return (
    <div className="page-wrapper min-h-screen">
      <section className="relative py-28 overflow-hidden bg-hero">
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="pill-label pill-glass mb-5">WHAT WE OFFER</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Our IT Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg mb-10 max-w-xl mx-auto"
          >
            End-to-end technology solutions designed to accelerate your business growth.
          </motion.p>

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search servicesÃ¢â‚¬Â¦"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white text-gray-800 text-sm focus:outline-none shadow-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX />
              </button>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,50 L0,50 Z" fill="#f8faff" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad" style={{ backgroundColor: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); }}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? '#1a2d6b' : 'white',
                  color:           activeCategory === cat ? 'white'   : '#6b7280',
                  border:          activeCategory === cat ? '2px solid #1a2d6b' : '2px solid #e5e7eb',
                  transform:       activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-center text-sm text-gray-400 mb-8">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span> service{filtered.length !== 1 ? 's' : ''}
              {search && <> matching "<span className="text-orange-500 font-medium">{search}</span>"</>}
            </p>
          )}

          {loading ? (
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72"><div className="skeleton h-full rounded-2xl" /></div>
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="text-5xl mb-4">Ã°Å¸â€Â</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">No services found</p>
              <p className="text-gray-400 text-sm mb-6">Try a different keyword or category</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="btn btn-navy"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, i) => <motion.div key={s._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}><ServiceCard service={s} index={i} /></motion.div>)}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl p-10 bg-gradient-navy text-white">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Need a Custom Solution?
            </h2>
            <p className="text-blue-200 mb-7">Tell us your requirements and we'll tailor a solution just for you.</p>
            <a href="/contact" className="btn btn-primary btn-lg">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;



