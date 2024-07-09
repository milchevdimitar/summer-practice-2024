import React, { useState } from 'react';
import '../styles/Login.css';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const success = await login(email, password);
        if (success) {
          navigate('/');
        } else {
          setMessage('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        setMessage(`An error occurred: ${error.message}. Please try again.`);
        console.error('An error occurred:', error);
      }
    };

  return (
    <div className="form-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Вход</button>
      </form>
    </div>
  );
}

export default Login;
