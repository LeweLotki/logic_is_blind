import React, { useState, useEffect } from 'react';
import { usePuzzle } from "../../../../hooks/PreviewContext";
import fetchData from '../../../../utils/fetchData';

const RulesDisplay = ({ isVisible }) => {
    const { puzzle } = usePuzzle();
    const [text, setText] = useState('');

    useEffect(() => {
        if (isVisible && puzzle && puzzle.id) {
            const url = `http://localhost:8000/serializer/pop-up?id=${puzzle.id}`;
            fetchData(url).then(data => {
                if (data && data.length > 0) {
                    setText(data[0].rules);  // Assuming data is an array and the first item contains 'rules'
                } else {
                    setText("No rules available");
                }
            }).catch(error => {
                console.error("Failed to fetch rules:", error);
                setText("Failed to load rules");
            });
        }
    }, [isVisible, puzzle.id]); // Effect runs on visibility and puzzle.id changes

    return isVisible && (
        <div className="rules-popup-body mt-4 p-4 bg-gray-800 text-white rounded">
            <p>{text}</p>
        </div>
    );
};

export default RulesDisplay;
