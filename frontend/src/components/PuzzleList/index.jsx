import React, { useEffect, useState } from 'react';
import PuzzleItem from './PuzzleItem';

const PuzzleList = () => {
  const [puzzles, setPuzzles] = useState([]);  // Initialize state for puzzles

  useEffect(() => {
    // Fetch puzzles from your Flask API
    fetch('http://localhost:8000/serializer/puzzle-list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPuzzles(data);  // Set the fetched puzzles into state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);  // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="puzzle-list rounded-lg shadow-lg overflow-hidden my-4">
      {puzzles.map((puzzle, index) => (
        <PuzzleItem key={index} puzzle={puzzle} />
      ))}
      <div className="pagination-controls py-2 flex justify-center">
        <button className="page-control-btn mx-2">&lt;</button>
        <button className="page-control-btn mx-2">&gt;</button>
      </div>
    </div>
  );
};

export default PuzzleList;
