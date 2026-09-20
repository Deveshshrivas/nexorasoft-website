import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Services
export const getServices = () => API.get('/services');
export const getService = (slug) => API.get(`/services/${slug}`);
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

// Projects
export const getProjects = () => API.get('/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Contact
export const submitContact = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const updateMessage = (id, data) => API.put(`/contact/${id}`, data);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);

// Settings
export const getSettings = () => API.get('/settings');
export const updateSettings = (data) => API.put('/settings', data);

// Admin Auth
export const requestAdminOTP = (data) => API.post('/adminAuth/request-otp', data);
export const verifyAdminOTP = (data) => API.post('/adminAuth/verify-otp', data);

export default API;
