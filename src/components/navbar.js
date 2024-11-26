import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const NavBar = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/profilName')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setName(res.data.name);
        } else {
          navigate('/');
          console.log('Error fetching name');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/logout')
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/dashboard">
          <img src="/assets/image/cytologo.png" alt="Logo" className="navbar-logo" />
        </Link>

        {/* Toggler Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Demande De Congé Dropdown (Hover Effect) */}
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button">
                Demande De Congé
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/Congee">
                    Congé par Jours
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/autorisation">
                    Autorisation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/maladie">
                    Maladie
                  </Link>
                </li>
              </ul>
            </li>

            {/* Historique Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/History">
                Historique
              </Link>
            </li>

            {/* Calendar Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/Calendar">
                Calendar
              </Link>
            </li>

            {/* Logout Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout {name}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
