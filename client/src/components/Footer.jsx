import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useSiteSettings } from "../context/SiteContext";

const serviceLinks = [
  { label: "Web Development",       slug: "web-development" },
  { label: "Mobile App Development", slug: "mobile-app-development" },
  { label: "API Development",        slug: "api-development" },
  { label: "DevOps & Cloud",         slug: "devops-cloud" },
  { label: "UI/UX Design",           slug: "ui-ux-design" },
  { label: "Cybersecurity",          slug: "cybersecurity" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Portfolio Projects", to: "/projects" },
  { label: "Contact Us", to: "/contact" }
];



const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200" style={{ backgroundColor: "#4b5563" }} />
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const { settings } = useSiteSettings();

  const socialLinks = [
    { icon: FaFacebook,  href: "#",                               color: "#1877f2", label: "Facebook" },
    { icon: FaInstagram, href: "#",                               color: "#e1306c", label: "Instagram" },
    { icon: FaLinkedin,  href: "#",                               color: "#0a66c2", label: "LinkedIn" },
    { icon: FaWhatsapp,  href: 'https://wa.me/' + (settings.whatsappNumber || "919876543210"), color: "#25d366", label: "WhatsApp" },
    { icon: FaYoutube,   href: "#",                               color: "#ff0000", label: "YouTube" },
  ];

  return (
    <motion.footer initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ backgroundColor: "#080f22" }} className="text-white">
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #1a2d6b, #f56a00, #1a2d6b)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <img src={settings.logo || "/logo.jpg"} alt="Nexora India" className="h-14 w-14 rounded-full object-cover border-2 border-orange-500/50 group-hover:border-orange-500 transition-colors bg-white" />
              <div className="leading-none">
                <div className="text-xl font-black tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>NEXORA<span style={{ color: "#f56a00" }}> INDIA</span></div>
                <p className="text-[11px] text-gray-500 tracking-wider mt-0.5 uppercase">Tech Solutions</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Nexora India â€” your premier partner for cutting-edge IT services and digital transformation. Helping businesses grow and innovate since 2016.</p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = color} onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"}>
                  <Icon className="text-sm text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2"><span className="w-4 h-0.5 rounded" style={{ backgroundColor: "#f56a00" }} />Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <FooterLink key={link.to} to={link.to}>{link.label}</FooterLink>)}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2"><span className="w-4 h-0.5 rounded" style={{ backgroundColor: "#f56a00" }} />IT Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map(s => <FooterLink key={s.slug} to={`/services/${s.slug}`}>{s.label}</FooterLink>)}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2"><span className="w-4 h-0.5 rounded" style={{ backgroundColor: "#f56a00" }} />Contact</h3>
            <ul className="space-y-4 mb-6">
              {[
                { icon: FiMapPin, lines: [settings.contactAddress || "Mumbai, India"] },
                { icon: FiPhone,  lines: [settings.contactPhone || "+91 98765 43210"] },
                { icon: FiMail,   lines: [settings.contactEmail || "hello@nexoraindia.com"] },
              ].map(({ icon: Icon, lines }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="flex-shrink-0 mt-0.5 text-sm" style={{ color: "#f56a00" }} />
                  <div>{lines.map((l, j) => <p key={j} className="text-gray-400 text-sm">{l}</p>)}</div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-sm">Â© {new Date().getFullYear()} Nexora India Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="text-gray-600 text-xs hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 text-xs hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;





