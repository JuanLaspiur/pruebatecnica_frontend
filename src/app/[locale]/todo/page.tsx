'use client';

import TaskList from "@/components/TaskList";
import { useTheme, useAuth } from '@/contexts';


export default function Home() {
    const { isDarkMode } = useTheme();
    const { token } = useAuth();

  return (
      <TaskList isDarkMode={isDarkMode} token={token}/>
  );
}
