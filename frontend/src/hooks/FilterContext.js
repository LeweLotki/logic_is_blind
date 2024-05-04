import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null); 

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [difficulty, setDifficulty] = useState('');
    const [size, setSize] = useState('');
    const [standard, setStandard] = useState('');

    return (
        <FilterContext.Provider value={{ difficulty, setDifficulty, size, setSize, standard, setStandard }}>
            {children}
        </FilterContext.Provider>
    );
};
