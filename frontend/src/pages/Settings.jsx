import React, { useState } from 'react';

import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import LoginForm from '../components/features/Settings/LoginForm/LoginForm';

function Settings() {

  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <LoginForm />
      <FooterBar />
    </div>
  );
}

export default Settings;

