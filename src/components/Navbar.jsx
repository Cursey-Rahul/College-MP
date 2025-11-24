import React from "react";
import { FaGraduationCap } from "react-icons/fa"; // Example icon from react-icons

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/5">
      <div className="w-full mx-auto px-16 py-10 flex items-end justify-between text-white">
        {/* Left side — logo and title */}
        <div className="flex items-center gap-3">
          <FaGraduationCap className="text-3xl text-white" />
          <span className="text-2xl font-semibold tracking-tight pointer-events-none">
            StudyAI
          </span>
          <div className="mx-36 hidden md:flex gap-8 text-lg">
          <a
            href="/"
            className="hover:text-gray-300 transition duration-200"
          >
            Home
          </a>
          <a
            href="/contact"
            className="hover:text-gray-300 transition duration-200"
          >
            Contact
          </a>
        </div>
        </div>


        {/* Right side — login button */}
        <button className="border-2 border-white px-6 py-2 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
