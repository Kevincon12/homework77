const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const port = 8000;

const dbPath = path.join(__dirname, 'db.json');

app.use(express.json());

const readMessages = () => {
    if (!fs.existsSync(dbPath)) return [];
    return JSON.parse(fs.readFileSync(dbPath));
};

app.get('/messages', (req, res) => {
    const messages = readMessages();
    res.send(messages);
});

app.post('/messages', (req, res) => {
    const { author, message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).send({ error: 'Message is required' });
    }

    const messages = readMessages();

    const newMessage = {
        id: randomUUID(),
        author: author && author.trim() !== '' ? author : 'Аноним',
        message,
        image: null
    };

    messages.push(newMessage);

    fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));

    res.send(newMessage);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});