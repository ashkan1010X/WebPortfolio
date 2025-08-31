import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../index.css";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      // Ignore clicks on the toggle button itself
      if (toggleBtnRef.current && toggleBtnRef.current.contains(e.target))
        return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const commonLinkClasses =
    "nav-link glowing-text hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded";

  return (
    <div className="navbar-container fixed top-0 left-0 w-full h-20 flex justify-between items-center px-6 md:px-12 bg-black/40 backdrop-blur-md z-50 border-b border-teal-500/40">
      {/* Logo */}
      <div className="logo select-none">
        <h1 className="glowing-text text-2xl xs:text-3xl md:text-3xl text-white text-shadow-md leading-tight">
          <Link to="/" className={commonLinkClasses}>
            Ashkan | Full Stack Developer
          </Link>
        </h1>
      </div>

      {/* Desktop navigation */}
      <ul className="nav-links hidden sm:flex gap-6 md:gap-8 list-none text-sm md:text-lg font-semibold text-white items-center">
        <li>
          <Link to="/" className={commonLinkClasses}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/projects" className={commonLinkClasses}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/about" className={commonLinkClasses}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={commonLinkClasses}>
            Contact
          </Link>
        </li>
        <li>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-gray-800/70 hover:bg-gray-700 text-gray-200 text-xs md:text-sm border border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Toggle color theme"
            data-testid="theme-toggle-desktop"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </li>
      </ul>

      {/* Mobile controls */}
      <div className="flex sm:hidden items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-800/70 hover:bg-gray-700 text-gray-200 text-sm border border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Toggle color theme"
          data-testid="theme-toggle-mobile"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        <button
          ref={toggleBtnRef}
          type="button"
          /* Avoid shifting desktop design; only visible mobile */
          className="p-2 inline-flex items-center justify-center rounded-md bg-gray-800/70 hover:bg-gray-700 border border-gray-600 text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          data-testid="mobile-menu-button"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden absolute top-20 inset-x-0 px-6 pb-8 pt-4 bg-black/85 backdrop-blur-xl border-b border-teal-500/40 shadow-lg animate-fadeIn"
          data-testid="mobile-menu"
        >
          <nav>
            <ul className="flex flex-col gap-4 text-base font-semibold text-white">
              <li>
                <Link
                  to="/"
                  className={commonLinkClasses + " block py-2"}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={commonLinkClasses + " block py-2"}
                  onClick={() => setOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={commonLinkClasses + " block py-2"}
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={commonLinkClasses + " block py-2"}
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className="pt-2 border-t border-teal-500/30 mt-2">
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full px-4 py-2 rounded-md bg-gray-800/70 hover:bg-gray-700 text-gray-200 border border-gray-600 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="Toggle color theme"
                >
                  {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
