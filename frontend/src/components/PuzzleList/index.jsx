import React, { useEffect, useState } from 'react';
import fetchData from '../../utils/fetchData';
import PuzzleItem from './PuzzleItem';
import { useFilter } from '../../hooks/FilterContext';

const PuzzleList = () => {
    const [puzzles, setPuzzles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { difficulty } = useFilter();

    useEffect(() => {
        const params = new URLSearchParams({ page: currentPage });
        if (difficulty) params.append('difficulty', difficulty);

        const url = `http://localhost:8000/serializer/puzzle-list?${params.toString()}`;
        fetchData(url).then(data => {
            setPuzzles(data || []);
        });
    }, [currentPage, difficulty]);

    const handleNext = () => setCurrentPage(prev => prev + 1);
    const handlePrev = () => setCurrentPage(prev => prev > 1 ? prev - 1 : 1);

    return (
        <div className="puzzle-list rounded-lg shadow-lg my-4">
            {puzzles.map(puzzle => <PuzzleItem key={puzzle.id} puzzle={puzzle} />)}
            <div className="pagination-controls py-2 flex justify-center">
                <button className="page-control-btn mx-2" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                <button className="page-control-btn mx-2" onClick={handleNext} disabled={puzzles.length === 0}>Next</button>
            </div>
        </div>
    );
};

export default PuzzleList;

