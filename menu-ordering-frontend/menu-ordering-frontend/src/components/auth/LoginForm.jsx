import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { authService } from '../../services/auth';
import { validateLoginForm } from '../../utils/validation';
import InputField from '../common/InputField';
import MessageAlert from '../common/MessageAlert';
import { isTokenValid, decodeToken } from '../../utils/token';

const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);
    const redirected = location.state?.fromProtectedRoute;

    const isOnAuthPage = ['/login', '/register', '/'].includes(window.location.pathname);

    if (token && isTokenValid(token) && decoded && isOnAuthPage && !redirected) {
      const role = decoded.role;
      if (role === 'ADMIN') navigate('/admin/categories');
      else if (role === 'USER') navigate('/user/categories');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await authService.login(formData);

      if (response.token) {
        const decoded = jwtDecode(response.token);
        const role = decoded?.role;
        const userId = decoded?.id;

        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', userId);

        if (role === 'ADMIN') {
          navigate('/admin/categories');
        } else if (role === 'USER') {
          navigate('/user/categories');
        } else {
          navigate('/');
        }
      }

      setMessage({ type: 'success', text: 'Login successful!' });
      setFormData({ email: '', password: '' });

      if (onSuccess) onSuccess(response);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Login</h2>
        <MessageAlert type={message.type} text={message.text} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Mail}
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            icon={Lock}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-orange-600" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-orange-600 hover:text-orange-500">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 flex justify-center items-center"
          >
            {loading ? <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Signing in...</> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;





