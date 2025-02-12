'use client';

import { useLanguage } from "@/contexts/languageContext";
import { motion } from 'framer-motion';
import Image from 'next/image'; 

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-2 bg-blue-500 text-white rounded-full flex items-center space-x-2"
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }} 
      transition={{ type: "spring", stiffness: 300 }}
    >
      {language === "es" ? (
        <Image 
          src="/Flag_of_Argentina.png" 
          alt="Flag of Argentina" 
          width={20}  
          height={20}
        />
      ) : (
        <Image 
          src="/flaf_of_ee.uu.png" 
          alt="Flag of United States" 
          width={20}  
          height={20}
        />
      )}
      <span className="ml-2">{language === "es" ? "ES" : "EN"}</span>
    </motion.button>
  );
};

export default LanguageToggle;


