import { FaBars, FaPuzzlePiece } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

    return (
        <div className="sidebar">
            <SidebarIcon icon={<FaBars size="24" />} />
            {/* <SidebarIcon icon={<FaPuzzlePiece size="24" />} /> */}
        </div>
    );
};

const SidebarIcon = ({ icon }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/settings');  // Then navigate
    };

    return (<button onClick={handleNavigate} className="sidebar-icon">
        {icon}
    </button>
    );
};

export default SideBar;

