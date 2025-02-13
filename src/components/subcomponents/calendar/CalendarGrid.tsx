import React from 'react';

interface CalendarGridProps {
  daysOfWeek: string[];
  calendar: (number | null)[][];
  isDarkMode: boolean;
  selectedDay: number | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ daysOfWeek, calendar, isDarkMode, selectedDay, setSelectedDay }) => {

  const handleSelectDay = (day: number) => {
    setSelectedDay(day); 
  };

  return (
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
  );
};

export default CalendarGrid;