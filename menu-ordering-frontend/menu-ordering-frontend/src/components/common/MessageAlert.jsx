import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const MessageAlert = ({ type, text }) => {
  if (!text) return null;
  
  return (
    <div className={`p-4 rounded-lg border flex items-center ${
      type === 'success' 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 mr-2" />
      ) : (
        <AlertCircle className="h-5 w-5 mr-2" />
      )}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default MessageAlert;