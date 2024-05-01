import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';

import SolveForm from '../components/features/Solve/SolveForm/SolveForm';
import DigitalClockSolve from '../components/features/Solve/DigitalClockSolve';
import RulesPopUp from '../components/features/Solve/RulesPopUp';


function Solve() {
  return (
    <div>
      <Logo />
      <Sidebar />
      <div className="main-content-solve">
        <DigitalClockSolve />
        <SolveForm />
        <RulesPopUp />
        
      </div>
      <FooterBar />
    </div>
  );
}

export default Solve;

