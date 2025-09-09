// src/App.js (or your main component file)

import React, { useState } from 'react';
import '../.././index.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firbas/Firbes.js';

import Img from '../../assets/authImage.png';
import Logo from '../../assets/Logo/google Logo.png';
import Icon from '../../assets/logo.png'
import { NavLink, Link } from "react-router-dom";

function Register() {
   return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src={Icon} alt="Logo" className="w-8 h-10 mb-2" />
          <span className="text-2xl font-bold text-gray-800 justify-end mt-2.5">Profast</span>
        </Link >
        <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
           <RegistrationPage />

        </div>
      
      
    </div>
  );
  
}

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Registration successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-full md:w-[90%] overflow-hidden">
      {/* Left Section: Registration Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-45 flex flex-col justify-center">
        

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
        <p className="text-gray-600 mb-8">Register with Profast</p>

        {/* Profile Icon Placeholder */}
        <div className="mb-6 flex justify-center lg:justify-start">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
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
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="#" className="font-medium text-green-600 hover:text-green-500">Login</a>
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
          Register with Google
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
  );
};

export default Register;




