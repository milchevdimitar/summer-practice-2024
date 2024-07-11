import React, { useState } from 'react';
import '../styles/TopicSelection.css';

function TopicSelection() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log({ topic, description, supervisor });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">Тема</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="supervisor">Дипломен ръководител</label>
          <input
            id="supervisor"
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Предложи за одобрение</button>
      </form>
    </div>
  );
}

export default TopicSelection;
