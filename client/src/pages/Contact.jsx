import { useState } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { submitContact } from '../api/api';
import toast from 'react-hot-toast';

const SERVICE_LIST = [
  'Web Development', 'Mobile App Development', 'API Development',
  'DevOps & Cloud', 'UI/UX Design', 'Digital Marketing',
  'Cybersecurity', 'IT Consulting', 'Other',
];



const Contact = () => {
  const { settings } = useSiteSettings();

  const INFO_CARDS = [
    { icon: FiMapPin, title: 'Visit Us',       lines: [(settings.contactAddress || 'Mumbai, India')] },
    { icon: FiPhone,  title: 'Call Us',        lines: [(settings.contactPhone || '+91 98765 43210')] },
    { icon: FiMail,   title: 'Email Us',       lines: [(settings.contactEmail || 'hello@nexoraindia.com')] },
    { icon: FiClock,  title: 'Business Hours', lines: ['Mon-Sat: 9 AM - 7 PM', 'Sun: 10 AM - 4 PM'] },
  ];
  const [form, setForm]       = useState({ name:'', email:'', phone:'', subject:'', message:'', serviceInterest:'' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name:'', email:'', phone:'', subject:'', message:'', serviceInterest:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden bg-hero">
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="pill-label pill-glass mb-5">GET IN TOUCH</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Let's Work Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Have a project in mind? Want to discuss an IT consulting need? We'd love to hear from you!
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card group rounded-2xl p-5 text-center border border-gray-100 hover:border-orange-400 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#fff7ed' }}
                >
                  <card.icon className="text-xl" style={{ color: '#f56a00' }} />
                </div>
                <h4 className="font-bold text-sm mb-2" style={{ color: '#1a2d6b' }}>{card.title}</h4>
                {card.lines.map((l, j) => <p key={j} className="text-gray-500 text-xs">{l}</p>)}
              </motion.div>
            ))}
          </div>

          {/* Form + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3
                className="text-2xl font-bold mb-7"
                style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}
              >
                Send Us a Message
              </h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14"
                >
                  <FiCheckCircle className="text-7xl text-green-500 mx-auto mb-5" />
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Message Sent! ðŸŽ‰</h4>
                  <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn btn-navy mt-6"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Your Name *',      name: 'name',    type: 'text',  placeholder: 'John Doe',          required: true },
                      { label: 'Email Address *',  name: 'email',   type: 'email', placeholder: 'john@example.com',  required: true },
                      { label: 'Phone Number',     name: 'phone',   type: 'tel',   placeholder: '+91 98765 43210',   required: false },
                      { label: 'Subject *',        name: 'subject', type: 'text',  placeholder: 'Project inquiry',   required: true },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={form[f.name]}
                          onChange={handle}
                          placeholder={f.placeholder}
                          required={f.required}
                          className="input-field"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service of Interest</label>
                    <select
                      name="serviceInterest"
                      value={form.serviceInterest}
                      onChange={handle}
                      className="input-field"
                    >
                      <option value="">Select a service (optional)</option>
                      {SERVICE_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      placeholder="Tell us about your project or inquiryâ€¦"
                      rows={5}
                      required
                      className="input-field"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    <FiSend />
                    {loading ? 'Sendingâ€¦' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/${settings.whatsappNumber || "919876543210"}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 rounded-2xl text-white transition-all hover:opacity-90 hover:-translate-y-1"
                style={{ backgroundColor: '#25d366' }}
              >
                <FaWhatsapp className="text-4xl flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg leading-tight">Chat on WhatsApp</p>
                  <p className="text-green-100 text-sm">Instant response guaranteed</p>
                </div>
              </motion.a>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <h4 className="font-bold text-sm mb-4" style={{ color: '#1a2d6b' }}>FOLLOW US</h4>
                {[
                  { icon: FaFacebook,  label: 'Facebook',  handle: '@nexoraindia', color: '#1877f2' },
                  { icon: FaInstagram, label: 'Instagram', handle: '@nexoraindia', color: '#e1306c' },
                  { icon: FaLinkedin,  label: 'LinkedIn',  handle: 'nexora-india', color: '#0a66c2' },
                ].map((s, i) => (
                  <a key={i} href="#" className="flex items-center gap-3 py-2.5 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: s.color + '18' }}
                    >
                      <s.icon style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* Response time */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-5 bg-gradient-navy text-white"
              >
                <p className="font-bold mb-2">âš¡ Quick Response</p>
                <p className="text-blue-200 text-sm">
                  All inquiries are answered within <strong className="text-white">24 hours</strong> on business days.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;



