'use client';

import { motion } from 'framer-motion';
import { useLanguage } from "@/contexts/languageContext";
import { useTheme } from "@/contexts/themeContext";

interface TodayButtonProps {
  onClick: () => void;
}

const TodayButton: React.FC<TodayButtonProps> = ({ onClick }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-green-500 text-white'} rounded-full hover:bg-green-600`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {language === 'es' ? 'Hoy' : 'Today'}
    </motion.button>
  );
};

export default TodayButton;
