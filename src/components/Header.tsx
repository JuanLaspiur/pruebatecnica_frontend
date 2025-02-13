'use client';

import DarkModeToggle from "@/components/buttons/header/DarkModeToggle";
import LanguageToggle from "@/components/buttons/header/LanguageToggle";
import LogoutToggle from "@/components/buttons/header/LogoutToggle";

interface HeaderProps {
  isDarkMode: boolean;
}

export default function Header({ isDarkMode }: HeaderProps) {
  return (
    <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} shadow-md p-4 flex justify-between items-center`}>
      <div className="flex space-x-8">
        <LanguageToggle />
        <DarkModeToggle />
      </div>
      <LogoutToggle />
    </header>
  );
}
