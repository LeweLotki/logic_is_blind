import React, { useState } from 'react';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';

import SolveForm from '../components/features/Solve/SolveForm/SolveForm';
import DigitalClockSolve from '../components/features/Solve/DigitalClockSolve';
import SudokuGrid from '../components/features/Solve/SudokuGrid';
import SudokuGridBtn from '../components/features/Solve/SudokuGridBtn';
import RulesDisplay from '../components/features/Solve/RulesDisplay';
import RulesDisplayBtn from '../components/features/Solve/RulesDisplayBtn';


function Solve() {

  const [showSudokuGrid, setShowSudokuGrid] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const toggleSudokuGrid = () => {
    setShowSudokuGrid(!showSudokuGrid);
  };

  const toggleRules = () => {
    setShowRules(!showRules);
};

  // Example props for SudokuGrid
  const exampleSize = 6; // Define the grid size
  const examplePuzzle = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    // Assume the rest of the rows are filled out
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
        <Logo />
        <Sidebar />
        <div className="flex justify-center items-center w-full" style={{ maxWidth: '1000px' }}>
            <RulesDisplay isVisible={showRules} />
            <div className="w-1/2 p-4 flex flex-col items-center">
                <DigitalClockSolve />
                <SolveForm />
                <div className="flex justify-center items-center gap-4 mt-4">
                    <RulesDisplayBtn onClick={toggleRules} />
                    <SudokuGridBtn onClick={toggleSudokuGrid} />
                </div>
                
            </div>
            {showSudokuGrid && <SudokuGrid size={exampleSize} puzzleColors={examplePuzzle} />}
        </div>
        <FooterBar />
    </div>
);
}

export default Solve;

