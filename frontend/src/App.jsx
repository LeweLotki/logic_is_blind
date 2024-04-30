import './index.css';

import { Helmet } from 'react-helmet';

import FooterBar from './components/FooterBar';
import Logo from './components/Logo';
import Sidebar from './components/SideBar';
import PuzzleList from './components/PuzzleList';
import Filter from './components/Filter';

import { FilterProvider } from './hooks/FilterContext';

import favicon from './assets/brain-32x32.png'

const TITLE = 'Logic Is Blind';

function App() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
        <Helmet>
          <title>{ TITLE }</title>
          <link rel="icon" type="image/png" href={favicon} />
        </Helmet>
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
