import React, { createContext, useState, useContext } from 'react';

// Create Context
const TakenCellsContext = createContext([]);

// Custom hook to use context
export const useTakenCells = () => useContext(TakenCellsContext);

// Provider Component
export const TakenCellsProvider = ({ children }) => {
  const [takenCells, setTakenCells] = useState([]);

  // Value that will be passed to consumers
  const value = { takenCells, setTakenCells };

  return (
    <TakenCellsContext.Provider value={value}>
      {children}
    </TakenCellsContext.Provider>
  );
};
