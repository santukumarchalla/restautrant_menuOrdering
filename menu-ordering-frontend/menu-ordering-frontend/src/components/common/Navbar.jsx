
// src/components/common/Navbar.jsx
import {
  ChefHat,
  LogOut,
  ShoppingCart,
  List,
  LayoutGrid,
  ClipboardList,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken, getToken } from '../../utils/token';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUserFromToken();
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className={`flex items-center text-white space-x-2 ${
            token ? 'cursor-default' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (!token) navigate('/');
          }}
        >
          <ChefHat className="h-6 w-6" />
          <span className="text-xl font-semibold">Restaurant MenuOrdering</span>
        </div>

        <div className="flex items-center space-x-6 text-white text-sm font-medium">
          {!token && (
            <>
              <button onClick={() => navigate('/login')} className="hover:text-orange-100">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="hover:text-orange-100">
                Register
              </button>
            </>
          )}

          {token && role === 'ADMIN' && (
            <>
              <button
                onClick={() => navigate('/admin/categories')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <LayoutGrid size={16} /> Categories
              </button>
              <button
                onClick={() => navigate('/admin/menu')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <List size={16} /> Menu Items
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <ClipboardList size={16} /> Orders
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}

          {token && role === 'USER' && (
            <>
              <button
                onClick={() => navigate('/user/categories')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <LayoutGrid size={16} /> Categories
              </button>
              <button
                onClick={() => navigate('/user/cart')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <ShoppingCart size={16} /> Cart
              </button>
              <button
                onClick={() => navigate('/user/orders')}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <ClipboardList size={16} /> Orders
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-orange-100 flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
