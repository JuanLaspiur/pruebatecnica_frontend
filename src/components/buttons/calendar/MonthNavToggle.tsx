import React from 'react';

interface MonthNavToggleProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  isDarkMode: boolean;
}

const MonthNavToggle: React.FC<MonthNavToggleProps> = ({ direction, onClick, isDarkMode }) => {
  const arrow = direction === 'prev' ? '←' : '→';
  const buttonStyle = `px-3 py-1 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'} rounded-full`;

  return (
    <button onClick={onClick} className={buttonStyle}>
      {arrow}
    </button>
  );
};

export default MonthNavToggle;
