import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { getFormattedSelectedDate } from '@/utils/dateUtils';
import { ErrorModal, TaskModal } from './subcomponents';
import { useSelectedDay } from '@/hooks/useSelectedDay';

interface SelectedDayProps {
  selectedDay: number | null;
  currentDate: Date;
  isDarkMode: boolean;
  language:  'es' | 'en';
  token: string | null;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ selectedDay, currentDate, isDarkMode, language, token }) => {
  const selectedDayData = useSelectedDay(selectedDay, currentDate, language , token);


  if (!selectedDayData) return null;

  const {
    isModalOpen,
    taskTitle,
    setTaskTitle,
    errorModalOpen,
    errorMessage,
    handleAddTaskClick,
    handleModalClose,
    handleTaskSubmit,
    setErrorModalOpen,
    isTaskSubmitted  
  } = selectedDayData;

  return (
    <div className={`mx-auto p-2 mt-2 text-xs ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} rounded-md shadow-md`}>
      <h3 className="text-sm font-semibold mb-1">
        {language === 'es' ? 'Día seleccionado:' : 'Selected Day:'}
      </h3>
      <p className={`text-sm font-semibold ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
        {getFormattedSelectedDate(selectedDay, currentDate, language)}
      </p>
      <button
        onClick={handleAddTaskClick}
        className={`mt-2 p-2 flex items-center gap-2 bg-blue-500 text-white rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        <FaRegCalendarAlt />
        {language === 'es' ? 'Agregar tarea postergada' : 'Add Task'}
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTaskSubmit}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        selectedDay={selectedDay}
        currentDate={currentDate}
        language={language}
        isDarkMode={isDarkMode}
        isTaskSubmitted={isTaskSubmitted}
        errorMessage={errorMessage}
      />

      {errorModalOpen && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default SelectedDay;
