import FooterBar from '../components/FooterBar';
import Logo from '../components/Logo';
import Sidebar from '../components/SideBar';


function App() {
  return (
    <div className="app-container min-h-screen w-full bg-gray-300">
      <Logo />
      <Sidebar />
      <FooterBar />

    </div>
  );
}

export default App;

