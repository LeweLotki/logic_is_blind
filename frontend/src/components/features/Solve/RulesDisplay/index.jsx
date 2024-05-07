import React, { useEffect, useState } from 'react';
import { usePuzzle } from "../../../../hooks/PreviewContext";
import fetchData from '../../../../utils/fetchData';

const Rules = ({ isVisible }) => {
  const { puzzle } = usePuzzle();
  const [rules, setRules] = useState('');

  useEffect(() => {
    if (isVisible && puzzle && puzzle.id) { // Only fetch when component is visible and puzzle is defined
      console.log("Fetching rules for puzzle ID:", puzzle.id);  // Debugging output
      const url = `http:///serializer/pop-up?id=${puzzle.id}`;
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
    }
  }, [isVisible, puzzle.id]);  // Reacting to changes in visibility and puzzle.id

  return isVisible ? (  // Conditionally render content based on visibility
    <div className="rules-container">
      <div className="rules-header">
        <h3>Rules of the puzzle</h3>
      </div>
      <div className="rules-body">
        <p>{rules}</p>
      </div>
    </div>
  ) : null;  // Return null when not visible to avoid rendering the component
};

export default Rules;
