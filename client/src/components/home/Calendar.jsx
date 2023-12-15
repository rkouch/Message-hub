export function generateCalendarDays() {
    function daysInMonth(month, year) {
        return new Date(year,month, 0).getDate();
    }

    const calendarDays = []; 

    for (let month = 1; month <= 12; month++) {
        const daysInCurrentMonth = daysInMonth(month, 2024); 

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            const formattedMonth = month < 10 ? `0${month}` : `${month}`; 
            const date = `${formattedDay}-${formattedMonth}-2024`;
            calendarDays.push(date);
        }
    }
    return calendarDays;
}

export function generateCalendarMonths() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
}