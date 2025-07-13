import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const InputField = ({ 
  icon: Icon, 
  type, 
  placeholder, 
  name, 
  value, 
  onChange, 
  error, 
  showPasswordToggle, 
  showPassword, 
  onTogglePassword 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full pl-10 pr-${showPasswordToggle ? '10' : '3'} py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      )}
      {error && (
        <div className="absolute -bottom-6 left-0 flex items-center">
          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;



