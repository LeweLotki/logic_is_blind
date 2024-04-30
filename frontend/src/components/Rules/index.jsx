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
          console.log("Full API response:", data);
      });
  }, [puzzle.id]);

    return (
        <div className="filter-container flex flex-col h-full">
          <div className="filter-header text-center p-4">
            <h3>Rules of the puzzle</h3>
          </div>
          <div className="filter-body flex-grow p-4 flex flex-col justify-center">
            <p>
              Paragraf: {rules}
            </p>
          </div>
        </div>
    );
};

export default Rules;

