import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null); 

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [difficulty, setDifficulty] = useState('');

    return (
        <FilterContext.Provider value={{ difficulty, setDifficulty }}>
            {children}
        </FilterContext.Provider>
    );
};