import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { authService } from '../../services/auth';
import { validateRegisterForm } from '../../utils/validation';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import MessageAlert from '../common/MessageAlert';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { confirmPassword, ...registerPayload } = formData;
      const response = await authService.register(registerPayload);

      setMessage({
        type: 'success',
        text: `Registration successful! Redirecting to login...`
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
      });

      if (onSuccess) onSuccess(response);

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'USER', label: 'Customer' },
    { value: 'ADMIN', label: 'Admin' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Create Account</h2>

        <MessageAlert type={message.type} text={message.text} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={User}
            type="text"
            placeholder="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            icon={Mail}
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <SelectField
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            error={errors.role}
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

          <InputField
            icon={Lock}
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            showPasswordToggle={true}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-orange-600 hover:text-orange-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 hover:text-orange-500">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
