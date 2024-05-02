// src/pages/Preview.js
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { usePuzzle } from '../hooks/PreviewContext';
import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';
import PuzzlePreview from '../components/features/Preview/PuzzlePreview';
import ImreadBtn from '../components/features/Preview/ImreadyBtn';
import DigitalClockPreview from '../components/features/Preview/DigitalClockPreview';
import InfoPopup from '../components/features/Preview/PopUpInfo';
import Rules from '../components/features/Preview/Rules';

function Preview() {
    const { puzzle, updatePuzzle } = usePuzzle();
    const location = useLocation();
    const { puzzle: puzzleFromLocation } = location.state || {};

    useEffect(() => {
        if (puzzleFromLocation) {
            updatePuzzle(puzzleFromLocation);  // Ensures context is updated with passed state
        }
    }, [puzzleFromLocation, updatePuzzle]);

    const [showPopup, setShowPopup] = useState(true);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        if (startTime) {
            const timerId = setInterval(() => {
                console.log('Clock is ticking');
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [startTime]);

    const handlePopupClose = () => {
        setShowPopup(false);
        setStartTime(Date.now());
    };

    return (
        <div className="app-container min-h-screen w-full bg-gray-300">
            <Logo />
            <Sidebar />
            <div className="main-content-preview-clock flex">
                <Rules />
                <div className="main-content-preview flex">
                    <PuzzlePreview />
                    <ImreadBtn />
                </div>
                {!showPopup && <DigitalClockPreview startTime={startTime} />}
            </div>
            {showPopup && <InfoPopup onClose={handlePopupClose} />}
            <FooterBar />
        </div>
    );
}

export default Preview;
