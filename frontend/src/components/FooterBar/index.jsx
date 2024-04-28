import { FaGithub } from 'react-icons/fa';
import { FaPatreon } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';


const FooterBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full h-16 flex justify-center items-center bg-gray-600 text-white shadow-lg">
        <p>© 2024 Logic Is Blind</p>
        <Divider />
        <FooterBarIcon icon={<FaGithub size="28" />} href="https://github.com/LeweLotki" />
        <Divider />
        <FooterBarIcon icon={<FaPatreon size="28" />} href="https://www.patreon.com/"  />
        <Divider />
        <FooterBarIcon icon={<FaYoutube size="28" />} href="https://www.youtube.com/"  />
        <Divider />
      </div>
    );
  };
  
  const FooterBarIcon = ({ icon, href='' }) => (
    <a className="footerbar-icon group" href={href}>
      {icon}
    </a>
  );

const Divider = () => <hr className="footerbar-hr" />;

export default FooterBar;
  
