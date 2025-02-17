import React, { Dispatch, SetStateAction } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface MonthNavToggleProps {
  direction: 'prev' | 'next';
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  isDarkMode: boolean;
}

const MonthNavToggle: React.FC<MonthNavToggleProps> = ({ direction, currentDate, setCurrentDate, isDarkMode }) => {
  const Icon = direction === 'prev' ? FaChevronLeft : FaChevronRight;
  const buttonStyle = `flex items-center justify-center px-3 py-2 text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'} rounded-full`;

  const handleClick = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'prev' ? -1 : 1), 1));
  };

  return (
    <button onClick={handleClick} className={buttonStyle}>
      <Icon size={14} />
    </button>
  );
};

export default MonthNavToggle;

