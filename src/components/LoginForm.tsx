'use client';

import { useState } from 'react';
import Image from 'next/image'; 
import Input from './subcomponents/common/Input';
import {useTranslations} from 'next-intl';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string | null;
  onOpenRegisterModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, onOpenRegisterModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('loginPage');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    onSubmit(email, password);
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <div className="flex justify-center mb-2">
        <Image 
          src="/logo/logo.png" 
          alt="Logo" 
          width={300} 
          height={200} 
          priority 
        />
      </div>

      <h1 className="text-2xl font-semibold text-center text-blue-600 my-3">{t('title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email')}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            required
          />
        </div>
       
        <div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm">
         {t('hasntAccount')} <button className="text-blue-600 hover:underline" onClick={onOpenRegisterModal}>{t('singUp')}</button>
      </p>
      {error && <p className="pt-5 text-center text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LoginForm;
