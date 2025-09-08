import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaBoxOpen } from 'react-icons/fa';
import CostomarTop from '../../../assets/customer-top.png'


const testimonials = [
  {
    quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "From start to finish, the service was impeccable. The delivery was faster than expected and the product arrived in perfect condition. Highly recommended!",
    name: "Rasel Ahamed",
    title: "CTO",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    quote: "Their customer support is top-notch. They were incredibly helpful and responsive to all my queries. A truly reliable and professional team.",
    name: "Nasir Uddin",
    title: "CEO",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    quote: "The entire process was seamless and efficient. I was kept informed at every stage of the delivery. I'll definitely be using their services again.",
    name: "Jannat Doe",
    title: "Marketing Head",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg"
  }
];

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const TestimonialSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  
  const testimonialIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);


  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}

        >
            <img src={CostomarTop} alt="" className="mx-auto text-4xl text-teal-500 mb-4 mb-5" />
            {/* <FaBoxOpen className="mx-auto text-4xl text-teal-500 mb-4" /> */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">What our customers are sayings</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
             Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>
        </motion.div>

        
        <div className="mt-12 relative h-80 md:h-72">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-lg">
                <FaQuoteLeft className="text-5xl text-teal-100 absolute top-4 left-6 -z-0" />
                <p className="relative text-gray-600 italic mb-6 text-left">"{testimonials[testimonialIndex].quote}"</p>
                <hr className="my-6 border-gray-200" />
                <div className="flex items-center text-left">
                  <img src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name} className="w-16 h-16 rounded-full mr-4 border-2 border-teal-200 p-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonials[testimonialIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[testimonialIndex].title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
       
        <div className="flex justify-center items-center space-x-6 mt-8">
             <button onClick={() => paginate(-1)} className="bg-white p-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors duration-300">
                <FaArrowLeft />
            </button>
            <div className="flex items-center space-x-2">
                 {testimonials.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setPage([i, i > testimonialIndex ? 1 : -1])}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${testimonialIndex === i ? 'bg-teal-500 w-6' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
             <button onClick={() => paginate(1)} className="bg-lime-300 text-gray-800 p-3 rounded-full shadow-md hover:bg-lime-400 transition-colors duration-300">
                <FaArrowRight />
            </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSlider;
