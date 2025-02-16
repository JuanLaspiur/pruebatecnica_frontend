'use client';

import { useState } from 'react';
import { generateCalendar } from '@/utils/calendarUtils';
import { getMonthName } from '@/utils/dateUtils';

interface UseCalendarProps {
  language: 'en' | 'es';
}

export const useCalendar = ({ language }: UseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  const calendar = generateCalendar(currentDate);
  const monthName = getMonthName(currentDate, language).charAt(0).toUpperCase() + getMonthName(currentDate, language).slice(1);

  return {
    currentDate,
    setCurrentDate,
    selectedDay,
    setSelectedDay,
    calendar,
    monthName
  };
};
