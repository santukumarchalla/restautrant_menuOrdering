// src/services/admin.js
import axios from 'axios';
import { getToken } from '../utils/token';  // ✅ Import token utility

const API_BASE_URL = 'http://localhost:8080';

const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token to every request automatically
adminAPI.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  // Categories
  getCategories: () => adminAPI.get('/categories').then(res => res.data),
  createCategory: (data) => adminAPI.post('/categories', data).then(res => res.data),
  deleteCategory: (id) => adminAPI.delete(`/categories/${id}`),

  // Menu Items
  getMenuItemsByCategory: (categoryId) =>
    adminAPI.get(`/menu/items/by-category/${categoryId}`).then(res => res.data),
  createMenuItem: (data) => adminAPI.post('/menu/items', data).then(res => res.data),
  updateMenuItem: (id, data) => adminAPI.put(`/menu/items/${id}`, data).then(res => res.data),
  deleteMenuItem: (id) => adminAPI.delete(`/menu/items/${id}`),
  toggleAvailability: (id, available) =>
    adminAPI.patch(`/menu/items/${id}/availability`, null, {
      params: { available }
    }).then(res => res.data),

  // Orders
  getPaginatedOrders: async (page = 0, size = 5, sortBy = 'id') => {
    const response = await adminAPI.get(`/orders/paginated?page=${page}&size=${size}&sortBy=${sortBy}`);
    return response.data;
  },

  approveOrder: async (orderId) => {
    const response = await adminAPI.put(`/orders/${orderId}/approve`);
    return response.data;
  },

  denyOrder: async (orderId) => {
    const response = await adminAPI.put(`/orders/${orderId}/deny`);
    return response.data;
  }
};

