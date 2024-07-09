import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';

  return showHeader ? (
    <header>
      <h1>Платформа за дипломни работи</h1>
      <nav>
        <ul>
          <li><Link to="/">Начало</Link></li>
          <li><Link to="/topic-selection">Избор на тема</Link></li>
          <li><Link to="/advisor-selection">Избор на ръководител</Link></li>
          <li><Link to="/tasks">Задачи и срокове</Link></li>
          <li><button onClick={logout}>Изход</button></li>
        </ul>
      </nav>
    </header>
  ) : null;
}

export default Header;