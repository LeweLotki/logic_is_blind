import { usePuzzle } from "../../../../hooks/PreviewContext";

const PuzzlePreview = () => {

  const { puzzle } = usePuzzle();

  return (
    <div className="puzzle-preview rounded-lg shadow-lg my-4">
      <img className="puzzle-image-preview" src={puzzle.image} />
    </div>
  );
};

export default PuzzlePreview;
