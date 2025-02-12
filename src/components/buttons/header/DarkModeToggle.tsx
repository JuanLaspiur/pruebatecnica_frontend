'use client';

import { useTheme } from '@/contexts/themeContext';
import { IoSunny, IoMoon } from 'react-icons/io5';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleClick = () => {
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center justify-between w-16 h-8 p-1 rounded-full transition-all duration-500 ease-in-out ${
        isDarkMode ? 'bg-gray-800' : 'bg-yellow-500'
      }`}
    >
      <IoSunny
        className={`absolute transition-all duration-500 ease-in-out ${isDarkMode ? '-left-2 opacity-0' : 'left-10 opacity-100'} text-yellow-600 text-xl`}
      />
      <IoMoon
        className={`absolute transition-all duration-500 ease-in-out ${isDarkMode ? 'left-10 opacity-100' : '-left-2 opacity-0'} text-white text-xl`}
      />
    </button>
  );
};

export default DarkModeToggle;


