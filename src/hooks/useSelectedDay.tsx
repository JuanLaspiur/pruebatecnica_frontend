import { useState } from 'react';
import { createTask2 } from '@/lib/task';

export const useSelectedDay = (selectedDay: number | null, currentDate: Date, language: 'es' | 'en', token: string | null) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState<string | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);

  if (!selectedDay) return null;

  const errorMessages = {
    es: 'Debe seleccionar un día posterior a la fecha actual para una tarea postergada.',
    en: 'You must select a day later than the current date.',
  };

  const handleAddTaskClick = () => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    if (selectedDate <= currentDate) {
      setErrorMessage(errorMessages[language]); 
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

  const handleTaskSubmit = async () => {
    if (taskTitle.trim() === "") return;

    const dueDate = taskDate ? new Date(taskDate) : undefined;
    const result = await createTask2(token, taskTitle, dueDate);
    setIsTaskSubmitted(result?._id ? true :false);

    handleModalClose();
  };

  return {
    isModalOpen,
    taskTitle,
    setTaskTitle,
    taskDate,
    errorModalOpen,
    errorMessage,
    handleAddTaskClick,
    handleModalClose,
    handleTaskSubmit,
    setErrorModalOpen, 
    isTaskSubmitted 
  };
};
