import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSettings, updateSettings } from '../../api/api';
import { useSiteSettings } from '../../context/SiteContext';

const AdminSettings = () => {
  const { fetchSettings } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    logo: '',
    privacyPolicy: '',
    termsOfService: '', contactEmail: '', contactPhone: '', contactAddress: '', whatsappNumber: ''
  });

  useEffect(() => {
    getSettings()
      .then(res => {
        if (res.data) setFormData(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error('Image must be less than 2MB');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(formData);
      toast.success('Settings updated successfully!');
      fetchSettings(); // Refresh global context
    } catch (err) {
      toast.error('Failed to update settings');
    }
  };

  if (loading) return <div className="spinner mx-auto mt-20" />;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Site Settings</h2>
        <p className="text-gray-500 text-sm">Manage global website settings like logo and legal documents.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Logo Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Branding</h3>
          
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
              {formData.logo ? (
                <img src={formData.logo} alt="Site Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No Logo</span>
              )}
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo</label>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-orange-50 file:text-orange-700
                  hover:file:bg-orange-100 cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-2">Recommended: Square image (1:1), PNG or SVG format, max 2MB.</p>
            </div>
          </div>
        </div>      {/* Contact Info */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
            <input type="email" className="input-field" value={formData.contactEmail || ''} onChange={e => setFormData({...formData, contactEmail: e.target.value})} placeholder="hello@nexoraindia.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contact Phone</label>
            <input type="text" className="input-field" value={formData.contactPhone || ''} onChange={e => setFormData({...formData, contactPhone: e.target.value})} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
            <input type="text" className="input-field" value={formData.whatsappNumber || ''} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} placeholder="919876543210 (No +, just digits)" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
            <input type="text" className="input-field" value={formData.contactAddress || ''} onChange={e => setFormData({...formData, contactAddress: e.target.value})} placeholder="123 Business Hub, Mumbai..." />
          </div>
        </div>
      </div>

      {/* Legal Pages */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Legal Pages Content</h3>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Privacy Policy</label>
            <p className="text-xs text-gray-500 mb-3">You can use plain text or markdown/HTML for formatting.</p>
            <textarea 
              rows="10" 
              className="input-field font-mono text-sm" 
              value={formData.privacyPolicy}
              onChange={e => setFormData({...formData, privacyPolicy: e.target.value})}
              placeholder="Enter your privacy policy here..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Terms of Service</label>
            <p className="text-xs text-gray-500 mb-3">You can use plain text or markdown/HTML for formatting.</p>
            <textarea 
              rows="10" 
              className="input-field font-mono text-sm" 
              value={formData.termsOfService}
              onChange={e => setFormData({...formData, termsOfService: e.target.value})}
              placeholder="Enter your terms of service here..."
            />
          </div>
        </div>

        {/* Admin Access Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Admin Access</h3>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Allowed Admin Emails</label>
            <p className="text-xs text-gray-500 mb-4">Manage the list of email addresses authorized to access the admin dashboard.</p>
            
            <div className="space-y-3 mb-4">
              {(formData.adminEmails || []).map((email, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">{email}</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      const newEmails = formData.adminEmails.filter((_, i) => i !== idx);
                      setFormData({ ...formData, adminEmails: newEmails });
                    }}
                    className="text-red-500 hover:text-red-600 text-sm font-medium px-2 py-1 bg-red-50 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {(!formData.adminEmails || formData.adminEmails.length === 0) && (
                <div className="text-sm text-gray-400 italic px-4 py-3">No additional admins added yet.</div>
              )}
            </div>

            <div className="flex gap-2">
              <input 
                type="email" 
                id="newAdminEmail"
                className="input-field flex-1" 
                placeholder="Enter new admin email..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = e.target.value.trim().toLowerCase();
                    if (val && !formData.adminEmails?.includes(val)) {
                      setFormData({ ...formData, adminEmails: [...(formData.adminEmails || []), val] });
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button 
                type="button" 
                className="btn bg-gray-800 text-white hover:bg-gray-700 px-6"
                onClick={() => {
                  const input = document.getElementById('newAdminEmail');
                  const val = input.value.trim().toLowerCase();
                  if (val && !formData.adminEmails?.includes(val)) {
                    setFormData({ ...formData, adminEmails: [...(formData.adminEmails || []), val] });
                    input.value = '';
                  }
                }}
              >
                Add Admin
              </button>
            </div>
            <p className="text-xs text-orange-500 mt-3 font-medium">Note: Your master admin email in the server configuration (.env) is permanently active and cannot be removed here.</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary px-8">Save Settings</button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;

