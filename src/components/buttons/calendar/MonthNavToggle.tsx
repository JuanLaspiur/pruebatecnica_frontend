import React, { Dispatch, SetStateAction } from 'react';

interface MonthNavToggleProps {
  direction: 'prev' | 'next';
  currentDate:Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  isDarkMode: boolean;
}

const MonthNavToggle: React.FC<MonthNavToggleProps> = ({ direction, currentDate, setCurrentDate, isDarkMode }) => {
  const arrow = direction === 'prev' ? '←' : '→';
  const buttonStyle = `px-3 py-1 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'} rounded-full`;

  const handleClick = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + ( direction === 'prev' ? -1 : 1), 1));
  };

  return (
    <button onClick={handleClick} className={buttonStyle}>
      {arrow}
    </button>
  );
};

export default MonthNavToggle;

