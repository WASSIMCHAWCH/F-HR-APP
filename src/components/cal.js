import React, { useEffect, useState } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [matricule, setMatricul] = useState('');
  const navigate = useNavigate();

  // Fetch matricul of the connected user
  const fetchUserMatricul = async () => {
    try {
      const res = await axios.get('http://localhost:5000/profilName');
      if (res.data.Status === "Success") {
        setMatricul(res.data.matricule);
      } else {
        navigate('/'); 
        console.log("Error fetching matricule");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch leave history using the matricul
  const fetchLeaveHistory = async (matricule) => {
    try {
      const response = await axios.get(`http://localhost:5000/history/${matricule}`);
      setLeaveHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching leave history:', error);
    }
  };

  useEffect(() => {
    fetchUserMatricul(); // Fetch user matricul on component mount
  }, []);

  useEffect(() => {
    if (matricule) {
      fetchLeaveHistory(matricule); // Fetch leave history only when matricule is available
    }
  }, [matricule]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Function to render leave descriptions in the calendar cells
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const leave = leaveHistory.find((item) => {
        const itemDate = new Date(item.date).toISOString().split('T')[0];
        const calendarDate = date.toISOString().split('T')[0];
        return itemDate === calendarDate;
      });
      return leave ? (
        <div className="leave-description">
          {leave.congeType} ({leave.delay} jour)
        </div>
      ) : null;
    }
  };

// Function to determine which tiles should be highlighted in red
const tileClassName = ({ date, view }) => {
  if (view === 'month') {
    const isFirstLeaveDay = leaveHistory.some((item) => {
      const startDate = new Date(item.date); // Get the start date of the leave
      return date.toDateString() === startDate.toDateString(); // Check if the date matches the start date
    });

    return isFirstLeaveDay ? 'leave-highlight' : null; // Apply the 'leave-highlight' class if it's the first leave day
  }
  return null;
};

return (
  <div className="calendar-container">
    <Calendar
      onChange={onChange}
      value={date}
      className="custom-calendar"
      tileContent={renderTileContent}
      tileClassName={tileClassName} // Use the updated tileClassName function
    />
  </div>
);
};

export default CalendarComponent;