'use client';

import React, { useState, useEffect } from 'react';

interface ClockProps {
  isDarkMode: boolean;
}

const Clock: React.FC<ClockProps> = ({ isDarkMode }) => {
  const [time, setTime] = useState<string>('');
  const [timeWithoutZone, setTimeWithoutZone] = useState<string>('');

  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeString = `${hours}:${minutes} ${ampm} ${now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}`;

    const timeWithoutZoneString = `${hours}:${minutes} ${ampm}`;

    setTime(timeString);
    setTimeWithoutZone(timeWithoutZoneString);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-3xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">
        {timeWithoutZone}  
         <span className="hidden lg:inline ml-2 ">{time.split(' ').slice(-1).join(' ')}</span>
      </h2>

    </div>
  );
};

export default Clock;
