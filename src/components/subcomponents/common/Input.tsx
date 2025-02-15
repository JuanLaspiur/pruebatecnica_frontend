'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, required = false }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <input
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      {type === 'password' && (
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
        >
          {!isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />} 
        </button>
      )}
    </div>
  );
};

export default Input;

