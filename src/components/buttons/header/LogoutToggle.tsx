'use client';

import { FiLogOut } from "react-icons/fi"; 
import { motion } from 'framer-motion';
import { useLanguage } from "@/contexts/languageContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authcontext";

const LogoutToggle: React.FC = () => {
  const { logout } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); 
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
      {language === "es" ? "Cerrar sesión" : "Logout"}
    </motion.button>
  );
};

export default LogoutToggle;
