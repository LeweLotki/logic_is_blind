import React, { useEffect, useState } from 'react';
import { usePuzzle } from "../../../../hooks/PreviewContext";
import fetchData from '../../../../utils/fetchData';


const InfoPopup = ({ onClose }) => {

    const puzzle = usePuzzle();
    const [rules, setRules] = useState('');

    useEffect(() => {

        const url = `http://localhost:8000/serializer/pop-up?id=${puzzle.id}`;
        fetchData(url).then(data => {
            setRules(data[0].rules);
            console.log("Full API response:", data);
        });
    }, [puzzle.id]);

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h2>Welcome to the Puzzle!</h2>
        <p>
            After closing this pop-up timer will start. Take time to rember the puzzle and the puzzle's rules. 
            {/* <br></br>
            <br></br>
            {rules} */}
        </p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default InfoPopup;
