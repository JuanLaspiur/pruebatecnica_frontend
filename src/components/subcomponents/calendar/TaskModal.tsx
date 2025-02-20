
import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { getFormattedSelectedDate } from '@/utils/dateUtils';
import ErrorModal from '../common/ErrorModal';
import SuccessModal from '../common/SuccessModal';
import {useTranslations, useLocale} from 'next-intl';


interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  selectedDay: number | null;
  currentDate: Date;
  isDarkMode: boolean;
  isTaskSubmitted: boolean;
}

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  taskTitle,
  setTaskTitle,
  selectedDay,
  currentDate,
  isDarkMode,
  isTaskSubmitted,
}:TaskModalProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const t = useTranslations('TaskModal-todoPage');
  const locale = useLocale();
  if (!isOpen) return null;

  const handleTaskSubmit = async () => {
     onSubmit(); 
    if (isTaskSubmitted) {
      setIsSuccessModalOpen(true); 
    } else {
      setIsErrorModalOpen(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
        <div className={`p-4 rounded-lg shadow-md max-w-md w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'}`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaRegCalendarAlt />
            {t('newTask')}
          </h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
          {t('taskForTheDay')} {getFormattedSelectedDate(selectedDay, currentDate, locale)}
          
          </p>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder= {t('taskTitle')}
            className="w-full p-2 mb-4 border rounded-md text-gray-700"
          />
          <div className="flex justify-between">
            <button onClick={onClose} className="p-2 bg-gray-300 rounded-md">
            {t('cancel')}
            </button>
            <button
              onClick={handleTaskSubmit}
              className={`p-2 bg-blue-500 text-white rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          message={t('succesfully')}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal
          message={t('error')}
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskModal;
