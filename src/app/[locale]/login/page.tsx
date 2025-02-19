'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';

import { useAuth } from '@/contexts/authcontext';
import { RegisterModal, LoginForm } from '@/components';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Hacer visible el componente con un delay
    setTimeout(() => setIsVisible(true), 100); // Puedes ajustar el tiempo de delay
  }, []);

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      router.push(`/todo`);
    } catch {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image 
        src="/backgraund.jpg" 
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
        quality={90} 
        priority
      />
      <div 
        className={`relative flex flex-col items-center justify-center w-full max-w-sm sm:ml-16 space-y-6 bg-white bg-opacity-75 p-3 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <LoginForm onSubmit={handleSubmit} error={error} onOpenRegisterModal={() => setIsRegisterOpen(true)} />
        
        {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
      </div>
    </div>
  );
};

export default LoginPage;
