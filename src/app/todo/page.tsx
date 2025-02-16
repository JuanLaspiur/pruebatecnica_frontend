'use client';

import TaskList from "@/components/TaskList";
import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import { useAuth } from "@/contexts/authcontext";

export default function Home() {
    const { language } = useLanguage();
    const { isDarkMode } = useTheme();
    const { token } = useAuth();

  return (
      <TaskList language={language} isDarkMode={isDarkMode} token={token}/>
  );
}
