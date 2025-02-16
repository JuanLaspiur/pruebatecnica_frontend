'use client';
import { useState } from 'react';
import { generateCalendar } from '@/utils/calendarUtils';
import { daysOfWeek } from '@/utils/constants/daysOfWeek';
import { getMonthName } from '@/utils/dateUtils';

import TodayButton from "@/components/buttons/calendar/TodayButton";
import SelectedDay from '@/components/subcomponents/calendar/SelectedDay'; 
import MonthNavToggle from '@/components/buttons/calendar/MonthNavToggle';  
import CalendarGrid from '@/components/subcomponents/calendar/CalendarGrid';  

interface CalendarProps {
  isDarkMode: boolean;
  language: 'en' | 'es';
  token: string | null;  
}
const Calendar = ({isDarkMode, language, token }:CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate()); 

//
  const calendar = generateCalendar(currentDate);

  return (
    <>
    <div className="mb-2">
      <SelectedDay selectedDay={selectedDay} currentDate={currentDate} isDarkMode={isDarkMode} language={language} token={token}/>
      </div>
      <div className={`w-[100%] mx-auto p-2 md:p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
   <h2 className="text-lg lg:text-xl font-semibold w-full text-center">
  {getMonthName(currentDate, language).charAt(0).toUpperCase() + getMonthName(currentDate, language).slice(1)} {currentDate.getFullYear()}
</h2>

        <div className="flex items-center justify-between mb-4">
          <MonthNavToggle direction="prev" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
        
          <TodayButton setCurrentDate={setCurrentDate} setSelectedDay={setSelectedDay} /> 
          <MonthNavToggle direction="next" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
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
