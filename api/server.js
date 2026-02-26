const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { upload } = require('./multer');

const app = express();
const port = 8000;

const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const readMessages = () => {
    if (!fs.existsSync(dbPath)) return [];
    return JSON.parse(fs.readFileSync(dbPath));
};

app.get('/messages', (req, res) => {
    const messages = readMessages();
    res.send(messages);
});

app.post('/messages', upload.single('image'), (req, res) => {
    const { author, message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).send({ error: 'Message is required' });
    }

    const messages = readMessages();

    const newMessage = {
        id: randomUUID(),
        author: author && author.trim() !== '' ? author : 'Аноним',
        message,
        image: req.file ? `images/${req.file.filename}` : null,
    };

    messages.push(newMessage);

    fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));

    res.send(newMessage);
});

app.delete('/messages/:id', (req, res) => {
    const messages = readMessages();
    const newMessages = messages.filter(m => m.id !== req.params.id);
    fs.writeFileSync(dbPath, JSON.stringify(newMessages, null, 2));
    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});