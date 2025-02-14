'use client';
import { useState, useEffect } from "react";
import { Task } from '@/components/TaskList'; 
import UpcomingTaskItem from "./subcomponents/upcomingtasks/UpcomingTaskItem"; 
import { UPCOMING_TASKS_TITLE } from "@/utils/constants/UpcomingTasksConstants";
import { FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa'; 
import FilterButton from './buttons/upcomingtasks/FilterButton';

interface UpcomingTasksProps {
  tasks: Task[];
  isDarkMode: boolean;
  language: 'en' | 'es';  
}

export default function UpcomingTasks({ tasks, isDarkMode, language }: UpcomingTasksProps) {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all'); 

  useEffect(() => {
    setUpcomingTasks(tasks.slice(0, 5)); // Reduce a 5 tareas
  }, [tasks]);

  const getText = (key: keyof typeof UPCOMING_TASKS_TITLE['en']) => {  
    return UPCOMING_TASKS_TITLE[language]?.[key] || UPCOMING_TASKS_TITLE.en[key]; 
  };

  const filteredTasks = upcomingTasks.filter((task) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return task.completed;
    if (filterStatus === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className={`p-2 shadow-md rounded-md text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-semibold mb-2">{getText('title')}</h2> 

      <div className="mb-2 flex gap-2 items-center">
        <FilterButton icon={FaFilter} label={language === 'es' ? 'Todas' : 'All'} onClick={() => setFilterStatus('all')} active={filterStatus === 'all'} />
        <FilterButton icon={FaCheckCircle} label={language === 'es' ? 'Completadas' : 'Completed'} onClick={() => setFilterStatus('completed')} active={filterStatus === 'completed'} />
        <FilterButton icon={FaTimesCircle} label={language === 'es' ? 'Pendientes' : 'Pending'} onClick={() => setFilterStatus('pending')} active={filterStatus === 'pending'} />
      </div>

      <ul className="rounded-sm">
        {filteredTasks.map((task) => (
          <UpcomingTaskItem key={task.id} task={task} isDarkMode={isDarkMode} language={language} />
        ))}
      </ul>
    </div>
  );
}
