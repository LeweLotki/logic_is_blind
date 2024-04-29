import PuzzleItem from './PuzzleItem';

const PuzzleList = () => {
  const dummyPuzzles = [
    { name: "Mystery Manor", author: "Jane Doe", difficulty: "Medium", mode: "Adventure" },
    { name: "Mystery Manor", author: "Jane Doe", difficulty: "Medium", mode: "Adventure" },
    { name: "Mystery Manor", author: "Jane Doe", difficulty: "Medium", mode: "Adventure" },
    { name: "Mystery Manor", author: "John Doe", difficulty: "Medium", mode: "Adventure" },
    { name: "Mystery Manor", author: "Jane Doe", difficulty: "Medium", mode: "Adventure" },
    // Add more dummy puzzle objects...
  ];

  return (
    <div className="puzzle-list rounded-lg shadow-lg overflow-hidden my-4">
      {dummyPuzzles.map((puzzle, index) => (
        <PuzzleItem key={index} puzzle={puzzle} />
      ))}
      <div className="pagination-controls py-2 flex justify-center">
        {/* Left arrow for previous page */}
        <button className="page-control-btn mx-2">&lt;</button>
        {/* Right arrow for next page */}
        <button className="page-control-btn mx-2">&gt;</button>
      </div>
    </div>
  );
};

export default PuzzleList;

