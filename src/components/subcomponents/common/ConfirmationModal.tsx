import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { useLocale } from 'next-intl';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onClose }) => {
  const locale = useLocale(); 
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  const title = locale === 'es' ? 'Advertencia' : 'Warning';
  const confirmText = locale === 'es' ? 'Confirmar' : 'Confirm';
  const cancelText = locale === 'es' ? 'Cancelar' : 'Cancel';

  return (
    <div
      className="w-full h-full absolute z-10 flex items-center justify-center bg-black bg-opacity-50 top-0 left-0"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center mb-4">
          <AiOutlineWarning className="text-yellow-600 text-4xl mr-3" />
          <h2 className="text-xl font-semibold text-yellow-600">{title}</h2> 
        </div>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {confirmText} 
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {cancelText} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
