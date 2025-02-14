'use client';

import { Task } from "@/components/TaskList";

interface UpcomingTaskItemProps {
  task: Task;
  isDarkMode: boolean;
  language: 'en' | 'es'; 
}

export default function UpcomingTaskItem({ task, isDarkMode, language }: UpcomingTaskItemProps) {

  const getStatusText = (completed: boolean) => {
    const texts = {
      en: {
        completed: 'Completed',
        pending: 'Pending',
      },
      es: {
        completed: 'Completada',
        pending: 'Pendiente',
      },
    };
    return completed ? texts[language]?.completed : texts[language]?.pending;
  };

  return (
    <li className={`flex justify-between mb-1 p-2 py-3 text-xs rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
      <span>{task.text}</span>
      <span className={` ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {getStatusText(task.completed)}
      </span>
    </li>
  );
}
