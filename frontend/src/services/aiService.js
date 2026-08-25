import api from './api';

const aiService = {
  /**
   * Send chat message to FAZO AI Afitsiant API endpoint
   * @param {Object} data - { message: string, history?: Array, senderName?: string, senderPhone?: string }
   * @returns {Promise<Object>} API Response { success: true, data: { reply: string } }
   */
  chatWithAI: async (data) => {
    const response = await api.post('/ai/chat', data);
    return response.data;
  },
};

export default aiService;
