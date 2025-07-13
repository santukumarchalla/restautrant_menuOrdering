import axios from 'axios';
import { getToken, getUserId } from '../utils/token';

const userAPI = axios.create({
  baseURL: 'http://localhost:8080/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token automatically
userAPI.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const userService = {
  getCategories: () =>
    userAPI.get('/categories').then(res => res.data),

  getMenuByCategory: (categoryId) =>
    userAPI.get(`/menu/category/${categoryId}`).then(res => res.data),

  addToCart: (itemId) => {
    const userId = getUserId();
    return userAPI.post(`/cart/add`, null, {
      params: { userId, itemId },
    });
  },

 increaseItem: (userId, itemId) => {
  return userAPI.post(`/cart/increase`, null, {
    params: { userId, itemId },
  });
},

decreaseItem: (userId, itemId) => {
  return userAPI.post(`/cart/decrease`, null, {
    params: { userId, itemId },
  });
},


  getCart: async () => {
    const userId = getUserId();
    const response = await userAPI.get(`/cart/${userId}`);
    return response.data;
  },

  getCartSummary: async () => {
    const userId = getUserId();
    const response = await userAPI.get(`/cart/summary/${userId}`);
    return response.data;
  },

  placeOrder: async (orderData) => {
    const response = await userAPI.post('/orders', orderData);
    return response.data;
  },

  getUserOrderHistory: async () => {
    const userId = getUserId();
    const response = await userAPI.get(`/orders/history/${userId}`);
    return response.data;
  },

  // Alias for consistency
  getUserOrders: async () => {
    const userId = getUserId();
    const response = await userAPI.get(`/orders/history/${userId}`);
    return response.data;
  },
};


