const PuzzleItem = ({ puzzle }) => {
    return (
      <button className="puzzle-item flex justify-center items-center py-3 px-6 text-white font-montserrat w-full">
        <span className="puzzle-label">{puzzle.name}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.author}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.difficulty}</span>
        <span className="divider"></span>
        <span className="puzzle-label">{puzzle.mode}</span>
      </button>
    );
  };
  

export default PuzzleItem;

