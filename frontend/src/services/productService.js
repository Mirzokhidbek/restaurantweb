import api from './api';

const productService = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/products?${query}` : '/products';
    return await api.get(url);
  },

  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  createProduct: async (productData) => {
    return await api.post('/products', productData);
  },

  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};

export default productService;
