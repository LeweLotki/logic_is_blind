import React, { useState } from 'react';
import { useFilter } from '../../../../hooks/FilterContext';

const Filter = () => {

  const [localDifficulty, setLocalDifficulty] = useState('');
  const [localSize, setLocalSize] = useState('');
  const [localStandard, setLocalStandard] = useState('');

  const { setDifficulty, setSize, setStandard } = useFilter();

  const applyFilter = () => {
      setDifficulty(localDifficulty);
      setSize(localSize);
      setStandard(localStandard);
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

            <label className="filter-label" htmlFor="size">Size:</label>
            <select className="filter-select" value={localSize} onChange={e => setLocalSize(e.target.value)}>
                <option value="">Any Size</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
                <option value="7">7x7</option>
                <option value="8">8x8</option>
                <option value="9">9x9</option>
            </select>
            
            <label className="filter-label" htmlFor="standard">Standard:</label>
            <select className="filter-select" value={localStandard} onChange={e => setLocalStandard(e.target.value)}>
                <option value="">Both</option>
                <option value="True">Standard</option>
                <option value="False">Non-Standard</option>
            </select>

            </div>
            <div className="filter-footer text-center p-4">
              <button className="apply-button" onClick={applyFilter}>Apply</button>
            </div>
        </div>
    );
};

export default Filter;

