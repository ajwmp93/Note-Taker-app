const express = require('express');
const path = require('path');
const { readDataFromFile, writeDataToFile } = require('./helpers/fsUtils.js');
const uniqid = require('uniqid');
const fs = require('fs');

const dbFilePath = path.join(__dirname, './db/db.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (!fs.existsSync(dbFilePath)) {
    console.log('No db.json file exists');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = readDataFromFile();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    };
    const notes = readDataFromFile();
    notes.push(newNote);

    writeDataToFile(notes);

    res.json(newNote);
});

app.listen(PORT, () => 
    console.log(`App listening on PORT ${PORT}`)
);
