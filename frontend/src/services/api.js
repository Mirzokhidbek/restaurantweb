/**
 * FAZO Restorani Namangan - Centralized Axios HTTP Client
 * 
 * Clean Code Architecture Principles:
 * - Single Source of Truth for HTTP Requests.
 * - Automatic Authorization Header Injection: Reads JWT token from localStorage.
 * - Response Interceptor: Extracts payload and normalizes error messages across all services.
 */

import axios from 'axios';

// Base API URL configuration with local development fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Global Axios Instance
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15-second request timeout boundary
});

/**
 * Request Interceptor: Automatically attaches Bearer JWT token to request headers
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Unwraps response payload & normalizes backend Uzbek error messages
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.';
    return Promise.reject(new Error(message));
  }
);

export default api;
