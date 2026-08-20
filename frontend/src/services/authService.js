import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const userData = response.data?.data || response.data;
    if (userData && userData.token) {
      localStorage.setItem('adminToken', userData.token);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
    return response;
  },

  register: async (name, email, password, phone) => {
    const response = await api.post('/auth/register', { name, email, password, phone });
    const userData = response.data?.data || response.data;
    if (userData && userData.token) {
      localStorage.setItem('adminToken', userData.token);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
    return response;
  },

  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email });
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    const userData = response.data?.data || response.data;
    if (userData) {
      const currentUser = authService.getCurrentUser() || {};
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('adminUser', JSON.stringify(updatedUser));
    }
    return response;
  },

  addAddress: async (addressData) => {
    return await api.post('/auth/address', addressData);
  },

  removeAddress: async (addressId) => {
    return await api.delete(`/auth/address/${addressId}`);
  },

  getMyOrders: async () => {
    return await api.get('/auth/my-orders');
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },
};

export default authService;
