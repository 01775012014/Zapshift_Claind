import React from 'react';
import Swal from 'sweetalert2';
import img from '../.././assets/agent-pending.png'

// SVG Icon for the select dropdown arrow
const SelectArrowIcon = () => (
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default function App() {
  
  const inputStyles = "w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 focus:border-transparent transition-all duration-300 placeholder-gray-400";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'Your application has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  };

  return (
    <>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        /* Simple animation delay utilities */
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
      `}</style>

      {/* Main container with a soft background color */}
      <main className="bg-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* The main card for the form */}
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            
            {/* Header Section */}
            <header className="mb-10 text-center md:text-left animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl  font-bold text-teal-800 mb-3">Be a Rider</h1>
              <p className="text-gray-900 max-w-2xl mx-auto md:mx-0 text-base">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
              </p>
            </header>

            <div className="border-t border-gray-200 mb-10 animate-fade-in-up animation-delay-200"></div>

            {/* Main content grid: Form on the left, Image on the right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Form Section */}
              <form noValidate onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animation-delay-400">
                <h2 className="text-3xl font-semibold text-teal-700 mb-6">Tell us about yourself</h2>

                {/* Grid for form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" className={inputStyles} />
                  </div>
                  
                  {/* Your Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Your age</label>
                    <input type="number" id="age" name="age" placeholder="Enter your age" className={inputStyles} />
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" className={inputStyles} />
                  </div>

                  {/* Your Region */}
                  <div className="relative">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Your Region</label>
                    <select id="region" name="region" className={`${inputStyles} appearance-none pr-10`}>
                      <option value="">Select your region</option>
                      <option value="dhaka">Dhaka</option>
                      <option value="chittagong">Chittagong</option>
                      <option value="sylhet">Sylhet</option>
                    </select>
                    <SelectArrowIcon />
                  </div>

                  {/* NID No. */}
                  <div>
                    <label htmlFor="nid" className="block text-sm font-medium text-gray-700 mb-1">NID No</label>
                    <input type="text" id="nid" name="nid" placeholder="Your National ID number" className={inputStyles} />
                  </div>
                  
                  {/* Contact */}
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <input type="tel" id="contact" name="contact" placeholder="Your phone number" className={inputStyles} />
                  </div>
                </div>

                {/* Warehouse Selection (full width) */}
                <div className="relative">
                  <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-1">Which wire-house you want to work?</label>
                   <select id="warehouse" name="warehouse" className={`${inputStyles} appearance-none pr-10`}>
                      <option value="">Select wire-house</option>
                      <option value="wh1">Warehouse Alpha</option>
                      <option value="wh2">Warehouse Beta</option>
                      <option value="wh3">Warehouse Gamma</option>
                    </select>
                    <SelectArrowIcon />
                </div>
                
                {/* Submit Button */}
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-lime-400 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transform hover:scale-105 transition-all duration-300 ease-in-out mt-4"
                  >
                    Submit
                  </button>
                </div>
              </form>
              
              {/* Image Section - hidden on small screens */}
              <div className="hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-600">
                <img 
                  src={img}
                  alt="A friendly delivery rider on a scooter with a package" 
                  className="max-w-md w-full h-auto object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/EBF4E8/36A420?text=Rider+Illustration'; }}
                />
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
