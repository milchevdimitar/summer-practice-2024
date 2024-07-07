import React, { useState } from 'react';
import { register } from '../services/auth';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register(email, password, role);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имейл:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Парола:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Роля:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Ученик</option>
            <option value="admin">Администратор</option>
            <option value="advisor">Ръководител</option>
          </select>
        </label>
        <br />
        <button type="submit">Регистрация</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
