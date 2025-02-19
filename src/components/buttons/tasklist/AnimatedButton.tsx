import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface AnimatedButtonProps {
  onClick: () => void;
  isDarkMode: boolean;
}

const AnimatedButton = ({ onClick, isDarkMode }: AnimatedButtonProps) => {
     const t = useTranslations('TaskList-todoPage');
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 text-sm lg:px-6 lg:py-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-r`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {t('add')}
    </motion.button>
  );
};

export default AnimatedButton;

