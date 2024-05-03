import React from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const PopupCode = ({ onClose }) => {

  const userId = Cookies.get('user_id');

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h2>Welcome to the LogicIsBlind!</h2>
        <p>
          This app was made to make available solving sudoku puzzles blindfolded to the public.
          <br></br>
          Your current user token is:
          <br></br>
          {userId ? userId : "No token found"}
          <br></br>
          If you already have a token, you can use it to log in.
        </p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default PopupCode;
