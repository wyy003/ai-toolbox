const socket = io();

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

let currentUsername = '';

joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUsername = username;
        socket.emit('join', { username });
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send_message', { username: currentUsername, message });
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

socket.on('message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    if (data.username === 'System') {
        messageDiv.classList.add('system');
    }

    messageDiv.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('user_count', (data) => {
    document.getElementById('user-count').textContent = data.count;
});
