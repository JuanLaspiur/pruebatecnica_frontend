'use client';

import { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const daysOfWeek: string[] = ["Lun", "Mar", "Miér", "Jue", "Vier", "Sáb", "Dom"];

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

  const calendar = generateCalendar();

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousMonth} className="px-3 py-1 bg-blue-500 text-white rounded-full">←</button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long' }).slice(1).toLowerCase()} {currentDate.getFullYear()}
        </h2>
        <button onClick={goToNextMonth} className="px-3 py-1 bg-blue-500 text-white rounded-full">→</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="font-small text-gray-700">{day}</div>
        ))}
        {calendar.flat().map((day, idx) => (
          <div
            key={idx}
            className={`p-2 ${day ? 'bg-gray-200 rounded-lg cursor-pointer hover:bg-blue-100' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
