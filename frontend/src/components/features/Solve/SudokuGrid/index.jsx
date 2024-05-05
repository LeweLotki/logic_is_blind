import React from 'react';

const SudokuGrid = ({ size, puzzle }) => {
  // Ensure the puzzle size matches the expected size
  if (puzzle.length !== size || puzzle.some(row => row.length !== size)) {
    console.error("Puzzle size mismatch");
    return <div>Invalid puzzle data</div>;
  }

  return (
    <div className="sudoku-grid-container">
      <table className="sudoku-grid">
        <tbody>
          {puzzle.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`} className="sudoku-cell">
                  {cell || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
