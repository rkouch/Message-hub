import { generateCalendarDays, generateCalendarMonths } from "./Calendar";
import DayDetails from "./DayDetails";
import "./LoggedInHome.css";
import React from 'react';

export default function LoggedInHome() {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const calendarDays = generateCalendarDays();
    const calendaryMonths = generateCalendarMonths();
    return <>
        <div className="sidebar-container">
            <ul className="calendar-nav">
                
            </ul>
        </div>
        <DayDetails></DayDetails>
    </>
}