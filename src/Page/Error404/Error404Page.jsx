import React, { useState, useEffect } from 'react';

// SVG component for the character illustration
const ErrorCharacter = () => (
    <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto mb-6">
        <g transform="translate(10, 10)">
            {/* Wrench */}
            <g transform="translate(105, 50) rotate(25)">
                <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10c2.239,0,4.295-0.78,5.94-2.064l10.45,10.45 c-0.198,0.222-0.387,0.45-0.57,0.678c-1.341,1.676-2.12,3.753-2.12,5.936c0,5.523,4.477,10,10,10s10-4.477,10-10 s-4.477-10-10-10c-2.183,0-4.26,0.779-5.936,2.12l-0.678,0.57L18.064,18.06C19.22,16.295,20,14.239,20,12C20,6.477,15.523,2,10,2z" fill="#A0AEC0"/>
            </g>

            {/* Main Body */}
            <path d="M30,10 h80 a20,20 0 0 1 20,20 v80 a20,20 0 0 1 -20,20 h-80 a20,20 0 0 1 -20,-20 v-80 a20,20 0 0 1 20,-20 z" fill="#F472B6" stroke="#1F2937" strokeWidth="4" />
            
            {/* Eyes */}
            <circle cx="55" cy="55" r="7" fill="#1F2937" />
            <circle cx="85" cy="55" r="7" fill="#1F2937" />
            
            {/* Mouth */}
            <path d="M60,80 a10,5 0 0 0 20,0" fill="#DC2626" />
            
            {/* Feet */}
            <ellipse cx="50" cy="132" rx="10" ry="5" fill="#1F2937" />
            <ellipse cx="90" cy="132" rx="10" ry="5" fill="#1F2937" />

            {/* Hard Hat */}
            <path d="M30 30 Q 70 -10, 110 30" fill="#FBBF24" stroke="#1F2937" strokeWidth="4" strokeLinecap="round"/>
            <rect x="25" y="25" width="90" height="10" fill="#FBBF24" stroke="#1F2937" strokeWidth="4" rx="3"/>
        </g>
    </svg>
);


// The main Error 404 page component
const Error404Page = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-slate-100 flex items-center justify-center min-h-screen p-4">
            <div className={`
                w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center
                transition-all duration-500 ease-in-out transform
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}>
                <ErrorCharacter />

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Error 404
                </h1>

                <p className="text-gray-500 text-lg mb-8">
                    Oops! The page you're looking for could not be found.
                </p>

                <a 
                    href="#" 
                    className="
                        inline-block bg-[#bde842] hover:bg-[#a8cf3a] text-gray-800 
                        font-bold py-3 px-8 rounded-lg shadow-md
                        transition-all duration-300 transform hover:scale-105
                    "
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default Error404Page;
