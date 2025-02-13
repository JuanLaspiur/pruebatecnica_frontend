'use client';

import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import { useTheme } from "@/contexts/themeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`}>
      <Header />
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

