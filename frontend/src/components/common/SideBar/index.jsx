import { FaBars, FaPuzzlePiece } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="sidebar">
            <SidebarIcon icon={<FaBars size="24" />} />
            <SidebarIcon icon={<FaPuzzlePiece size="24" />} />
        </div>
    );
};

const SidebarIcon = ({ icon }) => (
    <div className="sidebar-icon">
        {icon}
    </div>
);

export default SideBar;

