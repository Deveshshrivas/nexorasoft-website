import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import {
  FaCode, FaMobile, FaServer, FaCloud, FaPalette,
  FaChartLine, FaShieldAlt, FaLightbulb
} from 'react-icons/fa';

const iconMap = {
  FaCode, FaMobile, FaServer, FaCloud, FaPalette,
  FaChartLine, FaShieldAlt, FaLightbulb,
};

const categoryColors = {
  Development: { dot: '#6366f1' },
  Infrastructure: { dot: '#f59e0b' },
  Design: { dot: '#a855f7' },
  Marketing: { dot: '#10b981' },
  Security: { dot: '#ef4444' },
  Consulting: { dot: '#f56a00' },
};

const ServiceCard = ({ service, index = 0 }) => {
  const Icon = iconMap[service.icon] || FaCode;
  const catColor = categoryColors[service.category] || { dot: '#1a2d6b' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="card-service group relative overflow-hidden"
    >
      {service.image && (
        <div style={{ margin: '-1.75rem -1.75rem 1.5rem -1.75rem' }} className="h-48 overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      {/* Top row: icon + category */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="icon-box icon-box-navy group-hover:scale-110 transition-transform duration-300"
        >
          <Icon className="text-xl text-white" />
        </div>
        <span
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: catColor.dot + '18', color: catColor.dot }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: catColor.dot }}
          />
          {service.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[1.05rem] font-bold mb-2 leading-snug"
        style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}
      >
        {service.title}
      </h3>

      {/* Short desc */}
      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
        {service.shortDescription}
      </p>

      {/* Feature list (top 3) */}
      <ul className="space-y-1.5 mb-5">
        {service.features?.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
            <FiCheck
              className="flex-shrink-0 text-sm"
              style={{ color: '#22c55e' }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Starting at</p>
          <p className="text-sm font-bold" style={{ color: '#f56a00' }}>
            {service.priceRange || 'Contact us'}
          </p>
        </div>
        <Link
          to={`/services/${service.slug}`}
          className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full text-white transition-all hover:gap-2.5 hover:shadow-md"
          style={{ backgroundColor: '#1a2d6b' }}
        >
          Learn More <FiArrowRight className="text-sm" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
