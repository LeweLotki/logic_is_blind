import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';

import SolveForm from '../components/features/Solve/SolveForm';
import DigitalClock from '../components/common/DigitalClock';


function Solve() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <Sidebar />
      <div className="main-content-preview-clock flex">
        <SolveForm />
        <DigitalClock />
      </div>
      <FooterBar />
    </div>
  );
}

export default Solve;

