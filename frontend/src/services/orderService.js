import api from './api';

const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  getOrders: async () => {
    return await api.get('/orders');
  },

  getOrderById: async (id) => {
    return await api.get(`/orders/${id}`);
  },

  updateOrderStatus: async (id, status) => {
    return await api.put(`/orders/${id}/status`, { status });
  },

  deleteOrder: async (id) => {
    return await api.delete(`/orders/${id}`);
  },

  getDashboardStats: async () => {
    return await api.get('/orders/stats/dashboard');
  },
};

export default orderService;
