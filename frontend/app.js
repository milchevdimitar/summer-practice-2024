const apiBaseUrl = 'http://127.0.0.1:5000';

window.register = async function register() {
    try {
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
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('registerMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.register = async function login() {
    try {
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
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('loginMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.register = async function fetchTopics() {
    try {
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
    } catch (error) {
        console.error('An error occurred:', error);
    }
}