import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to inject token on each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session timeouts
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if needed
      localStorage.removeItem('token');
      
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const AuthAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/api/auth/reset-password', { token, password }),
  verifyToken: () => api.get('/api/auth/verify'),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

// User API
export const UserAPI = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (userData) => api.put('/api/users/profile', userData),
  uploadAvatar: (formData) => api.post('/api/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// Family Group API
export const FamilyGroupAPI = {
  getAll: () => api.get('/api/family-groups'),
  getById: (id) => api.get(`/api/family-groups/${id}`),
  create: (data) => api.post('/api/family-groups', data),
  update: (id, data) => api.put(`/api/family-groups/${id}`, data),
  delete: (id) => api.delete(`/api/family-groups/${id}`),
  addMember: (groupId, userId, role) => api.post(`/api/family-groups/${groupId}/members`, { userId, role }),
  removeMember: (groupId, userId) => api.delete(`/api/family-groups/${groupId}/members/${userId}`)
};

// Family Tree API
export const FamilyTreeAPI = {
  getTree: (familyGroupId) => api.get(`/api/family-tree/family-group/${familyGroupId}`),
  getMember: (id) => api.get(`/api/family-tree/member/${id}`),
  createMember: (data) => api.post('/api/family-tree/member', data),
  updateMember: (id, data) => api.put(`/api/family-tree/member/${id}`, data),
  deleteMember: (id) => api.delete(`/api/family-tree/member/${id}`)
};

// Albums API
export const AlbumAPI = {
  getAll: (familyGroupId) => api.get(`/api/media/albums?familyGroup=${familyGroupId}`),
  getById: (id) => api.get(`/api/media/albums/${id}`),
  create: (data) => api.post('/api/media/albums', data),
  update: (id, data) => api.put(`/api/media/albums/${id}`, data),
  delete: (id) => api.delete(`/api/media/albums/${id}`),
  uploadPhoto: (albumId, formData) => api.post(`/api/media/albums/${albumId}/photos`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deletePhoto: (photoId) => api.delete(`/api/media/photos/${photoId}`)
};

// Messages API
export const MessageAPI = {
  getChats: () => api.get('/api/chat/rooms'),
  getChatById: (chatId) => api.get(`/api/chat/rooms/${chatId}`),
  createChat: (data) => api.post('/api/chat/rooms', data),
  getMessages: (chatId) => api.get(`/api/messages/${chatId}`),
  sendMessage: (chatId, content) => api.post(`/api/messages/${chatId}`, { content })
};

// Budget API
export const BudgetAPI = {
  getAll: (familyGroupId) => api.get(`/api/budget?familyGroup=${familyGroupId}`),
  getById: (id) => api.get(`/api/budget/${id}`),
  create: (data) => api.post('/api/budget', data),
  update: (id, data) => api.put(`/api/budget/${id}`, data),
  delete: (id) => api.delete(`/api/budget/${id}`),
  addTransaction: (budgetId, data) => api.post(`/api/budget/${budgetId}/transactions`, data),
  updateTransaction: (budgetId, transactionId, data) => 
    api.put(`/api/budget/${budgetId}/transactions/${transactionId}`, data),
  deleteTransaction: (budgetId, transactionId) => 
    api.delete(`/api/budget/${budgetId}/transactions/${transactionId}`)
};

export default api; 