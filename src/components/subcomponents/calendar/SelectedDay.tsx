import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa'; 
import { getFormattedSelectedDate } from '@/utils/dateUtils';
import { Task } from "@/lib/task"; 
import ErrorModal from '../common/ErrorModal'; 
import TaskModal from './TaskModal'; 
import { createTask2 } from '@/lib/task';

interface SelectedDayProps {
  selectedDay: number | null;
  currentDate: Date;
  isDarkMode: boolean;
  language: string;
  token: string | null;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ selectedDay, currentDate, isDarkMode, language, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState<string | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);  
  const [errorMessage, setErrorMessage] = useState("");  

  if (!selectedDay) return null;

  const handleAddTaskClick = () => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    if (selectedDate <= currentDate) {
      setErrorMessage(language === 'es' ? 'Debe seleccionar un día posterior a la fecha actual para una tarea postergada.' : 'You must select a day later than the current date.');
      setErrorModalOpen(true); 
      return; 
    }

    setTaskDate(selectedDate.toISOString());
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
    setTaskTitle("");
  };

  const handleTaskSubmit = async() => {
    if (taskTitle.trim() === "") return;

    const dueDate = taskDate ? new Date(taskDate) : undefined;

   const result = await createTask2(token, taskTitle, dueDate)
    console.log("Nueva tarea:", result); 

    handleModalClose();
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false); 
  };

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
      />

      {errorModalOpen && (
        <ErrorModal 
          message={errorMessage}
          onClose={closeErrorModal}
        />
      )}
    </div>
  );
};

export default SelectedDay;
