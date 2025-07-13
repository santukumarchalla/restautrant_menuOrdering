// src/components/common/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { getUserFromToken, isTokenValid } from '../../utils/token';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = getUserFromToken();
  const isLoggedIn = token && isTokenValid(token);

  const currentPath = location.pathname;
  const isAdminRoute = currentPath.startsWith('/admin');
  const isUserRoute = currentPath.startsWith('/user');

  if (!isLoggedIn || !user) {
    console.log('🔒 Not logged in — redirecting to /login');
    return <Navigate to="/login" replace state={{ fromProtectedRoute: true }} />;
  }

  const role = user.role;
  console.log('✅ ROLE:', role, 'PATH:', currentPath);

  // 🚫 USER trying to access ADMIN route
  if (isAdminRoute && role !== 'ADMIN') {
    console.warn('🚫 USER trying to access ADMIN route — redirecting to /login');
    localStorage.removeItem('token'); // optional: force logout
    return <Navigate to="/login" replace state={{ fromProtectedRoute: true }} />;
  }

  // 🚫 ADMIN trying to access USER route
  if (isUserRoute && role !== 'USER') {
    console.warn('🚫 ADMIN trying to access USER route — redirecting to /login');
    localStorage.removeItem('token'); // optional: force logout
    return <Navigate to="/login" replace state={{ fromProtectedRoute: true }} />;
  }

  // ✅ Valid route for role
  return children;
};

export default PrivateRoute;





