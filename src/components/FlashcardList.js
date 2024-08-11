import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import Navigation from './Navigation';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(res => setFlashcards(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="flashcard-list">
      {flashcards.length > 0 && (
        <>
          <Flashcard flashcard={flashcards[currentIndex]} />
          <Navigation onNext={handleNext} onPrevious={handlePrevious} />
        </>
      )}
    </div>
  );
};

export default FlashcardList;
