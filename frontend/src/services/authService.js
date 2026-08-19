import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data));
    }
    return response;
  },

  register: async (name, email, password, phone) => {
    const response = await api.post('/auth/register', { name, email, password, phone });
    if (response.data && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data));
    }
    return response;
  },

  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email });
  },

  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData);
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
