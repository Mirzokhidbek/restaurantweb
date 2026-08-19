import api from './api';

const bookmarkService = {
  getBookmarks: async () => {
    return await api.get('/bookmarks');
  },
  toggleBookmark: async (productId) => {
    return await api.post('/bookmarks/toggle', { productId });
  },
};

export default bookmarkService;
