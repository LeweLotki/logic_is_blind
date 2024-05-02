import React, { useState, useEffect } from 'react';
import { usePuzzle } from "../../../../hooks/PreviewContext";
import fetchData from '../../../../utils/fetchData';

const RulesPopUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { puzzle } = usePuzzle();  // Assuming 'puzzle' here contains an 'id' field
    const [text, setText] = useState('');

    useEffect(() => {
        if (puzzle && puzzle.id) {
            const url = `http://localhost:8000/serializer/pop-up?id=${puzzle.id}`;
            fetchData(url).then(data => {
                if (data && data.length > 0) {
                    setText(data[0].rules);  // Assuming data is an array and the first item contains 'rules'
                } else {
                    setText("No rules available");  // Fallback text if no data is fetched
                }
            }).catch(error => {
                console.error("Failed to fetch rules:", error);
                setText("Failed to load rules");
            });
        }
    }, [puzzle.id]);  // Effect runs on changes to puzzle.id

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="rules-popup-container p-4">
            <button
                className="rules-popup-btn"
                onClick={toggleVisibility}
            >
                Show Rules
            </button>
            {isVisible && (
                <div className="rules-popup-body mt-4">
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
};

export default RulesPopUp;
