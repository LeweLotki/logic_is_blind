import React from 'react';

const SudokuGrid = ({ size, puzzle = null, puzzleColors = null }) => {
  // Default puzzle matrix with all zeros if not provided
  if (!puzzle) {
    puzzle = Array.from({ length: size }, () => Array(size).fill(0));
  }

  // Default puzzleColors matrix if not provided
  if (!puzzleColors) {
    puzzleColors = Array.from({ length: size }, () => Array(size).fill(0));
  }

  // Ensure the puzzle and puzzleColors size matches the expected size
  if (puzzle.length !== size || puzzle.some(row => row.length !== size) ||
      puzzleColors.length !== size || puzzleColors.some(row => row.length !== size)) {
    console.error("Puzzle size mismatch or PuzzleColors size mismatch");
    return <div>Invalid puzzle data or color data</div>;
  }

  return (
    <div className="sudoku-grid-container">
      <table className="sudoku-grid">
        <tbody>
          {puzzle.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                // Determine cell background color based on puzzleColors matrix
                const bgColor = puzzleColors[rowIndex][cellIndex] === 1 ? 'bg-gray-400' : 'bg-gray-600';
                return (
                  <td key={`cell-${rowIndex}-${cellIndex}`}
                      className={`sudoku-cell ${bgColor}`}>
                    {cell || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
