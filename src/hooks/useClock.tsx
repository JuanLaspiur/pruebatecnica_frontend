import { useState, useEffect, useRef } from 'react';

export const useClock = () => {
  const [time, setTime] = useState<string>('');
  const [timeWithoutZone, setTimeWithoutZone] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;

    return {
      timeString: `${hours}:${minutes} ${ampm} ${date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}`,
      timeWithoutZoneString: `${hours}:${minutes} ${ampm}`
    };
  };

  const updateTime = () => {
    const now = new Date();
    const { timeString, timeWithoutZoneString } = formatTime(now);

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
