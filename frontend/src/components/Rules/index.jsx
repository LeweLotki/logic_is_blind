import React, { useEffect, useState } from 'react';
import { usePuzzle } from "../../hooks/PreviewContext";
import fetchData from '../../utils/fetchData';


const Rules = () => {

  const puzzle = usePuzzle();
  const [rules, setRules] = useState('');

  useEffect(() => {

      const url = `http://localhost:8000/serializer/pop-up?id=${puzzle.id}`;
      fetchData(url).then(data => {
          setRules(data[0].rules);
          // console.log("Full API response:", data);
      });
  }, [puzzle.id]);

    return (
        <div className="rules-container">
          <div className="rules-header">
            <h3>Rules of the puzzle</h3>
          </div>
          <div className="rules-body">
            <p>
              <br></br>
              {rules}
              <br></br>
            </p>
          </div>
        </div>
    );
};

export default Rules;

