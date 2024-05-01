import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { PuzzleProvider } from '../hooks/PreviewContext';

import FooterBar from '../components/FooterBar';
import Logo from '../components/Logo';
import Sidebar from '../components/SideBar';
import PuzzlePreview from '../components/PuzzlePreview'
import ImreadBtn from '../components/ImreadyBtn';
import DigitalClockPreview from '../components/DigitalClockPreview';
import InfoPopup from '../components/PopUpInfo';
import Rules from '../components/Rules';


function App() {

  const location = useLocation();
  const { puzzle } = location.state || {};

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
    <PuzzleProvider puzzle={puzzle}>
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
    </PuzzleProvider>
  );
}

export default App;

