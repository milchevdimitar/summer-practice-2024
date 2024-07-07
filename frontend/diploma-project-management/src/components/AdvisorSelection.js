import React, { useState, useEffect } from 'react';
import '../styles/AdvisorSelection.css';

function AdvisorSelection() {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    // Логика за зареждане на свободните ръководители
  }, []);

  return (
    <div>
      <h2>Избор на ръководител</h2>
      <ul>
        {advisors.map((advisor) => (
          <li key={advisor.id}>
            <h3>{advisor.name}</h3>
            <p>{advisor.bio}</p>
            <p>{advisor.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvisorSelection;
