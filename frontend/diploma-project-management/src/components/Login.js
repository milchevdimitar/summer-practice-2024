import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user_role', response.data.user_role);
      navigate('/dashboard');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
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
        <button type="submit">Вход</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
