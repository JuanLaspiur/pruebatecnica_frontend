import React from "react";
import { isBefore, set } from "date-fns";

interface CalendarGridProps {
  daysOfWeek: string[];
  calendar: (number | null)[][];
  isDarkMode: boolean;
  selectedDay: number | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysOfWeek,
  calendar,
  isDarkMode,
  selectedDay,
  setSelectedDay,
}) => {
  const today = new Date(); // Fecha actual

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {daysOfWeek.map((day, idx) => (
        <div
          key={idx}
          className={`text-[10px] ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          {day}
        </div>
      ))}
      {calendar.flat().map((day, idx) => {
        if (day === null) return <div key={idx}></div>; 
        
        const date = set(today, { date: day }); 
        const isPast = isBefore(date, today); 

        return (
          <div
            key={idx}
            onClick={() => handleSelectDay(day)}
            className={`p-1 text-[10px] rounded-md cursor-pointer 
              ${isPast
                ? isDarkMode
                  ? "bg-gray-600 text-gray-400" 
                  : "bg-gray-300 text-gray-500" 
                : isDarkMode
                  ? "bg-gray-700 hover:bg-blue-600" 
                  : "bg-gray-200 hover:bg-blue-100"} // Días actuales/futuros en modo claro
              ${selectedDay === day ? "border border-blue-500" : ""}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
