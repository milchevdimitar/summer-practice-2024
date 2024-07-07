import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TopicSelection from './components/TopicSelection';
import AdvisorSelection from './components/AdvisorSelection';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import TopicManager from './components/TopicManager';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topic-selection" element={<TopicSelection />} />
          <Route path="/advisor-selection" element={<AdvisorSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/topic-manager" element={<TopicManager />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
