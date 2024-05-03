import React, { useState } from 'react';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';

function Settings() {

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <FooterBar />
    </div>
  );
}

export default Settings;

