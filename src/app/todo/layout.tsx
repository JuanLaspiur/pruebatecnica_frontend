'use client';

import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import { useTheme } from "@/contexts/themeContext";
import UpcomingTasks from "@/components/UpcomingTasks";
import { useLanguage } from '@/contexts/languageContext';

// Lista de tareas hardcodeada
const hardcodedTasks = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
  { id: 3, text: "Task 3", completed: false },
  { id: 4, text: "Task 4", completed: true },
  { id: 5, text: "Task 5", completed: false },
  { id: 6, text: "Task 6", completed: true },
  { id: 7, text: "Task 7", completed: false },
  { id: 8, text: "Task 8", completed: false },
  { id: 9, text: "Task 9", completed: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage() as { language: "es" | "en" };
  

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col`}>
      <Header />
      <div className="flex flex-1">
        <aside className="w-1/4 p-4">
          <Calendar />
        </aside>
        <main className="w-2/4 flex p-4">
          {children}
        </main>
        <aside className="w-1/4 p-4">
          <UpcomingTasks tasks={hardcodedTasks} isDarkMode={isDarkMode} language={language}/>
        </aside>
      </div>
    </div>
  );
}


