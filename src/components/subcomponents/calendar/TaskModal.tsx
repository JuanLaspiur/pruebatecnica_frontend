import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { getFormattedSelectedDate } from '@/utils/dateUtils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  selectedDay: number;
  currentDate: Date;
  language: string;
  isDarkMode: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  taskTitle,
  setTaskTitle,
  selectedDay,
  currentDate,
  language,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
      <div className={`p-4 rounded-lg shadow-md max-w-md w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'}`}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaRegCalendarAlt />
          {language === 'es' ? 'Nueva tarea' : 'New Task'}
        </h3>
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
          {language === 'es' ? 'Tarea para el día:' : 'Task for the day:'} {getFormattedSelectedDate(selectedDay, currentDate, language)}
        </p>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder={language === 'es' ? 'Título de la tarea' : 'Task title'}
          className="w-full p-2 mb-4 border rounded-md text-gray-700"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="p-2 bg-gray-300 rounded-md">
            {language === 'es' ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            onClick={onSubmit}
            className={`p-2 bg-blue-500 text-white rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {language === 'es' ? 'Guardar' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
