import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { FiHome, FiBox, FiServer, FiShoppingCart, FiMail, FiLogOut, FiLock, FiSettings, FiCheckCircle } from 'react-icons/fi';
import { useSiteSettings } from '../../context/SiteContext';
import { Turnstile } from '@marsidev/react-turnstile';
import toast from 'react-hot-toast';
import { requestAdminOTP, verifyAdminOTP } from '../../api/api';

const NAV_LINKS = [
  { path: '/admin',          icon: FiHome,          label: 'Dashboard', exact: true },
  { path: '/admin/projects', icon: FiBox,           label: 'Projects' },
  { path: '/admin/services', icon: FiServer,        label: 'Services' },
  { path: '/admin/messages', icon: FiMail,          label: 'Messages' },
  { path: '/admin/settings', icon: FiSettings,      label: 'Settings' },
];

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (localStorage.getItem('nexora_admin_token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      return toast.error('Please complete the bot verification');
    }
    
    setLoading(true);
    try {
      await requestAdminOTP({ email, turnstileToken });
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'Failed to send OTP');
      } else {
        toast.error('Cannot connect to server. Is the backend running?');
      }
      setTurnstileToken(''); // reset token on failure so they can retry
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyAdminOTP({ email, otp });
      localStorage.setItem('nexora_admin_token', res.data.token);
      toast.success('Login successful!');
      setIsAuthenticated(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexora_admin_token');
    setIsAuthenticated(false);
    setStep(1);
    setOtp('');
    setTurnstileToken('');
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="text-2xl text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Admin Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            {step === 1 ? 'Enter your admin email address.' : 'Enter the 6-digit OTP sent to your email.'}
          </p>
          
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                autoFocus
              />
              
              <div className="flex justify-center my-4">
                {/* Cloudflare Turnstile Test Site Key */}
                <Turnstile 
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: 'light' }}
                />
              </div>

              <button type="submit" disabled={loading || !turnstileToken} className="btn btn-primary w-full justify-center disabled:opacity-50">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <input
                type="text"
                required
                maxLength={6}
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field text-center tracking-[0.5em] text-lg font-bold"
                autoFocus
              />
              <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-orange-500 mt-2">
                Back to Email
              </button>
            </form>
          )}
          
          <div className="mt-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-orange-500">â† Back to Main Site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#080f22] text-white flex flex-col flex-shrink-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center gap-3 bg-white/5 flex-shrink-0">
          <img src={settings?.logo || '/logo.jpg'} alt="Logo" className="w-10 h-10 rounded-full border-2 border-orange-500/50 object-cover bg-white" />
          <div>
            <h1 className="font-bold tracking-wider text-sm">NEXORA ADMIN</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isActive ? 'bg-orange-500 text-white font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <link.icon className="text-lg" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-white/5 hover:text-red-300 w-full transition-colors"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 h-16 flex items-center px-8 flex-shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">A</span>
            Admin User
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;

