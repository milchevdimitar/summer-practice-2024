import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './TopicSelection.css';

function TopicSelection() {
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');

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

  const chooseTopic = async (topicId) => {
    try {
      const response = await api.put(`/topics/${topicId}`);
      setMessage(response.data.message);
      fetchTopics();
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Избор на тема</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            {topic.title} - {topic.approved ? 'Одобрено' : 'Неодобрено'}
            <button onClick={() => chooseTopic(topic.id)}>Избери</button>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TopicSelection;
