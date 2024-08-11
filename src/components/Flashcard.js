import React, { useState } from 'react';

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="flashcard-content">
        {isFlipped ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
};

export default Flashcard;
