import { useLocation } from 'react-router-dom';

import { PuzzleProvider } from '../hooks/PreviewContext';

import FooterBar from '../components/FooterBar';
import Logo from '../components/Logo';
import Sidebar from '../components/SideBar';
import PuzzlePreview from '../components/PuzzlePreview'
import ImreadBtn from '../components/ImreadyBtn';


function App() {

  const location = useLocation();
  const { puzzle } = location.state || {};

  return (
    <PuzzleProvider puzzle={puzzle}>
      <div className="app-container min-h-screen w-full bg-gray-300">
        <Logo />
        <Sidebar />
        <div className="main-content-preview flex">
          <PuzzlePreview />
          <ImreadBtn />
        </div>
        <FooterBar />
      </div>
    </PuzzleProvider>
  );
}

export default App;

