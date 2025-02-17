import { Input } from "../../subcomponents";

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
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <Input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat Password" required />
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
