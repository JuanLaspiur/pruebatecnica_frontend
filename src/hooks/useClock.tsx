import { useState, useEffect, useRef } from 'react';
import { formatClockTime } from '@/utils/clockUtils'; 
export const useClock = () => {
  const [time, setTime] = useState<string>('');
  const [timeWithoutZone, setTimeWithoutZone] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateTime = () => {
    const now = new Date();
    const { timeString, timeWithoutZoneString } = formatClockTime(now); 

    if (time !== timeString) {
      setTime(timeString);
    }
    if (timeWithoutZone !== timeWithoutZoneString) {
      setTimeWithoutZone(timeWithoutZoneString);
    }
  };

  useEffect(() => {
    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time, timeWithoutZone]);

  return { time, timeWithoutZone };
};
