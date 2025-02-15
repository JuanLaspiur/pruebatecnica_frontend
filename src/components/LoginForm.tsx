'use client';

import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string | null;
  onOpenRegisterModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, onOpenRegisterModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm">
        ¿No tienes una cuenta? <button className="text-blue-600 hover:underline" onClick={onOpenRegisterModal}>Regístrate</button>
      </p>
    </div>
  );
};

export default LoginForm;



