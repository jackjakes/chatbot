// chatbot.js
document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    addMessage('You', userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `sk-proj-lHzjINLDcjZvbxxH0OlqT3BlbkFJn6zlY8xkGjm1ifUAINks`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    addMessage('Chatbot', data.choices[0].text);
});

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    document.getElementById('messages').appendChild(messageElement);
}
