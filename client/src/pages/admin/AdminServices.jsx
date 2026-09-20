import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getServices, createService, updateService, deleteService } from '../../api/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', shortDescription: '', fullDescription: '',
    icon: 'FaCode', priceRange: '', deliveryTime: '', category: 'Development'
  });

  const fetchServices = () => {
    setLoading(true);
    getServices()
      .then(r => setServices(r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service._id);
      setFormData({
        title: service.title, slug: service.slug, shortDescription: service.shortDescription,
        fullDescription: service.fullDescription, icon: service.icon,
        priceRange: service.priceRange || '', deliveryTime: service.deliveryTime || '',
        category: service.category
      });
    } else {
      setEditingId(null);
      setFormData({ 
        title: '', slug: '', shortDescription: '', fullDescription: '',
        icon: 'FaCode', priceRange: '', deliveryTime: '', category: 'Development' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, formData);
        toast.success('Service updated!');
      } else {
        await createService(formData);
        toast.success('Service created!');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        toast.success('Service deleted');
        fetchServices();
      } catch (err) {
        toast.error('Error deleting service');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Manage Services</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary text-sm py-2 px-4">
          <FiPlus className="text-lg" /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600 text-sm">Service Title</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Price Range</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Delivery</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center"><div className="spinner mx-auto" /></td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500">No services found.</td></tr>
            ) : (
              services.map(s => (
                <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{s.title}</p>
                    <p className="text-xs text-gray-500">/{s.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className="pill-label bg-blue-100 text-blue-700">{s.category}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{s.priceRange || 'Contact Us'}</td>
                  <td className="p-4 text-sm text-gray-700">{s.deliveryTime || 'Varies'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly)</label>
                  <input required type="text" className="input-field" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {['Development', 'Infrastructure', 'Design', 'Marketing', 'Security', 'Consulting'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (React Icons)</label>
                  <input required type="text" placeholder="e.g. FaCode" className="input-field" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <input type="text" placeholder="e.g. ₹5,000 - ₹20,000" className="input-field" value={formData.priceRange} onChange={e => setFormData({...formData, priceRange: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                  <input type="text" placeholder="e.g. 2-4 Weeks" className="input-field" value={formData.deliveryTime} onChange={e => setFormData({...formData, deliveryTime: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <input required type="text" className="input-field" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                  <textarea required rows="4" className="input-field" value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline-navy">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
