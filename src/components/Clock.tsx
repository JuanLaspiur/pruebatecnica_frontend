'use client';

import React from 'react';
import { useClock } from '@/hooks/useClock';

interface ClockProps {
  isDarkMode: boolean;
}

const Clock: React.FC<ClockProps> = ({ isDarkMode }) => {
  const { time, timeWithoutZone } = useClock();

  return (
    <div className={`flex items-center justify-center p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-3xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">
        {timeWithoutZone}  
        <span className="hidden lg:inline ml-2">{time.split(' ').slice(-1).join(' ')}</span>
      </h2>
    </div>
  );
};

export default Clock;
