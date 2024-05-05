import React from 'react';

const SudokuGridBtn = ({ onClick }) => {
  return (
    <button className="rules-popup-btn" onClick={onClick}>
      Show Grid
    </button>
  );
};

export default SudokuGridBtn;
