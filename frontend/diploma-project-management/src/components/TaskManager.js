import React, { useState, useEffect } from 'react';
import '../styles/TaskManager.css';
import { fetchTasks } from '../services/taskService';

function TaskManager() {
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