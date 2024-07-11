import React, { useState, useEffect } from 'react';
import { fetchSupervisors } from '../services/fetchHeads';
import '../styles/AdvisorSelection.css';

function AdvisorSelection() {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      const supervisors = await fetchSupervisors();
      setAdvisors(supervisors);
    };
    fetchAdvisors();
  }, []);

  return (
    <div className="container">
        <h2>Свободни научни ръководители</h2>
        <ul className="advisor-list">
            {advisors.map((advisor) => (
                <li key={advisor.id}>
                    <p>{advisor.email}</p>
                    <p>Технологии: #SQL #Python #JavaScript</p>
                    <button>Избери</button>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default AdvisorSelection;