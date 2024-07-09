import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { fetchTasks } from '../services/taskService.js';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      let tasks = await fetchTasks();
      if (!Array.isArray(tasks)) {
        tasks = [];
      }
      setTasks(tasks);
    };
    getTasks();
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