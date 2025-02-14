'use client';

import { useState, useEffect } from 'react';
import TimerButton from './buttons/timer/TimerButton';

interface TimerProps {
  isDarkMode: boolean;
  language: 'en' | 'es';  
}

const Timer = ({ isDarkMode, language }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); 

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-md w-full mt-1 transition-all ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-medium">
          {language === 'es' ? 'Cronómetro' : 'Timer'}
        </h2>
      </div>
      
      <div className="text-2xl font-medium mb-3">
        <h2>{formatTime(seconds)}</h2>
      </div>
      
      <div className="flex gap-2">
        <TimerButton
          onClick={startTimer}
          icon="start"
          disabled={isRunning}
        />
        <TimerButton
          onClick={stopTimer}
          icon="stop"
          disabled={!isRunning}
        />
        <TimerButton
          onClick={resetTimer}
          icon="reset"
          disabled={false}
        />
      </div>
    </div>
  );
};

export default Timer;
