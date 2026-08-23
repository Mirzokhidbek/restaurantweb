import api from './api';

const messageService = {
  /**
   * Submit customer chat inquiry
   * @param {Object} data - { senderName, senderPhone, senderEmail, subject, messageText, userId }
   */
  sendMessage: async (data) => {
    return await api.post('/messages', data);
  },

  /**
   * Get all messages / inquiries (Admin only)
   * @param {Object} params - Query filters { status, subject }
   */
  getMessages: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/messages?${query}` : '/messages';
    return await api.get(url);
  },

  /**
   * Update message status or admin reply (Admin only)
   * @param {string} id - Message ObjectId
   * @param {Object} data - { status, adminReply }
   */
  updateMessageStatus: async (id, data) => {
    return await api.put(`/messages/${id}/status`, data);
  },

  /**
   * Delete message record (Admin only)
   * @param {string} id - Message ObjectId
   */
  deleteMessage: async (id) => {
    return await api.delete(`/messages/${id}`);
  },
};

export default messageService;
