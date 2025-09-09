import React, { useState } from 'react';

// --- Mock Data: In a real app, this would come from an API ---
const mockTrackingData = {
  "148976175": {
    productDetails: {
      date: "May 31, 2025 03:41 PM",
      id: "148976175",
      invoice: "24227",
      trackingCode: "01JWJVEXW298Z3Q7HSH5SYV7",
      name: "Zahid Hossain",
      address: "Madrasha Road, Chandpur sadar, Chandpur, Chandpur, 3600, BD",
      phone: "01780448866",
      approved: "N/A",
      weight: "1 KG",
      cod: "৳ 0",
      status: "Pending",
    },
    trackingUpdates: [
      { time: "Jun 02, 2025 12:21 am", status: "Assigned to rider." },
      { time: "Jun 02, 2025 10:15 am", status: "Rider picked up the parcel." },
      { time: "Jun 02, 2025 01:30 pm", status: "On the way to the hub." },
      { time: "Jun 02, 2025 04:00 pm", status: "Reached sorting facility." },
      { time: "Jun 03, 2025 09:00 am", status: "Out for delivery." },
      { time: "Jun 03, 2025 01:45 pm", status: "Delivered successfully." },
    ]
  }
};

// --- SVG Icons ---
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CheckIcon = () => (
    <div className="bg-teal-100 rounded-full p-1.5">
        <svg className="w-5 h-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    </div>
);


export default function App() {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId) {
        setError('Please enter a tracking code.');
        return;
    }
    setIsLoading(true);
    setSearchResult(null);
    setError('');

    // Simulate API call
    setTimeout(() => {
        const data = mockTrackingData[trackingId];
        if (data) {
            setSearchResult(data);
        } else {
            setError('No consignment found with this tracking code.');
        }
        setIsLoading(false);
    }, 1500);
  };

  const DetailRow = ({ label, value, status = false }) => (
    <div className="flex justify-between py-2 text-sm">
        <span className="font-medium text-gray-500">{label}:</span>
        <span className={`text-right ${status ? 'font-bold text-orange-500' : 'text-gray-800'}`}>{value}</span>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .stagger-animation { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
      `}</style>
      
      <main className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
            
            {/* Header */}
            <header className="mb-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-2">Track Your Consignment</h1>
              <p className="text-gray-600">Now you can easily track your consignment</p>
            </header>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 mb-10 animate-fade-in-up animation-delay-200">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => { setTrackingId(e.target.value); setError(''); }}
                        placeholder="Search tracking code here"
                        className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                    />
                </div>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-10 animate-fade-in-up animation-delay-200"></div>

            {/* Results Section */}
            {error && <p className="text-center text-red-500 animate-fade-in-up">{error}</p>}

            {searchResult && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up animation-delay-400">
                    
                    {/* Product Details Card */}
                    <div className="bg-slate-50/70 rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-teal-800 border-b border-gray-200 pb-3 mb-3">Product details</h2>
                        <p className="text-xs text-gray-500 mb-4">{searchResult.productDetails.date}</p>
                        <div className="space-y-1 divide-y divide-gray-200">
                            <DetailRow label="Id" value={searchResult.productDetails.id} />
                            <DetailRow label="Invoice" value={searchResult.productDetails.invoice} />
                            <DetailRow label="Tracking Code" value={searchResult.productDetails.trackingCode} />
                            <DetailRow label="Name" value={searchResult.productDetails.name} />
                            <DetailRow label="Address" value={searchResult.productDetails.address} />
                            <DetailRow label="Phone Number" value={searchResult.productDetails.phone} />
                            <DetailRow label="Approved" value={searchResult.productDetails.approved} />
                            <DetailRow label="Weight" value={searchResult.productDetails.weight} />
                            <DetailRow label="COD" value={searchResult.productDetails.cod} />
                            <DetailRow label="Status" value={searchResult.productDetails.status} status />
                        </div>
                    </div>

                    {/* Tracking Updates Card */}
                    <div className="bg-slate-50/70 rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold text-teal-800 border-b border-gray-200 pb-3 mb-6">Tracking Updates</h2>
                        <div className="relative pl-6">
                            {/* Vertical Line */}
                            <div className="absolute left-9 top-1 bottom-1 w-0.5 bg-gray-200"></div>
                            
                            <div className="space-y-8">
                                {searchResult.trackingUpdates.map((update, index) => (
                                    <div key={index} className="relative flex items-start gap-5 stagger-animation" style={{animationDelay: `${index * 150}ms`}}>
                                        <div className="absolute left-0 top-0 -translate-x-1/2 z-10">
                                            <CheckIcon />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">{update.time}</p>
                                            <p className="text-gray-800 font-semibold">{update.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </main>
    </>
  );
}
