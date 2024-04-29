import React, { useState } from 'react';
import { useFilter } from '../../hooks/FilterContext';

const Filter = () => {
    const [localDifficulty, setLocalDifficulty] = useState('');
    const { setDifficulty } = useFilter();

    const applyFilter = () => {
        setDifficulty(localDifficulty);
    };

    return (
        <div className="filter-container flex flex-col h-full">
          <div className="filter-header text-center p-4">
            <h3>Filter by:</h3>
          </div>
          <div className="filter-body flex-grow p-4 flex flex-col justify-center">
          <label className="filter-label" htmlFor="difficulty">Difficulty:</label>
            <select className="filter-select" value={localDifficulty} onChange={e => setLocalDifficulty(e.target.value)}>
                <option value="">All Difficulties</option>
                <option value="very easy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="very hard">Very Hard</option>
            </select>
            </div>
            <div className="filter-footer text-center p-4">
              <button className="apply-button" onClick={applyFilter}>Apply</button>
            </div>
        </div>
    );
};

export default Filter;

