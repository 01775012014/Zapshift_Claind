import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png"; 
import { Link } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900 text-white rounded-3xl w-[98%] md:w-[95%] mx-auto mt-20 py-8 md:py-12 px-4 md:px-3 text-center"
    >
      {/* Logo & Description */}
      <div className="flex flex-col items-center gap-2 md:gap-4">
       <Link to="/" className="flex items-center ">
          <img src={logo} alt="Logo" className="w-8 h-10 mb-2" />
          <span className="text-2xl font-bold text-white justify-end mt-2.5">Profast</span>
        </Link>
        <p className="text-xs md:text-sm text-gray-300 max-w-md md:max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="mt-6 md:mt-8 border-t border-b border-gray-700 py-2 md:py-4 flex justify-center flex-wrap gap-4 md:gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `relative text-sm font-medium transition-all duration-300 ${
                isActive ? "text-lime-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="footer-underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-lime-400 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 md:gap-6 mt-4 md:mt-6">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#0077B5] text-white hover:scale-110 transition"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 transition"
        >
          <FaXTwitter size={16} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:scale-110 transition"
        >
          <Facebook size={16} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#FF0000] text-white hover:scale-110 transition"
        >
          <Youtube size={16} />
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;
