// SolveForm.jsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { usePuzzle } from "../../../../hooks/PreviewContext";

function SolveForm({ onFormSubmit }) {  // Receive the callback via props
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');
  const { puzzle } = usePuzzle();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value.replace(/[^\d]/g, '').replace(/0/g, '').slice(0, 3));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('user_id');
    if (!token) {
      setDisplay('Authentication token is missing, please log in.');
      return;
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
        const data = await response.json();
        if (response.ok) {
          setDisplay(`Submitted: Row ${requestData.row}, Column ${requestData.column}, Value ${requestData.value}`);
          onFormSubmit();  // Trigger data fetch in parent component after successful submission
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
        setDisplay('Error in submission');
      } finally {
        setInput('');
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
