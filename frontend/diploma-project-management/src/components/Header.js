import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserDetails } from '../services/fetchUserDetails'; // Assuming the path is correct
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({ email: '', role: '' });

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userDetails = await fetchUserDetails();
          if (userDetails) {
            setUser(userDetails);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      const intervalId = setInterval(fetchUserData, 200);

      return () => clearInterval(intervalId);
    }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';

  return showHeader ? (
    <header className="header">
      <div className="container">
        <h1 className="logo">Платформа за дипломни работи</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Начало</Link></li>
            <li><Link to="/topic-selection">Теми</Link></li>
            <li><Link to="/advisor-selection">Ръководители</Link></li>
            <li><Link to="/tasks">Задачи и срокове</Link></li>
            <li>{user.email}<br/>{user.role}</li>
            <li><button onClick={logout} className="logout-button">Изход</button></li>
          </ul>
        </nav>
      </div>
    </header>
  ) : null;
}

export default Header;