import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white shadow-sm fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 md:py-3 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={logo} alt="Logo" className="w-8 h-10 mb-2" />
          <span className="text-2xl font-bold text-gray-800 justify-end mt-2.5">Profast</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-300 relative ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-lime-400 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Be a Rider Button */}
          <Link
            to="/rider"
            className="px-4 py-2 bg-lime-300 rounded-full text-sm font-medium text-gray-800 hover:bg-lime-400 transition"
          >
            Be a Rider
          </Link>

          {/* Sign In */}
          <Link
            to="/signin"
            className="px-4 py-2 border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            to="/signup"
            className="px-4 py-2 bg-lime-300 rounded-xl text-sm font-medium text-gray-900 hover:bg-lime-400 transition"
          >
            Sign Up
          </Link>

          {/* Last Black Circle Button */}
          <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-lime-300">
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-full text-gray-950 left-0 w-full bg-white shadow-lg z-40"
        >
          <div className="flex flex-col items-center py-4 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/rider"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-lime-300 rounded-full text-sm font-medium text-gray-800 hover:bg-lime-400 transition"
            >
              Be a Rider
            </Link>

            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-lime-300 rounded-xl text-sm font-medium text-gray-900 hover:bg-lime-400 transition"
            >
              Sign Up
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-lime-300 mt-2"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
