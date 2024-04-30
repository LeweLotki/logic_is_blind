import FooterBar from '../components/FooterBar';
import Logo from '../components/Logo';
import Sidebar from '../components/SideBar';
import PuzzleList from '../components/PuzzleList';
import Filter from '../components/Filter';

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
