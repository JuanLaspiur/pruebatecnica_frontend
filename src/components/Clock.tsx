'use client';

import React, { useState, useEffect } from 'react';

interface ClockProps {
  isDarkMode: boolean;
}

const Clock: React.FC<ClockProps> = ({ isDarkMode }) => {
  const [time, setTime] = useState<string>('');

  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';  
    hours = hours % 12; 
    hours = hours ? hours : 12; 
    const timeString = `${hours}:${minutes} ${ampm} ${now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}`;

    setTime(timeString);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-4xl font-semibold">{time}</h2>
    </div>
  );
};

export default Clock;
