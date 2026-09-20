import { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../api/api';

const SiteContext = createContext();

export const useSiteSettings = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    logo: '/logo.jpg',
    privacyPolicy: '',
    termsOfService: '',
    contactEmail: 'hello@nexoraindia.com',
    contactPhone: '+91 98765 43210',
    contactAddress: '123 Business Hub, Mumbai, Maharashtra 400001, India',
    whatsappNumber: '919876543210'
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      if (res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      console.error('Failed to load site settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, fetchSettings, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
