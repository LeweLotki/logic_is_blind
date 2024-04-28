import React, { useState } from 'react';

const Filter = () => {
  const [difficulty, setDifficulty] = useState('');
  const [mode, setMode] = useState('');
  const [author, setAuthor] = useState('');

  return (
    <div className="filter-container flex flex-col h-full">
      <div className="filter-header text-center p-4">
        <h3>Filter by:</h3>
      </div>
      <div className="filter-body flex-grow p-4 flex flex-col justify-center">
        <label className="filter-label" htmlFor="difficulty">Difficulty:</label>
        <select className="filter-select" id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          <option value="very_easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very_hard">Very Hard</option>
        </select>

        <label className="filter-label" htmlFor="mode">Mode:</label>
        <select className="filter-select" id="mode" value={mode} onChange={e => setMode(e.target.value)}>
          <option value="">Select Mode</option>
          <option value="standard">Standard</option>
          <option value="non_standard">Non-Standard</option>
        </select>

        <label className="filter-label" htmlFor="author">Author:</label>
        <select className="filter-select" id="author" value={author} onChange={e => setAuthor(e.target.value)}>
          <option value="">Select Author</option>
          <option value="author1">Author 1</option>
          <option value="author2">Author 2</option>
        </select>
      </div>
      <div className="filter-footer text-center p-4">
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

export default Filter;
