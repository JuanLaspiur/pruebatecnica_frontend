// LoginPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authcontext';
import RegisterModal from '@/components/RegisterModal';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/todo');
    } catch {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center sm:bg-left" style={{ backgroundImage: "url('https://img.freepik.com/fotos-premium/fondos-pantalla-azules-que-te-haran-sonreir_664601-4260.jpg')" }}>
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm sm:ml-16 space-y-6">
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
            ¿No tienes una cuenta? <button className="text-blue-600 hover:underline" onClick={() => setIsRegisterOpen(true)}>Regístrate</button>
          </p>
        </div>
        
        {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
      </div>
    </div>
  );
};

export default LoginPage;
