import FooterBar from '../components/common/FooterBar';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/SideBar';


function Solve() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <Sidebar />
      <FooterBar />
    </div>
  );
}

export default Solve;

