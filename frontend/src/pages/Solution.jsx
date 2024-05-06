import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import SideBar from '../components/common/SideBar';

import SolutionGrid from '../components/features/Solution/SolutionGrid';

import { usePuzzle } from '../hooks/PreviewContext';

function Solution() {

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

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <SideBar />
      <div className="flex justify-center items-center w-full" style={{ maxWidth: '1000px' }}>
        <SolutionGrid size={size} puzzleColors={takenCells} />
      </div>
      <FooterBar />
    </div>
  );
}

export default Solution;

