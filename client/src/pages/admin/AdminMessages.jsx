import { useState, useEffect } from 'react';
import { FiTrash2, FiMail, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getMessages, updateMessage, deleteMessage } from '../../api/api';

const statusColors = {
  'New': 'bg-blue-100 text-blue-700',
  'Read': 'bg-gray-100 text-gray-700',
  'Replied': 'bg-green-100 text-green-700',
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    getMessages()
      .then(r => setMessages(r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateMessage(id, { status: newStatus });
      toast.success('Message status updated!');
      fetchMessages();
    } catch (err) {
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        toast.success('Message deleted');
        fetchMessages();
      } catch (err) {
        toast.error('Error deleting message');
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Messages</h2>
        <p className="text-gray-500 text-sm">View inquiries and consultation requests.</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center bg-white rounded-2xl"><div className="spinner mx-auto" /></div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl text-gray-500 border border-gray-100">No messages found.</div>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                {msg.status === 'New' ? <FiMail /> : <FiCheckCircle />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-800">{msg.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[msg.status]}`}>
                    {msg.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm font-semibold text-gray-700 mb-2">{msg.subject}</p>
                <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 mb-4 border border-gray-100 whitespace-pre-wrap">
                  {msg.message}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                  <p>Email: <a href={`mailto:${msg.email}`} className="text-blue-500 hover:underline">{msg.email}</a></p>
                  {msg.phone && <p>Phone: {msg.phone}</p>}
                  {msg.serviceInterest && <p>Interest: <span className="text-orange-500">{msg.serviceInterest}</span></p>}
                </div>
              </div>

              <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                <select
                  className="input-field text-sm font-bold bg-gray-50 flex-1 md:flex-none"
                  value={msg.status}
                  onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                >
                  {Object.keys(statusColors).map(status => (
                    <option key={status} value={status}>Mark as {status}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-2.5 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                >
                  <FiTrash2 /> <span className="md:hidden text-sm font-bold">Delete</span>
                </button>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
