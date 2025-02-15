'use client';

import { useState } from 'react';
import Input from './subcomponents/common/Input'; 
import { register } from '@/lib/auth';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    await register(name, email, password );
    onClose();
  };

  return (
    <div className="w-full h-full absolute z-1 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Full Name" 
              required 
            />
          </div>
          <div>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
          </div>
          <div>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>
          <div>
            <Input 
              type="password" 
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)} 
              placeholder="Repeat Password" 
              required 
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Registrarse
            </button>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 text-center text-sm text-gray-600 hover:underline w-full">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
