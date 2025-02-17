'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authcontext';
import { RegisterModal, LoginForm } from '@/components';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
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
        <LoginForm onSubmit={handleSubmit} error={error} onOpenRegisterModal={() => setIsRegisterOpen(true)} />
        
        {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
      </div>
    </div>
  );
};

export default LoginPage;

