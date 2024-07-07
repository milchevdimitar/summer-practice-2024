import React, { useState, useEffect } from 'react';
import '../styles/TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Логика за зареждане на задачите
  }, []);

  return (
    <div>
      <h2>Задачи и срокове</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Краен срок: {task.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
