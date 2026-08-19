import api from './api';

const faqService = {
  getFAQs: async () => {
    return await api.get('/faqs');
  },
};

export default faqService;
