'use client';

import Calendar from "@/components/Calendar";
import DarkModeToggle from "@/components/buttons/header/DarkModeToggle";
import LanguageToggle from "@/components/buttons/header/LanguageToggle"; 
import { useTheme } from "@/contexts/themeContext";
import LogoutToggle from "@/components/buttons/header/LogoutToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`}>
      <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} shadow-md p-4 flex justify-between items-center `}>
        <div className="flex space-x-8">
          <LanguageToggle/>
          <DarkModeToggle/>
        </div>
       <LogoutToggle/>
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
