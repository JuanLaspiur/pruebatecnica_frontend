import React from 'react';
import Image from 'next/image';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="w-full h-full absolute z-1 flex items-center justify-center bg-black bg-opacity-50 top-0 left-0"   onClick={onClose}  >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center mb-4">
          <Image
            src={'/gift/success.gif'}  
            alt="Success Icon"
            width={70} 
            height={70} 
            className="animate-pulse mr-3" 
          />
          <h2 className="text-xl font-semibold text-green-600">Éxito</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <button 
          onClick={onClose} 
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
