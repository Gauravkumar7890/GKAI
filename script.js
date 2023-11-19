// script.js

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const chatBox = document.getElementById('chatBox');

  const userMessage = messageInput.value;
  if (userMessage.trim() === '') return;

  appendMessage('You: ' + userMessage, 'user');

  fetch('/get-response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
  .then(response => response.json())
  .then(data => {
    const aiResponse = data.aiResponse || 'Sorry, I could not understand that.';
    
    appendMessage('GKAI: ' + aiResponse, 'gpt');
  })
  .catch(error => {
    console.error('Error:', error);
  });

  messageInput.value = '';
}

function appendMessage(message, sender) {
  const chatBox = document.getElementById('chatBox');
  const messageElement = document.createElement('div');
  messageElement.className = sender;
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);

  chatBox.scrollTop = chatBox.scrollHeight;
}
