import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import api from '../services/api'; // Assuming this is the path to your API service

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks'); // Adjust '/tasks' based on your API endpoint
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h2>Начало</h2>
      <p>Добре дошли в платформата за дипломни работи!</p>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h3>Вашите задачи</h3>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>{task.title} - {task.description}</li>
              ))}
            </ul>
          ) : (
            <p>Няма текущи задачи.</p>
          )}
        </section>
        <section className="dashboard-section">
          <h3>Последни новини</h3>
          <p>Останете информирани за последните новини и събития.</p>
          {/* Add more content or components related to news */}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;