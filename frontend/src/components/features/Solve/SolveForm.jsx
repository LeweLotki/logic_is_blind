import React, { useState } from 'react';

function SolveForm() {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');

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

  return (
    <div className="app-container">
      <input
        className="text-center bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-md outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter up to 3 digits"
      />
      {display && (
        <div className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-full shadow-lg">
          {display}
        </div>
      )}
    </div>
  );
}

export default SolveForm;

