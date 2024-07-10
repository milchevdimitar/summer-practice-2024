import News from './News';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, login } from '../services/auth';
import { fetchUserDetails } from '../services/fetchUserDetails';

function Dashboard() {
return (
        <div className="dashboard">
        <News />
        </div>
    );
}

export default Dashboard;