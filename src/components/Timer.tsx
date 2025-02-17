'use client';

import { useTimer } from '@/hooks/useTimerHook';
import TimerButton from './buttons/timer/TimerButton';

interface TimerProps {
  isDarkMode: boolean;
  language: 'en' | 'es';  
}

const Timer = ({ isDarkMode, language }: TimerProps) => {
  const { seconds, isRunning, startTimer, stopTimer, resetTimer, formatTime } = useTimer();

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
