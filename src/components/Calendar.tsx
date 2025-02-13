'use client';

import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import { useState } from 'react';
import TodayButton from "@/components/buttons/calendar/TodayButton";
import SelectedDay from '@/components/subcomponents/calendar/SelectedDay'; 
import MonthNavToggle from '@/components/buttons/calendar/MonthNavToggle';  
import CalendarGrid from '@/components/subcomponents/calendar/CalendarGrid';  

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




  const calendar = generateCalendar();

  return (
    <>
      <div className={`max-w-lg mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <MonthNavToggle direction="prev" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
          
          <h2 className="text-xl font-semibold">
            {getMonthName().charAt(0).toUpperCase() + getMonthName().slice(1)} {currentDate.getFullYear()}
          </h2>
          
          <MonthNavToggle direction="next" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
        </div>

        <div className="text-center mb-4">
          <TodayButton  setCurrentDate={setCurrentDate} setSelectedDay={setSelectedDay} /> 
        </div>

        <CalendarGrid 
          daysOfWeek={daysOfWeek} 
          calendar={calendar} 
          isDarkMode={isDarkMode} 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
        />
      </div>

      <SelectedDay selectedDay={selectedDay} currentDate={currentDate} isDarkMode={isDarkMode} language={language} />
    </>
  );
};

export default Calendar;
