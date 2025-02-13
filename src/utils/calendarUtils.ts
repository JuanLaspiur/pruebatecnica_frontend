export const generateCalendar = (currentDate: Date): (number | null)[][] => {
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
  