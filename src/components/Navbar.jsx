import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-6 py-4 bg-black border-b border-matrix-green z-50 relative">
      <Link to="/" className="btn-matrix px-4 py-2">
        Home
      </Link>
      <Link to="/projects" className="btn-matrix px-4 py-2">
        Projects
      </Link>
      <Link to="/contact" className="btn-matrix px-4 py-2">
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
