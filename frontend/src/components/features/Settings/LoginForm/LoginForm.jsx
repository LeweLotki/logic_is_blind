import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie


function LoginForm() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const userId = Cookies.get('user_id');

  const handleNavigate = () => {
    navigate('/');  // Then navigate
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogin = () => {
    alert(`Login attempt with: ${inputValue}`);
    // Implement login logic here
  };

  const handleLogout = () => {
    alert('Logout clicked');
    // Implement logout logic here
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <b>
            Log In
        </b>
        <br></br>
        You are currectly logged in using token:
        <br></br>
        <b>
          {userId ? userId : "No token found"}
        </b>
        <br></br>
        If you already have personal token you can use it to log in using the form below:
      </div>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="login-input"
          placeholder="Enter personal token"
        />
        <button onClick={handleLogin} className="login-button">Log In</button>
      </form>
      <div className="login-title">
        If you want to terminate your current session you can do it by clicking the button placed below:
      </div>
      <button onClick={handleLogout} className="login-logout-button">Log Out</button>
      <div className="login-free-space"></div> {/* Free space */}
      <button onClick={handleNavigate} className="login-back-button">Go Back</button>
    </div>
  );
}

export default LoginForm;

