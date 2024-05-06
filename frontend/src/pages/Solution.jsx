import React, { useState } from 'react';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import SideBar from '../components/common/SideBar';

function Solution() {

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <SideBar />
      <FooterBar />
    </div>
  );
}

export default Solution;

