const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = path.join(__dirname, './db/db.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, '[]', 'utf8');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    };
    const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

    notes.push(newNote);

    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));

    res.json(newNote);
});

app.listen(PORT, () => 
    console.log(`App listening on PORT ${PORT}`)
);
