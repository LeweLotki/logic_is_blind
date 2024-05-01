import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';
import PuzzleList from '../components/features/Home/PuzzleList';
import Filter from '../components/features/Home/Filter';

import { FilterProvider } from '../hooks/FilterContext';

function App() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <Sidebar />
      <FilterProvider >
        <div className="main-content flex">
          <PuzzleList />
          <Filter />
        </div>
      </FilterProvider>
      <FooterBar />

    </div>
  );
}

export default App;

