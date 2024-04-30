import { useNavigate } from 'react-router-dom';

const PuzzleItem = ({ puzzle }) => {

  const navigate = useNavigate(); // Hook to get navigate function

  // Function to handle navigation
  const handleNavigate = () => {
    navigate('/preview', { state: { puzzle } }); // Adjust this path as needed for your routing setup
  };

  return (
    <div className="puzzle-item-container relative">
      <button onClick={handleNavigate} className="puzzle-item flex justify-center items-center py-3 px-6 text-white font-montserrat w-full">
        <span className="puzzle-label">{puzzle.title}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.author}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.difficulty}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.mode}</span>
      </button>
      <div className="puzzle-tooltip">
        <img src={puzzle.image} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default PuzzleItem;
