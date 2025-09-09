// src/App.js (or your main component file)

import React, { useState } from 'react';
import '../../index.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firbas/Firbes.js';
import Img from '../../assets/authImage.png';
import Logo from '../../assets/Logo/google Logo.png';
import Icon from '../../assets/logo.png'
import { NavLink, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={Icon} alt="Logo" className="w-8 h-10 mb-2" />
          <span className="text-2xl font-bold text-gray-800 justify-end mt-2.5">Profast</span>
        </Link >
        <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
          <LoginPage />

        </div>
      
      
    </div>
  );
}

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Login successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    
      <div className="bg-white rounded-lg shadow-lg w-full flex flex-col lg:flex-row md:w-[90%] md:h-[90%] overflow-hidden">
        
        {/* Left Section: Login Form */}

        <div className="w-full lg:w-1/2 p-5 md:p-45 flex flex-col justify-center">
          {/* Logo */}
          {/* <div className="mb-8">
            <img src={Icon} alt="Profast Logo" className="h-8" />
          </div> */}

          

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Login with Profast</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div className="text-sm text-right">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login
            </button>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have any account? <a href="#" className="font-medium text-green-600 hover:text-green-500">Register</a>
          </p>
          <div className="relative flex justify-center items-center my-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-3 text-sm text-gray-500">
              Or
            </div>
          </div>
          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img src={Logo} alt="Google logo" className="w-5 h-5 mr-2" />
            Login with Google
          </button>
        </div>

        {/* Right Section: Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-white-100 items-center justify-center p-8">
          <img
            src={Img}
            alt="Delivery Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default App;