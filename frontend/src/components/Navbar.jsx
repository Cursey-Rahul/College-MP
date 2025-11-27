  import React from "react";
import { FaGraduationCap } from "react-icons/fa"; // Example icon from react-icons

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl w-full mx-auto px-4 py-4 md:px-12 lg:px-16 md:py-6 flex flex-wrap items-center justify-between text-white gap-3">
        {/* Left side — logo and title */}
        <div className="flex items-center gap-3 min-w-0">
          <FaGraduationCap className="text-xl sm:text-2xl md:text-3xl text-white flex-shrink-0" />
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight pointer-events-none truncate">
            StudyAI
          </span>

          {/* only show links on md+ to avoid crowding mobile */}
          <div className="hidden md:flex gap-6 text-lg ml-8">
            <a
              href="/"
              className="hover:text-gray-300 transition duration-200 whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="/contact"
              className="hover:text-gray-300 transition duration-200 whitespace-nowrap"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right side — login button */}
        <div className="flex items-center gap-3">
          <button className="text-xs sm:text-sm lg:text-base border-2 border-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300 whitespace-nowrap">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
