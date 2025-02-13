'use client';

import DarkModeToggle from "@/components/buttons/header/DarkModeToggle";
import LanguageToggle from "@/components/buttons/header/LanguageToggle";
import LogoutToggle from "@/components/buttons/header/LogoutToggle";
import { User } from "@/contexts/authcontext"; 

interface HeaderProps {
  isDarkMode: boolean;
  user: User; 
  language: 'en' | 'es';  
}

export default function Header({ isDarkMode, user, language }: HeaderProps) { 
  return (
    <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} shadow-md p-4 flex justify-between items-center`}>
      <div className="flex space-x-8">
        <LanguageToggle />
        <DarkModeToggle />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">
          {language === 'es' ? 'Hola' : 'Hi'}, <span className="text-blue-500 px-2">{user?.name}</span>
        </span>
        <LogoutToggle />
      </div>
    </header>
  );
}

