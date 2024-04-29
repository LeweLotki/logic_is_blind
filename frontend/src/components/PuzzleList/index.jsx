import React, { useEffect, useState } from 'react';
import PuzzleItem from './PuzzleItem';
import fetchData from '../../fetchData';

const PuzzleList = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `http://localhost:8000/serializer/puzzle-list?page=${currentPage}`;
    fetchData(url).then(data => {
      if (data) {
        setPuzzles(data);
      }
    });
  }, [currentPage]);  // Depend on currentPage so it fetches new data when page changes

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="puzzle-list rounded-lg shadow-lg overflow-hidden my-4">
      {puzzles.map((puzzle, index) => (
        <PuzzleItem key={index} puzzle={puzzle} />
      ))}
      <div className="pagination-controls py-2 flex justify-center">
        <button className="page-control-btn mx-2" onClick={handlePrev} disabled={currentPage <= 1}>&lt;</button>
        <button className="page-control-btn mx-2" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default PuzzleList;
