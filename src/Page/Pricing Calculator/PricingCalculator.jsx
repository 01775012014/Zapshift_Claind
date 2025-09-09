import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
  
  const [parcelType, setParcelType] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [cost, setCost] = useState(50); 
  const [isCalculated, setIsCalculated] = useState(false); 
  
  // Common styles for form elements
  const inputStyles = "w-full px-4 py-3 bg-slate-50 border text-gray-950 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-300 placeholder-gray-400";

  // --- Calculation Logic ---
  const handleCalculate = (e) => {
    e.preventDefault();
    if (!parcelType || !destination || !weight || weight <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields correctly.',
      });
      return;
    }

    let baseCost = 50; 

    // Cost based on parcel type
    if (parcelType === 'document') {
      baseCost += 10;
    } else if (parcelType === 'electronics') {
      baseCost += 50;
    } else if (parcelType === 'fragile') {
      baseCost += 80;
    }

    // Cost based on destination
    if (destination === 'outside') {
      baseCost += 40;
    }

    // Cost based on weight (e.g., 15 Tk per KG)
    const weightCost = parseFloat(weight) * 15;
    
    const totalCost = baseCost + weightCost;
    
    setCost(Math.round(totalCost));
    setIsCalculated(true); // Trigger animation
  };

  // --- Reset Logic ---
  const handleReset = () => {
    setParcelType('');
    setDestination('');
    setWeight('');
    setCost(50);
    setIsCalculated(false);
  };
  
  // Reset animation trigger
  useEffect(() => {
    if (isCalculated) {
      const timer = setTimeout(() => setIsCalculated(false), 500); // Duration of animation
      return () => clearTimeout(timer);
    }
  }, [isCalculated]);


  return (
    <>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0.5; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* Main container with a soft background */}
      <main className="bg-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* The main card for the calculator */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 lg:p-16">
            
            {/* Header Section */}
            <header className="mb-10 text-center md:text-left animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-3">Pricing Calculator</h1>
              <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 text-base">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
              </p>
            </header>

            <div className="border-t border-gray-200 mb-10 animate-fade-in-up animation-delay-200"></div>

             {/* Form and Result Section */}
            <section className="animate-fade-in-up animation-delay-400">
                <h2 className="text-3xl font-semibold text-teal-700 text-center mb-8">Calculate Your Cost</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Form on the left */}
                    <form onSubmit={handleCalculate} className="space-y-6">
                        {/* Parcel Type */}
                        <div className="relative">
                            <label htmlFor="parcel-type" className="block text-sm font-medium text-gray-700 mb-1">Parcel type</label>
                            <select id="parcel-type" value={parcelType} onChange={(e) => setParcelType(e.target.value)} className={`${inputStyles} appearance-none pr-10`}>
                                <option value="" disabled>Select Parcel type</option>
                                <option value="standard">Standard</option>
                                <option value="document">Document</option>
                                <option value="electronics">Electronics</option>
                                <option value="fragile">Fragile</option>
                            </select>
                            <SelectArrowIcon />
                        </div>
                        
                        {/* Delivery Destination */}
                        <div className="relative">
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Delivery Destination</label>
                            <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={`${inputStyles} appearance-none pr-10`}>
                                <option value="" disabled>Select Delivery Destination</option>
                                <option value="inside">Inside City</option>
                                <option value="outside">Outside City</option>
                            </select>
                            <SelectArrowIcon />
                        </div>
                        
                        {/* Weight */}
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (KG)</label>
                            <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 2.5" className={inputStyles} min="0.1" step="0.1" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <button 
                                type="button"
                                onClick={handleReset}
                                className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
                            >
                                Reset
                            </button>
                            <button 
                                type="submit"
                                className="w-full bg-lime-400 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transform hover:scale-105 transition-all duration-300"
                            >
                                Calculate
                            </button>
                        </div>
                    </form>

                    {/* Result on the right */}
                    <div className="flex items-center justify-center">
                        <div className={`text-center text-6xl sm:text-7xl lg:text-8xl font-extrabold text-teal-900 ${isCalculated ? 'animate-scale-up' : ''}`}>
                            {cost}<span className="text-4xl sm:text-5xl lg:text-6xl align-middle"> Tk</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </>
  );
}
