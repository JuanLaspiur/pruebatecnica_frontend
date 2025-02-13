'use client';
import { useState, useEffect } from "react";
import { Task } from '@/components/TaskList'; 
import UpcomingTaskItem from "./subcomponents/upcomingtasks/UpcomingTaskItem"; 

interface UpcomingTasksProps {
  tasks: Task[];
  isDarkMode: boolean;
  language: string;
}

export default function UpcomingTasks({ tasks, isDarkMode, language }: UpcomingTasksProps) {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    const next7Tasks = tasks.slice(0, 7);
    setUpcomingTasks(next7Tasks);
  }, [tasks]);

  const getText = (key: string) => {
    const texts = {
      en: {
        title: 'Upcoming Tasks',
      },
      es: {
        title: 'Próximas Tareas',
      }
    };
    return texts[language]?.[key] || texts.en[key]; 
  };

  return (
    <div className={`max-w-md p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4">{getText('title')}</h2> 
      <ul className="rounded-md">
        {upcomingTasks.map((task) => (
          <UpcomingTaskItem key={task.id} task={task} isDarkMode={isDarkMode} language={language} />
        ))}
      </ul>
    </div>
  );
}

