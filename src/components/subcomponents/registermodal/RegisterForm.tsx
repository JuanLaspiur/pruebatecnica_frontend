import { Input } from "../../subcomponents";
import {useTranslations} from 'next-intl';
interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({
  name,
  email,
  password,
  repeatPassword,
  setName,
  setEmail,
  setPassword,
  setRepeatPassword,
  handleSubmit,
}: RegisterFormProps) => {
  const t = useTranslations('loginPage');
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('fullName')} required />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} required />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} required />
      <Input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder={t('repeatPassword')} required />
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {t('sendSingUp')}
      </button>
    </form>
  );
};

export default RegisterForm;
