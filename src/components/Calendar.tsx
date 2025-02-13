'use client';

import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import { useState } from 'react';
import { generateCalendar } from '@/utils/calendarUtils';
import { daysOfWeek } from '@/utils/constants/daysOfWeek';
import { getMonthName } from '@/utils/dateUtils';

import TodayButton from "@/components/buttons/calendar/TodayButton";
import SelectedDay from '@/components/subcomponents/calendar/SelectedDay'; 
import MonthNavToggle from '@/components/buttons/calendar/MonthNavToggle';  
import CalendarGrid from '@/components/subcomponents/calendar/CalendarGrid';  


const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null); 
  // TO DO quitar de aqui
  const { language } = useLanguage() as { language: "es" | "en" };
  const { isDarkMode } = useTheme(); 
//
  const calendar = generateCalendar(currentDate);

  return (
    <>
    <div className="mb-4">
      <SelectedDay selectedDay={selectedDay} currentDate={currentDate} isDarkMode={isDarkMode} language={language} />
      </div>
      <div className={`w-[100%] mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <MonthNavToggle direction="prev" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
          
          <h2 className="text-xl font-semibold">
            {getMonthName(currentDate, language).charAt(0).toUpperCase() + getMonthName(currentDate, language).slice(1)} {currentDate.getFullYear()}
          </h2>
          
          <MonthNavToggle direction="next" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
        </div>

        <div className="text-center">
          <TodayButton setCurrentDate={setCurrentDate} setSelectedDay={setSelectedDay} /> 
        </div>
        <CalendarGrid 
          daysOfWeek={daysOfWeek[language] || daysOfWeek.en} 
          calendar={calendar} 
          isDarkMode={isDarkMode} 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
        />
      </div>

    </>
  );
};

export default Calendar;
