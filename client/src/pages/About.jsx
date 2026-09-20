import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiGlobe, FiCode } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const STATS = [
  { icon: FiUsers,  value: '500+', label: 'Happy Clients',      color: '#f56a00' },
  { icon: FiAward,  value: '8+',   label: 'Years Experience',   color: '#1a2d6b' },
  { icon: FiCode,   value: '150+', label: 'Projects Done',      color: '#f56a00' },
  { icon: FiGlobe,  value: '15+',  label: 'Industries Served',  color: '#1a2d6b' },
];

const VALUES = [
  { icon: FiTarget, title: 'Excellence',    desc: 'We hold ourselves to the highest standards in everything we deliver.' },
  { icon: FiHeart,  title: 'Passion',       desc: 'We love what we do, and it shows in the quality of our work.' },
  { icon: FiUsers,  title: 'Collaboration', desc: 'We work closely with clients as true partners, not just vendors.' },
  { icon: FiGlobe,  title: 'Innovation',    desc: 'We stay ahead of technology trends to give you the competitive edge.' },
];

const TEAM = [
  { name: 'Arjun Mehta',  role: 'CEO & Founder',     seed: 'Arjun',  bg: 'b6e3f4', bio: '10+ years building scalable software products and leading high-performance engineering teams.' },
  { name: 'Sneha Patel',  role: 'CTO',               seed: 'Sneha',  bg: 'ffd5dc', bio: 'Full-stack architect specializing in cloud-native architectures and DevOps best practices.' },
  { name: 'Rahul Singh',  role: 'Head of Design',    seed: 'Rahul',  bg: 'd1f4cc', bio: 'Award-winning UI/UX designer crafting delightful digital experiences since 2014.' },
  { name: 'Meera Gupta',  role: 'Head of Projects',  seed: 'Meera',  bg: 'c0aede', bio: 'Ensures smooth delivery of high-quality digital solutions across India.' },
];

const TIMELINE = [
  { year: '2016', event: 'Founded in Mumbai as a 3-person web studio.' },
  { year: '2018', event: 'Expanded to mobile app development & API services.' },
  { year: '2020', event: 'Launched DevOps & Cloud infrastructure division.' },
  { year: '2022', event: 'Expanded IT consulting and cloud infrastructure offerings.' },
  { year: '2024', event: '500+ clients served across 15+ industries.' },
];

const About = () => (
  <div className="page-wrapper">

    {/* Hero */}
    <section className="relative py-28 overflow-hidden bg-hero">
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="pill-label pill-glass mb-5">ABOUT US</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black text-white mb-5"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Building Digital Solutions<br />
          <span style={{ color: '#f56a00' }}>& Brightening Young Minds</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg max-w-xl mx-auto"
        >
          Founded in 2016 â€” from a small Mumbai studio to India's trusted IT & IT solutions partner.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 50" fill="none" className="w-full">
          <path d="M0,30 C480,60 960,0 1440,30 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: s.color + '15' }}
              >
                <s.icon style={{ color: s.color }} className="text-xl" />
              </div>
              <p
                className="text-3xl font-black mb-1"
                style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}
              >
                {s.value}
              </p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Story + Timeline */}
    <section className="section-pad" style={{ backgroundColor: '#f8faff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="pill-label pill-navy mb-4">OUR STORY</span>
            <h2 className="section-heading mb-3">
              From a Small Office to India's Trusted IT Partner
            </h2>
            <div className="divider-orange mb-6" style={{ margin: '0 0 1.5rem' }} />
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
              <p>
                Nexora India started in 2016 when our founder Arjun Mehta saw a gap in the market â€” small and medium businesses in India needed enterprise-grade IT services at affordable prices.
              </p>
              <p>
                What began as a 3-person web studio in Mumbai has grown into a 50+ member team delivering full-stack IT solutions across web, mobile, APIs, DevOps, and cybersecurity.
              </p>
              <p>
                In 2022, we expanded our IT operations globally, delivering world-class enterprise software and mobile applications.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="pill-label pill-orange mb-4">OUR JOURNEY</span>
            <div className="relative mt-6">
              {/* Vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: '#e5e7eb' }}
              />
              <div className="space-y-6">
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 relative"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-white z-10"
                      style={{ backgroundColor: i % 2 === 0 ? '#f56a00' : '#1a2d6b' }}
                    >
                      {t.year.slice(2)}
                    </div>
                    <div className="bg-white rounded-xl p-4 flex-1 shadow-sm border border-gray-100">
                      <p className="font-bold text-sm mb-0.5" style={{ color: '#1a2d6b' }}>{t.year}</p>
                      <p className="text-gray-500 text-sm">{t.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission + Vision */}
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-3">Our Mission & Vision</h2>
          <div className="divider-orange" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: FiTarget, title: 'Our Mission', color: '#1a2d6b',
              text: 'To empower businesses of all sizes with affordable, world-class IT solutions, and to drive digital transformation through cutting-edge technology.',
            },
            {
              icon: FiEye, title: 'Our Vision', color: '#f56a00',
              text: "To be India's most trusted IT partner and kids product brand â€” known for excellence, innovation, and a genuine commitment to making lives better.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-8 border-2 hover:shadow-xl transition-all duration-300"
              style={{ borderColor: item.color + '20' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: item.color }}
              >
                <item.icon className="text-3xl text-white" />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="section-pad" style={{ backgroundColor: '#f8faff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="pill-label pill-navy mb-4">OUR VALUES</span>
          <h2 className="section-heading mb-3">What Drives Us</h2>
          <div className="divider-orange" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#fff7ed' }}
              >
                <v.icon className="text-2xl" style={{ color: '#f56a00' }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{v.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="pill-label pill-orange mb-4">OUR TEAM</span>
          <h2 className="section-heading mb-3">The People Behind Nexora</h2>
          <div className="divider-orange" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.seed}&backgroundColor=${m.bg}`}
                  alt={m.name}
                  className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 group-hover:border-orange-400 transition-colors"
                />
              </div>
              <h4 className="font-bold text-gray-900 mb-0.5">{m.name}</h4>
              <p className="text-sm font-semibold mb-3" style={{ color: '#f56a00' }}>{m.role}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-4"
      >
        <h2 className="section-heading mb-4">Ready to Work With Us?</h2>
        <p className="text-gray-600 mb-8">Let's build something amazing together.</p>
        <Link to="/contact" className="btn btn-primary btn-lg">Get In Touch</Link>
      </motion.div>
    </section>
  </div>
);

export default About;
