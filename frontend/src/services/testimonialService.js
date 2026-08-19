import api from './api';

const testimonialService = {
  getTestimonials: async () => {
    return await api.get('/testimonials');
  },
  createTestimonial: async (data) => {
    return await api.post('/testimonials', data);
  },
};

export default testimonialService;
