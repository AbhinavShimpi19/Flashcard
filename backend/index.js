const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anu@#12345',
  database: 'flashcards_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err) => {
    if (err) throw err;
    res.status(201).send('Flashcard created');
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) throw err;
    res.send('Flashcard updated');
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Flashcard deleted');
  });
});


