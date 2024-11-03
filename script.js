const db = firebase.database();
const chatWindow = document.getElementById('chat-window');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

// Отправка сообщения
sendBtn.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        db.ref('messages').push({
            username: username,
            message: message
        });
        messageInput.value = '';
    }
});

// Прослушивание новых сообщений
db.ref('messages').on('child_added', function(snapshot) {
    const data = snapshot.val();
    displayMessage(data.username, data.message);
});

// Функция отображения сообщения
function displayMessage(username, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');

    const usernameElem = document.createElement('strong');
    usernameElem.textContent = username;

    const messageElem = document.createElement('p');
    messageElem.textContent = message;

    messageDiv.appendChild(usernameElem);
    messageDiv.appendChild(messageElem);

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
