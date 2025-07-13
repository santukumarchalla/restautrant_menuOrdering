import { UserCheck, AlertCircle } from 'lucide-react';

const SelectField = ({ name, value, onChange, options, error }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <UserCheck className="h-5 w-5 text-gray-400" />
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && (
        <div className="absolute -bottom-6 left-0 flex items-center">
          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;