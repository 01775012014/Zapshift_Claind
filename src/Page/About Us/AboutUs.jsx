import React, { useState } from 'react';

// Tab content data to keep the component clean
const tabContent = {
  story: {
    title: 'Our Story',
    content: [
      "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
      "Our journey began in a small garage with just two scooters and a big idea. We saw the frustration people faced with unreliable deliveries and knew we could do better. By focusing on technology and building a dedicated team of riders, we transformed a local service into a nationwide logistics network, always staying true to our core values.",
      "Today, we are proud to have delivered millions of parcels, empowering small businesses and connecting communities. Our story is one of perseverance, innovation, and an unwavering belief that every parcel tells a story worth delivering with care and precision."
    ]
  },
  mission: {
    title: 'Our Mission',
    content: [
      "Our mission is to revolutionize the logistics industry by providing the most efficient, transparent, and customer-centric delivery experience. We aim to leverage cutting-edge technology to simplify deliveries for individuals and businesses, ensuring every parcel is handled with the utmost care and professionalism.",
      "We are committed to empowering local economies by creating flexible earning opportunities for our riders and helping businesses of all sizes reach their customers faster. Sustainability is at the heart of our operations, and we continuously strive to minimize our environmental footprint through optimized routes and eco-friendly practices."
    ]
  },
  success: {
    title: 'Our Success',
    content: [
        "Success for us is measured by the trust of our customers. With a 99.8% on-time delivery rate and thousands of five-star reviews, we have become a benchmark for reliability in the industry. Our technology-driven approach has significantly reduced delivery times and operational costs, passing the benefits directly to our clients.",
        "We have successfully partnered with over 5,000 businesses, from local artisans to large e-commerce platforms, helping them scale their operations with our seamless logistics solutions. Our growth is a testament to the hard work of our team and the loyalty of the communities we serve."
    ]
  },
  team: {
    title: 'Team & Others',
    content: [
      "Our team is our greatest asset. Comprised of dedicated logistics experts, innovative software engineers, and a passionate support staff, we work collaboratively to keep our promises. Our riders are the face of our company, and we invest in their training and well-being to ensure they provide exceptional service.",
      "We believe in giving back to the community. Through various initiatives, we support local charities and events, fostering a culture of social responsibility. We are more than just a delivery company; we are a partner in progress, committed to making a positive impact wherever we go."
    ]
  }
};


export default function App() {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Story' },
    { id: 'mission', label: 'Mission' },
    { id: 'success', label: 'Success' },
    { id: 'team', label: 'Team & Others' },
  ];

  return (
    <>
      {/* Keyframe animations for fade-in effects */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .content-fade-in { animation: fadeInUp 0.5s ease-out forwards; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* Main container */}
      <main className="bg-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* The main card */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 lg:p-16">
            
            {/* Header Section */}
            <header className="mb-10 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-3">About Us</h1>
              <p className="text-gray-600 max-w-3xl text-base">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
              </p>
            </header>

            <div className="border-t border-gray-200 mb-10 animate-fade-in-up animation-delay-200"></div>

             {/* Tabs and Content Section */}
            <section className="animate-fade-in-up animation-delay-400">
              
              {/* Tab Navigation */}
              <nav className="flex items-center space-x-6 sm:space-x-8 border-b border-gray-200 mb-8 overflow-x-auto pb-2 -mx-1 px-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap pb-3 text-lg font-semibold transition-all duration-300 border-b-4 ${
                      activeTab === tab.id
                        ? 'text-teal-700 border-teal-600'
                        : 'text-gray-500 border-transparent hover:text-teal-600 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Tab Content */}
              <div key={activeTab} className="content-fade-in">
                <div className="space-y-5 text-gray-700 leading-relaxed">
                  {tabContent[activeTab].content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

            </section>
        </div>
      </main>
    </>
  );
}
