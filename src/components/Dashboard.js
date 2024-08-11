import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(res => setFlashcards(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddFlashcard = () => {
    axios.post('http://localhost:5000/api/flashcards', newFlashcard)
      .then(res => {
        setFlashcards([...flashcards, res.data]);
        setNewFlashcard({ question: '', answer: '' });
      })
      .catch(err => console.error(err));
  };

  const handleUpdateFlashcard = (id) => {
    axios.put(`http://localhost:5000/api/flashcards/${id}`, newFlashcard)
      .then(res => {
        const updatedFlashcards = flashcards.map(f => (f.id === id ? res.data : f));
        setFlashcards(updatedFlashcards);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteFlashcard = (id) => {
    axios.delete(`http://localhost:5000/api/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(f => f.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <input type="text" placeholder="Question" value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })} />
      <input type="text" placeholder="Answer" value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })} />
      <button onClick={handleAddFlashcard}>Add Flashcard</button>

      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id}>
            {flashcard.question} - {flashcard.answer}
            <button onClick={() => handleUpdateFlashcard(flashcard.id)}>Edit</button>
            <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
