'use client';

import { Task } from "@/lib/task";
import { useTranslations } from "next-intl";

interface UpcomingTaskItemProps {
  task: Task;
  isDarkMode: boolean;
}

export default function UpcomingTaskItem({ task, isDarkMode }: UpcomingTaskItemProps) {

    const t = useTranslations('UpcomingTasks-todoPage'); 
  return (
    <li className={`flex justify-between mb-1 p-2 py-3 text-xs rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
      <span>{task.title}</span>
      <span className={` ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {task.completed ? t('completed_singular') : t('pending_singular')}
      </span>
    </li>
  );
}
