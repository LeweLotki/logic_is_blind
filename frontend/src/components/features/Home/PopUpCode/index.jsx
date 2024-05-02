import React from 'react';

const PopupCode = ({ onClose }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h2>Welcome to the LogicIsBlind!</h2>
        <p>This page was made to make available solving sudoku puzzles blindfolded to the public.</p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default PopupCode;
