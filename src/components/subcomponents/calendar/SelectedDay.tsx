import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa'; 
import { getFormattedSelectedDate } from '@/utils/dateUtils';
import { Task } from "@/lib/task"; 
import ErrorModal from '../common/ErrorModal'; 

interface SelectedDayProps {
  selectedDay: number | null;
  currentDate: Date;
  isDarkMode: boolean;
  language: string;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ selectedDay, currentDate, isDarkMode, language }) => {
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

  const handleTaskSubmit = () => {
    if (taskTitle.trim() === "") return;

    const dueDate = taskDate ? new Date(taskDate) : undefined;

    const newTask: Task = {
      _id: Date.now().toString(),
      title: taskTitle,
      description: "",  
      dueDate,  
    };

    console.log("Nueva tarea:", newTask); 

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className={` ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} p-4 rounded-lg shadow-md max-w-md w-full`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaRegCalendarAlt />
  {language === 'es' ? 'Nueva tarea' : 'New Task'}
</h3>

            <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
             {language === 'es' ? 'Tarea para el día:' : 'Task for the day:'} {getFormattedSelectedDate(selectedDay, currentDate, language)}
            </p>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder={language === 'es' ? 'Título de la tarea' : 'Task title'}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleModalClose}
                className="p-2 bg-gray-300 rounded-md"
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleTaskSubmit}
                className={`p-2 bg-blue-500 text-white rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {language === 'es' ? 'Guardar' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

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
