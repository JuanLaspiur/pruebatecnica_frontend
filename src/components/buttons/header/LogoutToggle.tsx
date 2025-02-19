'use client';

import { FiLogOut } from "react-icons/fi"; 
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authcontext";
import {useTranslations} from 'next-intl';


const LogoutToggle: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('header-todoPage');

  const handleLogout = () => {
    logout();
    router.push("/es/login"); 
  };

  return (
    <motion.button
      onClick={handleLogout}
      className="flex items-center text-red-500 hover:text-red-700"
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <FiLogOut className="mr-2" />
      <span className="hidden md:inline">{t('logOut')}</span>
    </motion.button>
  );
};

export default LogoutToggle;

