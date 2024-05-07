import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import SideBar from '../components/common/SideBar';

import SolutionGrid from '../components/features/Solution/SolutionGrid';
import HomePageBtn from '../components/features/Solution/HomePageBtn';

import { usePuzzle } from '../hooks/PreviewContext';

function Solution() {
  const [size, setSize] = useState(9);
  const [solutionData, setSolutionData] = useState([]); // Renamed for clarity
  const { puzzle } = usePuzzle();

  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate('/'); // , { state: { puzzle } });
  };

  const fetchSolution = async () => { // Renamed for clarity
    const token = Cookies.get('user_id');
    if (token && puzzle && puzzle.id) {
      const queryParams = new URLSearchParams({ token, puzzle_id: puzzle.id });
      try {
        const response = await fetch(`/solve/get-solution?${queryParams}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          setSolutionData(data.cells); // Assuming data structure matches your needs
          setSize(data.cells.length); // Verify that this is the correct logic
        } else {
          throw new Error('Failed to fetch solution data');
        }
      } catch (error) {
        console.error('Error fetching solution data:', error);
      }
    }
  };

  useEffect(() => {
    fetchSolution();
  }, [puzzle]);

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <SideBar />
      <div className="flex flex-col items-center w-full" style={{ maxWidth: '1000px' }}>
        <SolutionGrid size={size} puzzle={solutionData} />
        <HomePageBtn onClick={ handleNavigate } />
      </div>
      <FooterBar />
    </div>
  );
}

export default Solution;
