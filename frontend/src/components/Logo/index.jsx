import React from 'react';
import logoBW from '../../assets/lib_logo.jpg'; // Adjust the path as needed
import logoColor from '../../assets/lib_logo_color.jpg'; // Path to the colored logo

const Logo = () => {
  return (
    <div className="logo-container fixed top-4 left-4 h-50 w-50">
      <img src={logoBW} alt="Logo" className="logo-bw absolute inset-0 w-full h-full object-cover rounded-full" />
      <img src={logoColor} alt="Color Logo" className="logo-color absolute inset-0 w-full h-full object-cover rounded-full opacity-0 transition-opacity duration-200" />
    </div>
  );
};

export default Logo;
