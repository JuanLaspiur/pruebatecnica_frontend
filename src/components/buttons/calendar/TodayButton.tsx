'use client';

import { motion } from 'framer-motion';
import { useTheme } from "@/contexts/themeContext";

interface TodayButtonProps {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
  language: 'en' | 'es';
}

const TodayButton: React.FC<TodayButtonProps> = ({ setCurrentDate, setSelectedDay, language }) => {
  const { isDarkMode } = useTheme();
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date().getDate()); 
  };
  return (
    <motion.button
      onClick={goToToday}
      className={`p-2 text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-green-500 text-white'} rounded-full hover:bg-green-600`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {language === 'es' ? 'Hoy' : 'Today'}
    </motion.button>
  );
};

export default TodayButton;

