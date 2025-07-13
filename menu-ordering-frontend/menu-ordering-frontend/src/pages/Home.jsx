
// src/pages/Home.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserFromToken } from '../utils/token';

const Home = () => {
  const navigate = useNavigate();
  const token = getToken();
  const role = getUserFromToken()?.role;

  useEffect(() => {
    if (token) {
      if (role === 'ADMIN') {
        navigate('/admin/categories');
      } else if (role === 'USER') {
        navigate('/user/categories');
      }
    }
  }, [token, role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-600 text-center">
        Welcome to the Menu Ordering App 🍽️
      </h1>
    </div>
  );
};

export default Home;

