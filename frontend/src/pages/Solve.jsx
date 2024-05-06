// Solve.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';

import SolveForm from '../components/features/Solve/SolveForm/SolveForm';
import DigitalClockSolve from '../components/features/Solve/DigitalClockSolve';
import SudokuGrid from '../components/features/Solve/SudokuGrid';
import SudokuGridBtn from '../components/features/Solve/SudokuGridBtn';
import RulesDisplay from '../components/features/Solve/RulesDisplay';
import RulesDisplayBtn from '../components/features/Solve/RulesDisplayBtn';

import { usePuzzle } from '../hooks/PreviewContext';

function Solve() {
  const [showSudokuGrid, setShowSudokuGrid] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [size, setSize] = useState(9);
  const [takenCells, setTakenCells] = useState([]);
  const { puzzle } = usePuzzle();

  const fetchTakenCells = async () => { // This method is now reusable
    const token = Cookies.get('user_id');
    if (token && puzzle && puzzle.id) {
      const queryParams = new URLSearchParams({ token, puzzle_id: puzzle.id });
      try {
        const response = await fetch(`http://localhost:8000/solve/get-cells?${queryParams}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          setTakenCells(data.taken_cells);
          setSize(data.taken_cells.length);
        } else {
          throw new Error('Failed to fetch taken cells');
        }
      } catch (error) {
        console.error('Error fetching initial taken cells:', error);
      }
    }
  };

  useEffect(() => {
    fetchTakenCells();
  }, [puzzle]);

  const toggleSudokuGrid = () => setShowSudokuGrid(!showSudokuGrid);
  const toggleRules = () => setShowRules(!showRules);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Logo />
      <Sidebar />
      <div className="flex justify-center items-center w-full" style={{ maxWidth: '1000px' }}>
        <RulesDisplay isVisible={showRules} />
        <div className="w-1/2 p-4 flex flex-col items-center">
          <DigitalClockSolve />
          <SolveForm onFormSubmit={fetchTakenCells} />
          <div className="flex justify-center items-center gap-4 mt-4">
            <RulesDisplayBtn onClick={toggleRules} />
            <SudokuGridBtn onClick={toggleSudokuGrid} />
          </div>
        </div>
        {showSudokuGrid && <SudokuGrid size={size} puzzleColors={takenCells} />}
      </div>
      <FooterBar />
    </div>
  );
}

export default Solve;
