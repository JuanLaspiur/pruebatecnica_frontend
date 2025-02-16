'use client';
import { DarkModeToggle, LanguageToggle, LogoutToggle} from "@/components/buttons";
import { User } from "@/contexts/authcontext"; 

interface HeaderProps {
  isDarkMode: boolean;
  user: User; 
  language: 'en' | 'es';  
}

export default function Header({ isDarkMode, user, language }: HeaderProps) { 
  return (
    <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} shadow-md p-2 px-4 flex justify-between items-center`}>
      <div className="flex space-x-3">
        <LanguageToggle />
        <DarkModeToggle />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-md font-medium">
          {language === 'es' ? 'Hola' : 'Hi'}, <span className="text-blue-500 px-2">{user?.name}</span>
        </span>
        <LogoutToggle />
      </div>
    </header>
  );
}
