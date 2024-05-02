// src/contexts/PuzzleContext.js
import React, { useContext, useState } from 'react';

const PuzzleContext = React.createContext();

export const PuzzleProvider = ({ children }) => {
    const [puzzle, setPuzzle] = useState({});  // Changed from null to {}

    // Function to update the puzzle
    const updatePuzzle = (newPuzzle) => {
        setPuzzle(newPuzzle);
    };

    return (
        <PuzzleContext.Provider value={{ puzzle, updatePuzzle }}>
            {children}
        </PuzzleContext.Provider>
    );
};

export const usePuzzle = () => {
    const context = useContext(PuzzleContext);
    if (context === undefined) {
        throw new Error('usePuzzle must be used within a PuzzleProvider');
    }
    return context;
};

export default PuzzleContext;
