import React from 'react';
import img1 from "../../../assets/location-merchant.png";
import img2 from "../../../assets/be-a-merchant-bg.png";


const CourierIllustration = () => (
  <div className="w-full  text-[#67e8f9] mx-auto">
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wavy line below the boxes */}
      <path d="M10 148 C 30 138, 50 158, 70 148 C 90 138, 110 158, 130 148" stroke="currentColor" strokeWidth="1.5" />
      {/* Wavy line on the right */}
      <path d="M190 85 C 200 75, 210 95, 220 85" stroke="currentColor" strokeWidth="1.5" />

      {/* Bottom box */}
      <path d="M25 95 L 145 95 L 145 145 L 25 145 L 25 95 Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 95 L 55 75 L 175 75 L 145 95" stroke="currentColor" strokeWidth="1.5" />
      <path d="M145 145 L 175 125 L 175 75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M110 112 H 135" stroke="currentColor" strokeWidth="1.5" />


      {/* Top box */}
      <path d="M45 40 L 165 40 L 165 90 L 45 90 L 45 40 Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M45 40 L 75 20 L 195 20 L 165 40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M165 90 L 195 70 L 195 20" stroke="currentColor" strokeWidth="1.5" />

      {/* Map Pin */}
      <path d="M125 5 C114.046 5 105 14.0457 105 25 C105 40.6863 125 60 125 60 C125 60 145 40.6863 145 25 C145 14.0457 135.954 5 125 5Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="125" cy="25" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </div>
);


/**
 * The main section component as shown in the screenshot.
 */
const SatisfactionSection = () => {
  return (
    // Wrapper to center the component on the page
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-7xl bg-[#0d3d47] text-white rounded-2xl p-8 sm:p-12 overflow-hidden">
        
        {/* Abstract Background Wave SVG */}
        <div className="absolute top-0 left-0 w-full h-full opacity-100 mix-blend-lighten">
            <img src={img2} alt="" />
            {/* <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 200 C 100 -50, 300 450, 600 150 S 900 100, 1000 250" stroke="url(#gradient)" strokeWidth="100" strokeLinecap="round"/>
                <path d="M-150 250 C 50 0, 350 500, 650 200 S 950 150, 1050 300" stroke="url(#gradient)" strokeWidth="50" strokeLinecap="round"/>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#67e8f9"/>
                        <stop offset="100%" stopColor="#38b2ac"/>
                    </linearGradient>
                </defs>
            </svg> */}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Text and Buttons */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="text-slate-300">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button className="bg-[#bde842] hover:bg-[#a8cf3a] transition-colors text-black font-semibold py-3 px-6 rounded-lg">
                Become a Merchant
              </button>
              <button className="border border-[#bde842] hover:bg-[#bde842]/20 transition-colors text-white font-semibold py-3 px-6 rounded-lg">
                Earn with Profast Courier
              </button>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <img src={img1} alt="" />
            {/* <CourierIllustration /> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SatisfactionSection;