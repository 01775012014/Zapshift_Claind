import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X, User } from "lucide-react";
import logo from "../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firbas/Firbes.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: "Services", path: "/map-64-districts" },
    { name: "Coverage", path: "/consignment" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", 
      path: "/AddParcel"
      // path: "/pricing-calculator"
      // 

     },
    { name: "Be a Rider", path: "/be-a-rider" },
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setProfileMenuOpen(false);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const ProfileMenu = () => (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
      <div className="px-4 py-2">
        <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName || "User"}</p>
        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
      </div>
      <div className="border-t border-gray-100"></div>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );

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
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} />
                )}
              </button>
              {profileMenuOpen && <ProfileMenu />}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
              <Link
                to="/Register"
                className="px-4 py-2 bg-lime-300 rounded-xl text-sm font-medium text-gray-900 hover:bg-lime-400 transition"
              >
                Sign Up
              </Link>
            </>
          )}
          <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-lime-300">
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
           {user ? (
            <div className="relative">
              <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                 {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} />
                )}
              </button>
               {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName || "User"}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
             <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 border rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                  `text-base font-medium transition-all duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
             {!user && (
                <Link
                    to="/Register"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-lime-300 rounded-xl text-sm font-medium text-gray-900 hover:bg-lime-400 transition w-1/2 text-center"
                >
                    Sign Up
                </Link>
             )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;