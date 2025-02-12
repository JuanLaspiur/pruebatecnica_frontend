'use client';

import { useState } from "react";
import { useAuth } from "@/contexts/authcontext";
import { FiLogOut } from "react-icons/fi"; 
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";
import { useLanguage } from "@/contexts/languageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    router.push("/login"); 
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`}>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-blue-500 text-white rounded-full"
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-blue-500 text-white rounded-full"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
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
