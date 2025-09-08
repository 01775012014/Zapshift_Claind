import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaTruckLoading, FaHandHoldingUsd, FaWarehouse, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

import banar1 from "../../../assets/banner/banner1.png";
import banar2 from "../../../assets/banner/banner2.png";
import banar3 from "../../../assets/banner/banner3.png";

const Banar = () => {
  const banners = [banar1, banar2, banar3];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This will make the children animate one by one
      },
    },
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };
  const services = [
  {
    icon: <FaTruckLoading className="h-10 w-10 text-lime-500" />,
    title: 'Booking Pick & Drop',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
  },
  {
    icon: <FaHandHoldingUsd className="h-10 w-10 text-lime-500" />,
    title: 'Cash On Delivery',
    description: 'Secure and reliable cash handling for your business, ensuring trust and convenience.',
  },
  {
    icon: <FaWarehouse className="h-10 w-10 text-lime-500" />,
    title: 'Delivery Hub',
    description: 'Our strategically located hubs ensure the fastest and most efficient delivery network.',
  },
  {
    icon: <FaBuilding className="h-10 w-10 text-lime-500" />,
    title: 'Booking SME & Corporate',
    description: 'Tailored logistics solutions for SMEs and corporate clients to streamline your supply chain.',
  },
];


  return (
    <>
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[200px] sm:h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            How It <span className="text-lime-500">Works</span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            A simple, streamlined process to get your packages delivered safely and on time.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when the section comes into view
          viewport={{ once: true, amount: 0.3 }} // Ensures animation runs once
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-transparent hover:border-teal-500 cursor-pointer"
              variants={cardVariants}
            >
              <div className="mb-6 bg-teal-50 p-4 rounded-full inline-block group-hover:bg-teal-100 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Banar;

