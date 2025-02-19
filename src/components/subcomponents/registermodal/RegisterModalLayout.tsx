interface RegisterModalLayoutProps {
    children: React.ReactNode;
    onClose: () => void;
  }
  
  const RegisterModalLayout = ({ children, onClose }: RegisterModalLayoutProps) => {
    return (
      <div className="w-full h-full absolute z-1 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mt-[-20px]">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Registro</h2>
          {children}
          <button onClick={onClose} className="mt-4 text-center text-sm text-gray-600 hover:underline w-full">
            Cancelar
          </button>
        </div>
      </div>
    );
  };
  
  export default RegisterModalLayout;
  