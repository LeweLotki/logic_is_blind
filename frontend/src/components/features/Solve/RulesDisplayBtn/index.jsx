import React from 'react';

const RulesDisplayBtn = ({ onClick }) => {
    return (
        <button
            className="rules-popup-btn"
            onClick={onClick}
        >
            Show Rules
        </button>
    );
};

export default RulesDisplayBtn;
