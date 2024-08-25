import { useState } from "react";
import { FiCloud, FiMapPin, FiSettings, FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Logo } from "../components/index";
import { useNavigate } from "react-router-dom";

const VerticalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon for Small Screens */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button onClick={toggleMenu} className="text-gray-900 dark:text-white">
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {/* Vertical Navbar */}
      <div
        className={`h-screen z-20 bg-gray-900 dark:bg-gray-800 text-white w-20 flex flex-col items-center py-4 fixed transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Navbar Header */}
        <div className="mb-6">
          <NavLink to="/"><Logo /></NavLink>
        </div>

        {/* Navbar Items */}
        <nav className="flex flex-col space-y-8">
          <NavLink
            to="/pinned"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-center text-blue-500 transition duration-300"
                : "flex flex-col items-center text-center hover:text-blue-500 transition duration-300"
            }
          >
            <FiCloud size={20} />
            <span className="text-xs mt-2">Pinned</span>
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-center text-blue-500 transition duration-300"
                : "flex flex-col items-center text-center hover:text-blue-500 transition duration-300"
            }
          >
            <FiMapPin size={20} />
            <span className="text-xs mt-2">Map</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-center text-blue-500 transition duration-300"
                : "flex flex-col items-center text-center hover:text-blue-500 transition duration-300"
            }
          >
            <FiSettings size={20} />
            <span className="text-xs mt-2">About</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-center text-blue-500 transition duration-300"
                : "flex flex-col items-center text-center hover:text-blue-500 transition duration-300"
            }
          >
            <FiPhoneCall size={20} />
            <span className="text-xs mt-2">Contact</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default VerticalNavbar;
