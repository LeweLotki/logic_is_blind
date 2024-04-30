import React from 'react';

const InfoPopup = ({ onClose }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h2>Welcome to the Puzzle!</h2>
        <p>Please read this information carefully before you start solving the puzzle.</p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default InfoPopup;
