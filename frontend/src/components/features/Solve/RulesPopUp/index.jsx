import React, { useState } from 'react';

const RulesPopUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [text, setText] = useState("Here are the details that you requested!");

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
