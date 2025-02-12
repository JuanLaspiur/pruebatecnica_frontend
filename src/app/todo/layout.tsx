'use client';

import { useAuth } from "@/contexts/authcontext";
import { FiLogOut } from "react-icons/fi"; 
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageToggle from "@/components/LanguageToggle"; ""
import { useLanguage } from "@/contexts/languageContext";
import { useTheme } from "@/contexts/themeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); 
  };


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`}>
      <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} shadow-md p-4 flex justify-between items-center `}>
        <div className="flex space-x-8">
          <LanguageToggle/>
          <DarkModeToggle/>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <FiLogOut className="mr-2" />
          {language === "es" ? "Cerrar sesión" : "Logout"}
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-1/4 p-4">
          <Calendar />
        </aside>
        <main className="flex-1 flex p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
