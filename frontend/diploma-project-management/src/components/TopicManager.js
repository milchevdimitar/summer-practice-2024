import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/TopicManager.css';

function TopicManager() {
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await api.get('/topics');
      setTopics(response.data.topics);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const approveTopic = async (topicId) => {
    try {
      const response = await api.put(`/admin/topics/${topicId}/approve`);
      setMessage(response.data.message);
      fetchTopics();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const rejectTopic = async (topicId) => {
    try {
      const response = await api.put(`/admin/topics/${topicId}/reject`);
      setMessage(response.data.message);
      fetchTopics();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Управление на теми</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            {topic.title} - Student: {topic.student_name} - Approved: {topic.approved ? 'Yes' : 'No'}
            <button onClick={() => approveTopic(topic.id)}>Одобри</button>
            <button onClick={() => rejectTopic(topic.id)}>Откажи</button>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TopicManager;
