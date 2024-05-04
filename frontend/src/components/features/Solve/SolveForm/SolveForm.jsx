import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { usePuzzle } from "../../../../hooks/PreviewContext";

function SolveForm() {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');

  const { puzzle } = usePuzzle();

  const handleInputChange = (event) => {
    const value = event.target.value;
    const digitsOnly = value.replace(/\D/g, '').slice(0, 3); // Allow only digits and limit to 3
    setInput(digitsOnly);

    if (digitsOnly.length === 3) {
      setDisplay(`Row ${digitsOnly.charAt(0)}, Column ${digitsOnly.charAt(1)}, Value ${digitsOnly.charAt(2)}`);
    } else {
      setDisplay('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const token = Cookies.get('user_id'); // Get the token from cookies
    if (!token) {
      setDisplay('Authentication token is missing, please log in.');
      return; // Early return if token is not available
    }
    
    if (input.length === 3) {
      const requestData = {
        row: input.charAt(0),
        column: input.charAt(1),
        value: input.charAt(2),
        token: token,
        puzzle_id: puzzle.id
      };
      try {
        const response = await fetch('http://localhost:8000/solve/set-digit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        console.log(data);  // Log the response data
        setDisplay(`Submitted: ${display}`);
      } catch (error) {
        console.error('Error submitting the form:', error);
        setDisplay('Error in submission');
      }
    } else {
      setDisplay('Please enter all 3 digits');
    }
  };

  return (
    <div className="solve-form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="text-center bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-md outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter 3 digits"
        />
        <button type="submit" className="hidden">Submit</button>
      </form>
      {display && (
        <div className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-full shadow-lg">
          {display}
        </div>
      )}
    </div>
  );
}

export default SolveForm;

