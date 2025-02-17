'use client';

import TaskList from "@/components/TaskList";
import { useLanguage, useTheme, useAuth } from '@/contexts';


export default function Home() {
    const { language } = useLanguage();
    const { isDarkMode } = useTheme();
    const { token } = useAuth();

  return (
      <TaskList language={language} isDarkMode={isDarkMode} token={token}/>
  );
}
