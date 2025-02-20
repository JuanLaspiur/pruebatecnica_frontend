'use client';
import { useCalendar } from '@/hooks/useCalendar';
import { daysOfWeek } from '@/utils/constants/daysOfWeek';
import { MonthNavToggle, TodayButton } from '@/components/buttons';
import { CalendarGrid } from '@/components/subcomponents';
import { useLocale} from 'next-intl';
import SelectedDay from './SelectedDay';

interface CalendarProps {
  isDarkMode: boolean;
  token: string | null;
}

const Calendar = ({ isDarkMode, token }: CalendarProps) => {
  const locale = useLocale() as'es'|'en';
  const { currentDate, setCurrentDate, selectedDay, setSelectedDay, calendar, monthName } = useCalendar({ language:locale });

  return (
    <>
      <div className="mb-2">
        <SelectedDay selectedDay={selectedDay} currentDate={currentDate} isDarkMode={isDarkMode} language={locale} token={token} />
      </div>
      <div className={`w-[100%] mx-auto p-2 md:p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}>
        <h2 className="text-lg lg:text-xl font-semibold w-full text-center">
          {monthName} {currentDate.getFullYear()}
        </h2>

        <div className="flex items-center justify-between mb-4">
          <MonthNavToggle direction="prev" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
          <TodayButton setCurrentDate={setCurrentDate} setSelectedDay={setSelectedDay} language={locale}/>
          <MonthNavToggle direction="next" currentDate={currentDate} setCurrentDate={setCurrentDate} isDarkMode={isDarkMode} />
        </div>

        <CalendarGrid 
          daysOfWeek={daysOfWeek[locale] || daysOfWeek.en} 
          calendar={calendar} 
          isDarkMode={isDarkMode} 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
        />
      </div>
    </>
  );
};

export default Calendar;

