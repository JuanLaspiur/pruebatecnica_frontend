import React from 'react';
import Image from 'next/image'; 

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="w-full h-full absolute z-1 flex items-center justify-center bg-black bg-opacity-50 top-0 left-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center mb-4">
          <Image
            src={'/gift/error.gif'}
            alt="Error Icon"
            width={70} 
            height={70} 
            className="animate-shake mr-3" 
          />
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <button 
          onClick={onClose} 
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
