// src/components/PuzzleItem.js
import { useNavigate } from 'react-router-dom';
import { usePuzzle } from '../../../../hooks/PreviewContext';

const PuzzleItem = ({ puzzle }) => {

    console.log(puzzle.standard);

    const { updatePuzzle } = usePuzzle();
    const navigate = useNavigate();

    const handleNavigate = () => {
        updatePuzzle(puzzle);  // First update the context
        navigate('/preview');  // Then navigate
    };

    const displayStandard = (standard) => {
        return standard ? "Standard" : "Non-Standard";
    };

    return (
        <div className="puzzle-item-container relative">
            <button onClick={handleNavigate} className="puzzle-item flex justify-center items-center py-3 px-6 text-white font-montserrat w-full">
                <span className="puzzle-label">{puzzle.title}</span>
                <span className="divider"></span>
                <span className="puzzle-label">{puzzle.size}x{puzzle.size}</span>
                <span className="divider"></span>
                <span className="puzzle-label">{puzzle.difficulty}</span>
                <span className="divider"></span>
                <span className="puzzle-label">{displayStandard(puzzle.standard)}</span>
            </button>
            <div className="puzzle-tooltip">
                <img src={puzzle.image} style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
};

export default PuzzleItem;
