import api from './api';

const settingService = {
  getSettings: async () => {
    return await api.get('/settings');
  },

  updateSettings: async (data) => {
    return await api.put('/settings', data);
  },
};

export default settingService;
