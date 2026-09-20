import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteContext';
import { motion, useInView } from 'framer-motion';
import {
  FiArrowRight, FiCheck, FiStar, FiUsers,
  FiAward, FiGlobe, FiSmile, FiCode, FiZap, FiShield,
} from 'react-icons/fi';
import {
  FaCode, FaMobile, FaServer, FaCloud,
  FaShieldAlt, FaQuoteLeft, FaWhatsapp,
} from 'react-icons/fa';
import { getServices, getProjects } from '../api/api';
import ServiceCard from '../components/ServiceCard';
import { FiExternalLink } from 'react-icons/fi';
const ProjectCard = ({ p, index }) => ( <div className='card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full'> <div className='relative h-56 overflow-hidden bg-gray-100'> {p.image ? ( <img src={p.image} alt={p.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' /> ) : ( <div className='w-full h-full flex items-center justify-center text-gray-400 font-medium'>No Image</div> )} </div> <div className='p-6 flex flex-col flex-1'> <h3 className='text-xl font-bold text-gray-900 mb-2'>{p.title}</h3> <p className='text-gray-600 text-sm mb-6 flex-1 line-clamp-2'>{p.description}</p> {p.link && ( <a href={p.link} target='_blank' rel='noopener noreferrer' className='inline-flex items-center text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors mt-auto'> View Live <FiExternalLink className='ml-1.5' /> </a> )} </div> </div>);

/* â”€â”€â”€ Static data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const stats = [
  { icon: FiUsers,  value: 500,  suffix: '+', label: 'Happy Clients' },
  { icon: FiAward,  value: 8,    suffix: '+', label: 'Years Experience' },
  { icon: FiGlobe,  value: 150,  suffix: '+', label: 'Projects Delivered' },
  { icon: FiSmile,  value: 98,   suffix: '%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechStartup Pvt Ltd',
    text: 'Nexora India transformed our digital presence. Their web development team built us a stunning e-commerce platform that tripled our sales within 3 months!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, EduTech Solutions',
    text: 'The mobile app they built for us is phenomenal. Clean code, great UI, and delivered on time. The team is very professional and responsive.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffd5dc',
  },
  {
    name: 'Amit Patel',
    role: 'Parent & Regular Customer',
    text: 'Ordered science kits and building blocks for my kids. The quality is excellent and delivery was super fast. My kids absolutely love them!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=d1f4cc',
  },
];

const techStack = [
  { name: 'React',    color: '#61DAFB', bg: '#e8f9ff' },
  { name: 'Node.js',  color: '#339933', bg: '#e8f5e8' },
  { name: 'MongoDB',  color: '#47A248', bg: '#e8f5e8' },
  { name: 'AWS',      color: '#FF9900', bg: '#fff4e0' },
  { name: 'Flutter',  color: '#02569B', bg: '#e0eef9' },
  { name: 'Docker',   color: '#2496ED', bg: '#e0eef9' },
  { name: 'Python',   color: '#3776AB', bg: '#e0eef9' },
  { name: 'Figma',    color: '#F24E1E', bg: '#fde8e4' },
];

const whyUs = [
  { icon: FiZap,    title: 'Agile & Fast Delivery',   desc: 'Iterative sprints with weekly demos and transparent progress tracking.' },
  { icon: FiCode,   title: 'Clean, Scalable Code',    desc: 'Industry best practices â€” fully tested, documented, and maintainable.' },
  { icon: FiShield, title: 'Post-Launch Support',     desc: '3 months of free support + SLA-backed maintenance plans.' },
  { icon: FiCheck,  title: 'Affordable Pricing',      desc: 'Enterprise quality at startup-friendly rates â€” no hidden charges.' },
];

/* â”€â”€â”€ Animated Counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Home = () => {
  const { settings } = useSiteSettings();
  const [services, setServices]   = useState([]);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tIdx, setTIdx]           = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          getServices(),
          getProjects(),
        ]);
        setServices(sRes.data.slice(0, 6));
        setProducts((pRes.data || []).filter(p => p.featured).slice(0, 4));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  /* skeleton helper */
  const SkeletonCard = ({ h = 'h-64' }) => (
    <div className={`bg-white rounded-2xl ${h} overflow-hidden`}>
      <div className="skeleton h-full" />
    </div>
  );

  return (
    <div className="page-wrapper">
      

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-hero">
        {/* Grid + glow overlays */}
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #f56a00 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #f56a00 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="pill-label pill-glass mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping-slow" />
                India's Trusted IT Solutions Partner
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Transforming Ideas<br />
                Into{' '}
                <span
                  className="relative inline-block"
                  style={{ color: '#f56a00' }}
                >
                  Digital Reality
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 6 Q100 0 200 6" stroke="#f56a00" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg"
              >
                From cutting-edge web & mobile development, APIs, and DevOps ï¿½ to digital solutions that drive business growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link to="/services" className="btn btn-primary btn-lg">
                  Explore Services <FiArrowRight />
                </Link>
                <Link to="/projects" className="btn btn-outline-white btn-lg">
                  View Portfolio
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-5"
              >
                {['ISO Certified', 'MSME Registered', '24/7 Support', '500+ Happy Clients'].map(b => (
                  <div key={b} className="trust-badge">
                    <FiCheck className="text-green-400 flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right â€” floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Central logo */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div
                  className="w-60 h-60 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(245,106,0,0.4)',
                    boxShadow: '0 0 60px rgba(245,106,0,0.2)',
                  }}
                >
                  <img
                    src="/logo.jpg"
                    alt="Nexora India"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>
                {/* Est. badge orbiting */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                  style={{ backgroundColor: '#f56a00' }}
                >
                  ðŸš€ Est. 2016
                </div>
              </motion.div>

              {/* Corner floating cards */}
              {[
                { icon: FaCode,      label: 'Web Dev',    top: '0%',   left: '0%',   delay: 0 },
                { icon: FaMobile,    label: 'Mobile App', top: '0%',   right: '0%',  delay: 0.5 },
                { icon: FaCloud,     label: 'DevOps',     bottom: '8%', left: '0%',  delay: 1 },
                { icon: FaShieldAlt, label: 'Security',   bottom: '8%', right: '0%', delay: 1.5 },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-center gap-1.5 p-3 rounded-xl"
                  style={{
                    ...c,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut', delay: c.delay }}
                >
                  <c.icon className="text-orange-400 text-xl" />
                  <span className="text-white text-xs font-semibold">{c.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          STATS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#fff7ed' }}
                >
                  <s.icon className="text-xl" style={{ color: '#f56a00' }} />
                </div>
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          IT SERVICES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="section-pad" style={{ backgroundColor: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="pill-label pill-navy mb-4">OUR SERVICES</span>
            <h2 className="section-heading mb-3">Comprehensive IT Solutions</h2>
            <div className="divider-orange" />
            <p className="section-sub mt-5">
              From concept to deployment â€” end-to-end technology solutions that drive real business growth.
            </p>
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} h="h-72" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((sv, i) => <ServiceCard key={sv._id} service={sv} index={i} />)}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn btn-navy btn-lg">
              View All 8 Services <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          WHY CHOOSE US
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left â€“ checklist */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="pill-label pill-orange mb-4">WHY NEXORA INDIA</span>
              <h2 className="section-heading mb-3">Your Success is Our Mission</h2>
              <div className="divider-orange mb-6" style={{ margin: '0 0 1.5rem' }} />
              <p className="text-gray-600 leading-relaxed mb-8">
                We combine deep technical expertise with genuine care for your business outcomes. Our team of 50+ professionals brings passion and precision to every project.
              </p>

              <div className="space-y-4">
                {whyUs.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-default"
                  >
                    <div
                      className="icon-box flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#fff7ed', width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem' }}
                    >
                      <w.icon style={{ color: '#f56a00' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-0.5">{w.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right â€“ tech stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="rounded-3xl p-8 text-white"
                style={{ background: 'linear-gradient(140deg, #111f4d 0%, #1a2d6b 50%, #243580 100%)' }}
              >
                <h3 className="text-xl font-bold mb-1">Technologies We Master</h3>
                <p className="text-blue-200/70 text-sm mb-8">Cutting-edge stack for scalable, modern products</p>

                <div className="grid grid-cols-4 gap-3 mb-8">
                  {techStack.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default transition-all hover:scale-105"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div
                        className="w-3 h-3 rounded-full ring-2"
                        style={{ backgroundColor: t.color, ringColor: t.color + '40' }}
                      />
                      <span className="text-white text-[11px] font-medium text-center leading-tight">{t.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(245,106,0,0.15)', border: '1px solid rgba(245,106,0,0.3)' }}
                >
                  <span className="text-2xl">ðŸ†</span>
                  <p className="text-sm text-orange-200 font-medium">
                    Certified partners with AWS, Google Cloud & Microsoft Azure
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FEATURED WORK
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="section-pad" style={{ backgroundColor: '#fffbf5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="pill-label pill-orange mb-4">🚀 FEATURED PROJECTS</span>
            <h2 className="section-heading mb-3">Digital Solutions Built for Scale</h2>
            <div className="divider-orange" />
            <p className="section-sub mt-5">
              Carefully curated toys, books, and educational kits â€” free shipping above â‚¹500!
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} h="h-80" />)}
            </div>
          ) : products.length === 0 ? (
            /* Fallback when backend not connected */
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">ðŸ§¸</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Projects Coming Soon</h3>
              <p className="text-gray-500 text-sm mb-6">We are currently updating our portfolio.</p>
              <Link to="/contact" className="btn btn-primary">
                Contact Us for Orders
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, i) => <ProjectCard key={p._id} p={p} index={i} />)}
            </div>
          )}

          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/projects" className="btn btn-primary btn-lg">
                View All Projects <FiArrowRight />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TESTIMONIALS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="section-pad bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="pill-label pill-navy mb-4">TESTIMONIALS</span>
            <h2 className="section-heading mb-3">What Our Clients Say</h2>
            <div className="divider-orange" />
          </motion.div>

          <div className="relative">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: i === tIdx ? 1 : 0, y: i === tIdx ? 0 : 12 }}
                transition={{ duration: 0.4 }}
                className={`${i === tIdx ? 'block' : 'hidden'}`}
              >
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
                  <FaQuoteLeft className="text-4xl mb-6" style={{ color: '#f56a00' }} />
                  <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 italic font-light">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <FiStar
                        key={j}
                        className="text-yellow-400"
                        style={{ fill: '#facc15' }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Dots */}
            <div className="flex justify-center gap-2.5 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === tIdx ? '28px' : '10px',
                    height: '10px',
                    backgroundColor: i === tIdx ? '#f56a00' : '#d1d5db',
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CTA SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative py-28 overflow-hidden bg-hero">
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, #f56a00 0%, transparent 70%)', top: '-200px' }}
        />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="pill-label pill-glass mb-6">READY TO START?</span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Let's Build Something<br />
              <span style={{ color: '#f56a00' }}>Amazing Together</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Get a free consultation and detailed project estimate from our experts â€” no obligations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Quote <FiArrowRight />
              </Link>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || "919876543210"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
              >
                <FaWhatsapp className="text-xl text-green-400" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;







