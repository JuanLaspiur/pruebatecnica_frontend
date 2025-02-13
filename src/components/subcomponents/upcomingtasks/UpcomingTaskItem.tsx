'use client';

import { Task } from "@/components/TaskList";

interface UpcomingTaskItemProps {
  task: Task;
  isDarkMode: boolean;
}

export default function UpcomingTaskItem({ task, isDarkMode }: UpcomingTaskItemProps) {
  return (
    <li 
      className={`flex justify-between p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
    >
      <span>{task.text}</span>
      <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </span>
    </li>
  );
}
