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
    const next7Tasks = tasks.slice(0, 7);
    setUpcomingTasks(next7Tasks);
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
    <div className={`max-w-md p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4">{getText('title')}</h2> 

      {/* Filtros con FilterButton */}
      <div className="mb-4 flex gap-4 items-center">
        <FilterButton 
          icon={FaFilter} 
          label={language === 'es' ? 'Todas' : 'All'} 
          onClick={() => setFilterStatus('all')} 
          active={filterStatus === 'all'} 
        />
        <FilterButton 
          icon={FaCheckCircle} 
          label={language === 'es' ? 'Completadas' : 'Completed'} 
          onClick={() => setFilterStatus('completed')} 
          active={filterStatus === 'completed'} 
        />
        <FilterButton 
          icon={FaTimesCircle} 
          label={language === 'es' ? 'Pendientes' : 'Pending'} 
          onClick={() => setFilterStatus('pending')} 
          active={filterStatus === 'pending'} 
        />
      </div>

      <ul className="rounded-md">
        {filteredTasks.map((task) => (
          <UpcomingTaskItem key={task.id} task={task} isDarkMode={isDarkMode} language={language} />
        ))}
      </ul>
    </div>
  );
}
