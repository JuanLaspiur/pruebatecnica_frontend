import React from 'react';
import { getFormattedSelectedDate } from '@/utils/dateUtils';

interface SelectedDayProps {
  selectedDay: number | null;
  currentDate: Date;
  isDarkMode: boolean;
  language: string;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ selectedDay, currentDate, isDarkMode, language }) => {
  if (!selectedDay) return null;

  return (
    <div className={`mx-auto p-2 mt-2 text-xs ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} rounded-md shadow-md`}>
      <h3 className="text-sm font-semibold mb-1">
        {language === 'es' ? 'Día seleccionado:' : 'Selected Day:'}
      </h3>
      <p className={`text-sm font-semibold ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
        {getFormattedSelectedDate(selectedDay, currentDate, language)}
      </p>
    </div>
  );
};

export default SelectedDay;
