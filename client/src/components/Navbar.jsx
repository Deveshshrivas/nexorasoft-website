import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { useSiteSettings } from "../context/SiteContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/98 backdrop-blur-md py-3"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <img src={settings.logo || "/logo.jpg"} alt="Nexora India" className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent group-hover:ring-orange-500 transition-all duration-300" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-black tracking-wide" style={{ color: "#1a2d6b", fontFamily: "Poppins, sans-serif" }}>NEXORA</span>
              <span className="text-sm font-bold tracking-widest -mt-0.5" style={{ color: "#f56a00", fontFamily: "Poppins, sans-serif" }}>INDIA</span>
            </div>
          </Link>

                    <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive ? "text-white" : "text-gray-600 hover:text-white hover:bg-orange-500"}`} style={({ isActive }) => isActive ? { backgroundColor: "#1a2d6b" } : {}}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href={`tel:${settings.contactPhone?.replace(/\s+/g, '')}`} className="hidden lg:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full text-gray-600 hover:text-navy-800 hover:bg-gray-100 transition-all duration-200">
              <FiPhone className="flex-shrink-0" style={{ color: "#f56a00" }} />
              <span>{settings.contactPhone}</span>
            </a>
            <Link to="/contact" className="hidden md:inline-flex btn btn-primary btn-sm">Get Quote</Link>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="md:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><FiX className="text-xl" /></motion.div> : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><FiMenu className="text-xl" /></motion.div>}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <NavLink to={link.to} end={link.to === "/"} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "text-white" : "text-gray-700 hover:bg-gray-50"}`} style={({ isActive }) => isActive ? { backgroundColor: "#1a2d6b" } : {}}>{link.label}</NavLink>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-1 flex flex-col gap-2">
                <a href={`tel:${settings.contactPhone?.replace(/\s+/g, '')}`} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-600"><FiPhone style={{ color: "#f56a00" }} />{settings.contactPhone}</a>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="btn btn-primary w-full text-center">Get Free Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;






