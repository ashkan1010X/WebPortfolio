import { NavLink } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-6 py-4 bg-black border-b border-matrix-green z-50 relative">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "btn-matrix px-4 py-2 active-btn" : "btn-matrix px-4 py-2"
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "btn-matrix px-4 py-2 active-btn" : "btn-matrix px-4 py-2"
        }
      >
        Projects
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "btn-matrix px-4 py-2 active-btn" : "btn-matrix px-4 py-2"
        }
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
