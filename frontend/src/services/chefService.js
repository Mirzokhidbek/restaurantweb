import api from './api';

const chefService = {
  getChefs: async () => {
    return await api.get('/chefs');
  },
  getChefById: async (id) => {
    return await api.get(`/chefs/${id}`);
  },
};

export default chefService;
