import React, { useEffect, useState } from 'react';
import { usePuzzle } from "../../../../hooks/PreviewContext";
import fetchData from '../../../../utils/fetchData';

const Rules = () => {
  const { puzzle } = usePuzzle();  // Ensuring destructuring is correct
  const [rules, setRules] = useState('');

  useEffect(() => {
    console.log("Fetching rules for puzzle ID:", puzzle.id);  // Debugging output
    const url = `/serializer/pop-up?id=${puzzle.id}`;
    fetchData(url).then(data => {
      if (data && data.length > 0) {
        setRules(data[0].rules);
      } else {
        setRules("No rules available");  // Fallback text if no data is fetched
      }
    }).catch(error => {
      console.error("Failed to fetch rules:", error);
      setRules("Failed to load rules");
    });
  }, [puzzle.id]);  // Ensuring the effect runs on puzzle.id changes

  return (
    <div className="rules-container">
      <div className="rules-header">
        <h3>Rules of the puzzle</h3>
      </div>
      <div className="rules-body">
        <p>{rules}</p>
      </div>
    </div>
  );
};

export default Rules;
