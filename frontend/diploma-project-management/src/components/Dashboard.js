import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { fetchUserDetails } from '../services/fetchUserDetails.js';

function Dashboard() {
  const [user, setUser] = useState({ email: '', role: '' });
  const navigate = useNavigate();

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
    fetchUserData();
  }, []); // Празен масив гарантира, че useEffect ще се изпълни само веднъж

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <p>Logged in as {user.email}, {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
      <section>
        <h2>Новини</h2>
        <p>Тук ще намерите последните новини.</p>
      </section>
    </div>
  );
}

export default Dashboard;
