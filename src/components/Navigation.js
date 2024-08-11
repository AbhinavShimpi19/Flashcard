import React from 'react';

const Navigation = ({ onNext, onPrevious }) => {
  return (
    <div className="navigation">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Navigation;
