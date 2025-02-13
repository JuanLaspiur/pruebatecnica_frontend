import React from 'react';
import { IconType } from 'react-icons';

interface FilterButtonProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  active: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ icon: Icon, label, onClick, active }) => {
  let buttonColor = '';

  if (label === 'Completed' || label === 'Completadas') {
    buttonColor = active ? 'text-green-500' : 'hover:text-green-500'; 
  } else if (label === 'Pending' || label === 'Pendientes') {
    buttonColor = active ? 'text-red-500' : 'hover:text-red-500'; 
  } else {
    buttonColor = active ? 'text-blue-500' : 'hover:text-blue-500'; 
  }

  return (
    <button 
      onClick={onClick} 
      className={`flex items-center ${buttonColor} 
       p-1 transition-colors min-w-20 w-auto justify-center`}
      title={label}
    >
      <Icon className="mr-1" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default FilterButton;
