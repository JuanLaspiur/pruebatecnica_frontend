'use client';

import { useLanguage } from "@/contexts/languageContext";
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LanguageToggleProps {
  cambiarIdioma: () => void; 
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ cambiarIdioma }) => {
  const { language } = useLanguage();

  return (
    <motion.button
      onClick={cambiarIdioma}
      className="px-2 py-1 bg-blue-500 text-white rounded-full flex items-center space-x-1"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {language === "es" ? (
        <Image
          src="/Flag_of_Argentina.png"
          alt="Flag of Argentina"
          width={16}
          height={16}
        />
      ) : (
        <Image
          src="/flaf_of_ee.uu.png"
          alt="Flag of United States"
          width={16}
          height={16}
        />
      )}
      <span className="ml-1 text-sm">{language === "es" ? "ES" : "EN"}</span>
    </motion.button>
  );
};

export default LanguageToggle;


