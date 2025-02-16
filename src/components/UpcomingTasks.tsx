'use client';
import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns"; 
import { Task } from "@/lib/task"; 
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
  const startDate = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'dd/MM'); 
const endDate = format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'dd/MM');
useEffect(() => {
  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

  const upcomingThisWeek = tasks.filter(task => {
    if (!task.dueDate) return false;

    const taskDueDate = typeof task.dueDate === "string" ? new Date(task.dueDate) : task.dueDate;

    return taskDueDate >= startOfWeekDate && taskDueDate <= endOfWeekDate;
  });

  setUpcomingTasks(upcomingThisWeek.slice(0, 5));
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
      <h2 className="text-lg font-semibold ">{getText('title')}</h2> 
      <p className="text-xs text-gray-500 mb-2">{`${startDate} - ${endDate}`}</p>
     <div className="mb-2 flex justify-between items-center w-full">
        <FilterButton icon={FaFilter} label={language === 'es' ? 'Todas' : 'All'} onClick={() => setFilterStatus('all')} active={filterStatus === 'all'} />
        <FilterButton icon={FaCheckCircle} label={language === 'es' ? 'Completadas' : 'Completed'} onClick={() => setFilterStatus('completed')} active={filterStatus === 'completed'} />
        <FilterButton icon={FaTimesCircle} label={language === 'es' ? 'Pendientes' : 'Pending'} onClick={() => setFilterStatus('pending')} active={filterStatus === 'pending'} />
      </div>

      <ul className="rounded-sm"> 
        {filteredTasks.map((task) => (
          <UpcomingTaskItem key={task._id} task={task} isDarkMode={isDarkMode} language={language} />
        ))}
      </ul>
    </div>
  );
}
