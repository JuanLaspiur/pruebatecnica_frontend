'use client';

import { FaCheckCircle, FaTimesCircle, FaFilter, FaRedo } from 'react-icons/fa';
import FilterButton from './buttons/upcomingtasks/FilterButton';
import UpcomingTaskItem from './subcomponents/upcomingtasks/UpcomingTaskItem';
import { Task } from '@/lib/task';
import { useUpcomingTasks } from '@/hooks/useUpcomingTasks';

interface UpcomingTasksProps {
  tasks: Task[];
  isDarkMode: boolean;
  language: 'en' | 'es';
  fetchAllTasks: () => void;
}

export default function UpcomingTasks({
  tasks,
  isDarkMode,
  language,
  fetchAllTasks,
}: UpcomingTasksProps) {
  const {
    filteredTasks,
    startDate,
    endDate,
    filterStatus,
    setFilterStatus,
    getText,
  } = useUpcomingTasks(tasks, language);

  return (
    <div
      className={`p-2 shadow-md rounded-md text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{getText('title')}</h2>
        <button className="text-gray-500 hover:text-gray-700 transition px-1" onClick={fetchAllTasks}>
          <FaRedo size={16} />
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-2">{`${startDate} - ${endDate}`}</p>
      <div className="mb-2 flex justify-between items-center w-full">
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

      <ul className="rounded-sm">
        {filteredTasks.map((task) => (
          <UpcomingTaskItem key={task._id} task={task} isDarkMode={isDarkMode} language={language} />
        ))}
      </ul>
    </div>
  );
}
