import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  onClick: () => void;
  buttonText: string;
  isDarkMode: boolean;
}

const AnimatedButton = ({ onClick, buttonText, isDarkMode }: AnimatedButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 text-sm lg:px-6 lg:py-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-r`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {buttonText}
    </motion.button>
  );
};

export default AnimatedButton;

