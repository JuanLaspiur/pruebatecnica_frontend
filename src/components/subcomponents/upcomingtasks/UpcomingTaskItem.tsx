'use client';

import { Task } from "@/components/TaskList";

interface UpcomingTaskItemProps {
  task: Task;
  isDarkMode: boolean;
  language: string;
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
    <li 
      className={`flex justify-between p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
    >
      <span>{task.text}</span>
      <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {getStatusText(task.completed)}
      </span>
    </li>
  );
}
