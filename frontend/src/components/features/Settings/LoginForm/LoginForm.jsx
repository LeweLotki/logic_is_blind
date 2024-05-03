import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie


function LoginForm() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const userId = Cookies.get('user_id');

  const handleNavigate = () => {
    navigate('/');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogin = async () => {
    if (!inputValue.trim()) {
      setErrorMessage('Please enter a token.');
      return;
    }
    try {
      const response = await fetch('/session/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: inputValue })
      });
      const data = await response.json();
      if (data.exist) {
        Cookies.remove('user_id');
        Cookies.set('user_id', inputValue, { expires: 30 }); // Set for 30 days
        setErrorMessage('');
        alert('Token validated and set successfully.');
        navigate('/');
        window.location.reload(); // Refresh page to apply the new session
      } else {
        alert('Token is invalid. Please try another one.');
        setErrorMessage('Token is invalid. Please try another one.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server. Please try again later.');
      console.error('Error validating token:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('user_id');
    alert('You have been logged out!');
    navigate('/');
    window.location.reload()
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
        <button type="button" onClick={handleLogin} className="login-button">Log In</button>
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

