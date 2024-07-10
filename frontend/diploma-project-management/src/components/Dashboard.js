import News from './News';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, login } from '../services/auth';
import { fetchUserDetails } from '../services/fetchUserDetails';

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
  }, []);

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
        <News /> {/* This line adds the News component to the Dashboard */}
      </section>
    </div>
  );
}

export default Dashboard;