// CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './CalendarComponent.css'; // Import custom styles for further customization

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = newDate => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">Select a Date</h2>
      <Calendar 
        onChange={onChange} 
        value={date} 
        className="custom-calendar"
        tileClassName={({ date, view }) => (view === 'month' && date.getDay() === 0 ? 'highlight' : null)} // Highlight Sundays
      />
      <div className="date-info">
        <h3>Selected Date:</h3>
        <p>{date.toDateString()}</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
