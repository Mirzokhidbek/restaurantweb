/**
 * FAZO Restorani Namangan - Product Service
 * 
 * Clean Code Architecture Principles:
 * - Decouples API endpoints from React UI components.
 * - Handles query string construction for filtering, text search, and dynamic sorting.
 */

import api from './api';

const productService = {
  /**
   * Fetch food products with optional category, search, and sorting parameters
   * @param {Object} params - Query options (category, search, popular, sort)
   * @returns {Promise<Object>} API Response Object { success, message, data }
   */
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/products?${query}` : '/products';
    return await api.get(url);
  },

  /**
   * Fetch single food product details by ID
   * @param {string} id - Product ObjectId
   * @returns {Promise<Object>} API Response Object
   */
  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  /**
   * Create a new food product dish (Admin only)
   * @param {Object} productData - { name, description, price, image, category, isAvailable, isPopular }
   * @returns {Promise<Object>} API Response Object
   */
  createProduct: async (productData) => {
    return await api.post('/products', productData);
  },

  /**
   * Update existing food product dish (Admin only)
   * @param {string} id - Product ObjectId
   * @param {Object} productData - Updated product attributes
   * @returns {Promise<Object>} API Response Object
   */
  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  /**
   * Delete food product dish by ID (Admin only)
   * @param {string} id - Product ObjectId
   * @returns {Promise<Object>} API Response Object
   */
  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};

export default productService;
