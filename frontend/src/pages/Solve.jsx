import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';

import SolveForm from '../components/features/Solve/SolveForm/SolveForm';
import DigitalClockSolve from '../components/features/Solve/DigitalClockSolve';


function Solve() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <Sidebar />
      <div className="main-content-solve">
        <SolveForm />
        <DigitalClockSolve />
      </div>
      <FooterBar />
    </div>
  );
}

export default Solve;

