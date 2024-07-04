const apiBaseUrl = 'http://127.0.0.1:5000';

async function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();
    document.getElementById('registerMessage').innerText = data.message;
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    document.getElementById('loginMessage').innerText = data.message;

    if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        document.getElementById('topics').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
    }
}

async function fetchTopics() {
    const token = localStorage.getItem('access_token');

    const response = await fetch(`${apiBaseUrl}/topics`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';

    data.topics.forEach(topic => {
        const li = document.createElement('li');
        li.innerText = topic;
        topicsList.appendChild(li);
    });
}
