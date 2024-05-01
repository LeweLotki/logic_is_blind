import { useNavigate } from 'react-router-dom';

const ImreadBtn = () => {

  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate('/solve'); // , { state: { puzzle } }); // Adjust this path as needed for your routing setup
  };

    return (
    <div onClick={handleNavigate} className="ready-btn-container text-center p-4">
      <button className="ready-btn-button" >I AM READY!</button>
    </div>
    );
};

export default ImreadBtn;

