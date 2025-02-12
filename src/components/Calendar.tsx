'use client';

import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null); 
  const { language } = useLanguage();  
  const { isDarkMode } = useTheme(); 

  const daysOfWeek: string[] = language === 'es' 
    ? ["Lun", "Mar", "Miér", "Jue", "Vier", "Sáb", "Dom"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const getMonthName = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return currentDate.toLocaleString(language, options);
  };

  const generateCalendar = (): (number | null)[][] => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();

    const startDay = (startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1);

    const calendar: (number | null)[] = [];
    let currentDay = 1;

    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }

    for (let i = startDay; i < 7 && currentDay <= daysInMonth; i++) {
      calendar.push(currentDay++);
    }

    const weeks: (number | null)[][] = [];
    while (currentDay <= daysInMonth) {
      const week: (number | null)[] = [];
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        week.push(currentDay++);
      }
      weeks.push(week);
    }

    return [calendar, ...weeks];
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date().getDate()); 
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day); 
  };

  const calendar = generateCalendar();

  const getSelectedDate = () => {
    if (!selectedDay) return null;
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    
    let dateStr = selectedDate.toLocaleString(language, options);
  
    const parts = dateStr.split(' ');
    const dayOfWeek = parts[0];
    const month = parts[3];
  
    dateStr = dateStr.replace(dayOfWeek, dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1));
    dateStr = dateStr.replace(month, month.charAt(0).toUpperCase() + month.slice(1));
  
    return dateStr;
  };
  
  
  

  return (
    <>
    <div className={`max-w-lg mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousMonth} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'} rounded-full`}>←</button>
        <h2 className="text-xl font-semibold">
          {getMonthName().charAt(0).toUpperCase() + getMonthName().slice(1)} {currentDate.getFullYear()}
        </h2>
        <button onClick={goToNextMonth} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'} rounded-full`}>→</button>
      </div>
      
      <div className="text-center mb-4">
        <button
          onClick={goToToday}
          className={`px-4 py-2 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-green-500 text-white'} rounded-full hover:bg-green-600`}
        >
          {language === 'es' ? 'Hoy' : 'Today'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className={`font-small ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day}</div>
        ))}
        {calendar.flat().map((day, idx) => (
          <div
            key={idx}
            onClick={() => day && handleSelectDay(day)} 
            className={`p-2 ${day ? 
              `${isDarkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-100'} rounded-lg cursor-pointer ${selectedDay === day ? 'border-2 border-blue-500' : ''}` 
              : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
    {selectedDay && ( 
  <div className={`max-w-lg mx-auto p-4 mt-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} rounded-lg shadow-lg`}>
    <h3 className="text-lg font-semibold mb-2">
      {language === 'es' ? 'Día seleccionado:' : 'Selected Day:'}
    </h3>
    <p className="text-xl font-semibold text-gray-700">
      {getSelectedDate()}
    </p>
  </div>
)}

    </>
  );
};

export default Calendar;
