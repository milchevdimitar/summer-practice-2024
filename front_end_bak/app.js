const apiBaseUrl = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerButton').addEventListener('click', register);
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('fetchTopicsButton').addEventListener('click', fetchTopics);
    document.getElementById('createTopicButton').addEventListener('click', createTopic);

    if (userIsAdmin()) {
        document.getElementById('adminSection').style.display = 'block';
    } else {
        document.getElementById('userSection').style.display = 'block';
    }

    document.getElementById('chooseTopicButton').addEventListener('click', function() {
        const topicId = document.getElementById('topicId').value;
        if (topicId) {
            chooseTopic(topicId);
        } else {
            console.error('Topic ID is required');
        }
    });

    document.getElementById('abandonTopicButton').addEventListener('click', function() {
        const topicId = document.getElementById('abandonTopicId').value;
        if (topicId) {
            abandonTopic(topicId);
        } else {
            console.error('Topic ID is required');
        }
    });

    fetchTopics(); // This will load topics into either the admin or user section
});

window.userIsAdmin = function() {
    return localStorage.getItem('user_role') === 'admin';
};

window.logout = function() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    // Redirect to login page or update UI
    document.getElementById('topics').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('register').style.display = 'block';
    alert('You have been logged out.');
};

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

window.login = async function login() {
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
            localStorage.setItem('user_role', data.user_role);
            document.getElementById('currentUserEmail').innerText = email;
            document.getElementById('topics').style.display = 'block';
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('loginMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.fetchTopics = async function fetchTopics() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(`${apiBaseUrl}/topics`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';

    if (data && Array.isArray(data.topics)) {
        data.topics.forEach(topic => {
            const li = document.createElement('li');
            li.innerText = userIsAdmin() ?
                `${topic.title} - Student: ${topic.student_name} - Approved: ${topic.approved}` :
                `${topic.title} - Approved: ${topic.approved}`;
            topicsList.appendChild(li);
        });
    } else {
        console.error('data.topics is undefined or not an array');
    }
};

window.approveTopic = async function approveTopic(topicId) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${apiBaseUrl}/admin/topics/${topicId}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.message) {
            alert(data.message); // Or update the UI accordingly
        } else {
            console.error('Unexpected response:', data);
        }

        if (response.ok) {
            fetchTopics(); // Refresh the topics list to reflect the changes
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

window.rejectTopic = async function rejectTopic(topicId) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${apiBaseUrl}/admin/topics/${topicId}/reject`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.message) {
            alert(data.message); // Or update the UI accordingly
        } else {
            console.error('Unexpected response:', data);
        }

        if (response.ok) {
            fetchTopics(); // Refresh the topics list to reflect the changes
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

window.createTopic = async function createTopic() {
    try {
        const token = localStorage.getItem('access_token');
        const title = document.getElementById('topicTitle').value;
        const description = document.getElementById('topicDescription').value;

        const response = await fetch(`${apiBaseUrl}/topics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });

        const data = await response.json();
        if (data && data.message) {
            document.getElementById('createTopicMessage').innerText = data.message;
        } else {
            console.error('data.message is undefined');
        }

        if (response.ok) {
            fetchTopics();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('createTopicMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.chooseTopic = async function chooseTopic(topicId) {
    try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${apiBaseUrl}/topics/${topicId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.message) {
            document.getElementById('chooseTopicMessage').innerText = data.message;
        } else {
            console.error('data.message is undefined');
        }

        if (response.ok) {
            fetchTopics();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('chooseTopicMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.abandonTopic = async function abandonTopic(topicId) {
    try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${apiBaseUrl}/topics/${topicId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.message) {
            document.getElementById('abandonTopicMessage').innerText = data.message;
        } else {
            console.error('data.message is undefined');
        }

        if (response.ok) {
            fetchTopics();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('abandonTopicMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.proposeTopic = async function proposeTopic() {
    try {
        const token = localStorage.getItem('access_token');
        const title = document.getElementById('topicTitle').value;
        const description = document.getElementById('topicDescription').value;

        const response = await fetch(`${apiBaseUrl}/topics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });

        const data = await response.json();
        if (data && data.message) {
            document.getElementById('proposeTopicMessage').innerText = data.message;
        } else {
            console.error('data.message is undefined');
        }

        if (response.ok) {
            fetchTopics();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('proposeTopicMessage').innerText = 'An error occurred. Please try again.';
    }
}

window.approveTopic = async function approveTopic(topicId) {
    try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${apiBaseUrl}/admin/${topicId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.message) {
            document.getElementById('approveTopicMessage').innerText = data.message;
        } else {
            console.error('data.message is undefined');
        }

        if (response.ok) {
            fetchTopics();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('approveTopicMessage').innerText = 'An error occurred. Please try again.';
    }
}