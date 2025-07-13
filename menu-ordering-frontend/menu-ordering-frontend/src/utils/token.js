// src/utils/token.js
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string' || !token.trim()) {
    console.warn('⚠️ No valid token found in localStorage');
    return null;
  }
  return token;
};

export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      console.error('❌ Token is not a valid string:', token);
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    console.error('❌ Invalid token - Decoding failed:', error.message);
    return null;
  }
};

export const isTokenValid = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
};

export const getUserId = () => {
  const user = getUserFromToken();
  return user?.id ?? null;
};

