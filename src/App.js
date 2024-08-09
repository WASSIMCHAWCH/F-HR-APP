import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import Calendar from './components/Calendar';
import History from './components/History';
import Login from './components/login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Your login logic
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login onClick={handleLogin} />} />
      </Routes>
      {isAuthenticated && <Footer />}
    </Router>
  );
};

export default App;