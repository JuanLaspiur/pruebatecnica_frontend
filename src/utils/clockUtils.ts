export const formatClockTime = (date: Date) => {
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
  