// src/contexts/PuzzleContext.js
import React from 'react';

const PuzzleContext = React.createContext();

export const PuzzleProvider = ({ children, puzzle }) => {
    return (
        <PuzzleContext.Provider value={puzzle}>
            {children}
        </PuzzleContext.Provider>
    );
};

export const usePuzzle = () => {
    const context = React.useContext(PuzzleContext);
    if (context === undefined) {
        throw new Error('usePuzzle must be used within a PuzzleProvider');
    }
    return context;
};

export default PuzzleContext;
