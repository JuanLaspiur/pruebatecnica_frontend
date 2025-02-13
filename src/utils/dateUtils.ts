export const getFormattedSelectedDate = (selectedDay: number | null, currentDate: Date, language: string) => {
    if (!selectedDay) {
        return null;}
    
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    
    let dateStr = selectedDate.toLocaleString(language, options);
  
    const parts = dateStr.split(' ');
    const dayOfWeek = parts[0];
    const month = parts[3];
  
    dateStr = dateStr.replace(dayOfWeek, dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1));
    dateStr = dateStr.replace(month, month.charAt(0).toUpperCase() + month.slice(1));
    return dateStr;
  };



  export const getMonthName = (date: Date, language: string): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return date.toLocaleString(language, options);
  };