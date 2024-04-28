import logoImage from '../../lib_logo.jpg';

const Logo = () => {
  return (
    <div className="fixed top-4 left-4 hover:scale-110 transition-transform duration-200">
      <img src={logoImage} alt="Logo" className="h-50 w-50 rounded-full" />
    </div>
  );
};

export default Logo;
