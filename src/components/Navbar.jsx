import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <div className="navbar-container fixed top-0 left-0 w-full h-20 flex justify-between items-center px-12 bg-transparent z-50 border-b-2 border-teal-500">
      {/* Logo */}
      <div className="logo">
        <h1 className="glowing-text text-3xl text-white text-shadow-md">
          Ashkan | Full Stack Developer
        </h1>
      </div>

      {/* Navigation links */}
      <ul className="nav-links flex gap-8 list-none text-lg font-semibold text-white">
        <li>
          <Link to="/" className="nav-link glowing-text hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className="nav-link glowing-text hover:text-yellow-400"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="nav-link glowing-text hover:text-yellow-400"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
