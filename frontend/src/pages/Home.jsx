import React, { useState } from 'react';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';
import PuzzleList from '../components/features/Home/PuzzleList';
import Filter from '../components/features/Home/Filter';
import PopupCode from '../components/features/Home/PopUpCode';

import { FilterProvider } from '../hooks/FilterContext';

function Home() {
  
  const [showPopup, setShowPopup] = useState(true);

  const handlePopupClose = () => {
    setShowPopup(false);
};

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      {/* <PopupCode /> */}
      <Logo />
      <Sidebar />
      <FilterProvider >
        <div className="main-content flex">
          <PuzzleList />
          <Filter />
        </div>
      </FilterProvider>
      <FooterBar />
      {showPopup && <PopupCode onClose={handlePopupClose} />}
    </div>
  );
}

export default Home;

