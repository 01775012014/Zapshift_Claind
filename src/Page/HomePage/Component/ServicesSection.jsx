import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaHandshake, FaWarehouse, FaUndo, FaHeadset, FaGlobe } from "react-icons/fa";
// brand
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/moonstar.png";
import brand4 from "../../../assets/brands/randstad.png";
import brand5 from "../../../assets/brands/start.png";
import brand6 from "../../../assets/brands/start-people 1.png";



const servicesData = [
  {
    icon: <FaShippingFast />,
    title: 'Express & Standard Delivery',
    description: 'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.',
    highlighted: false,
  },
  {
    icon: <FaGlobe />,
    title: 'Nationwide Delivery',
    description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
    highlighted: true,
  },
  {
    icon: <FaWarehouse />,
    title: 'Fulfillment Solution',
    description: 'We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.',
    highlighted: false,
  },
  {
    icon: <FaHandshake />,
    title: 'Cash on Home Delivery',
    description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    highlighted: false,
  },
  {
    icon: <FaHeadset />,
    title: 'Corporate Service / Contract In Logistics',
    description: 'Customized corporate services which includes warehouse and inventory management support.',
    highlighted: false,
  },
  {
    icon: <FaUndo />,
    title: 'Parcel Return',
    description: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    highlighted: false,
  },
];


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const ServicesSection = () => {
  return (
    <>
      <section className="bg-gray-50 py-10 sm:py-20 px-4 sm:px-6 lg:px-8 md:px-10 font-sans">
        <div className="max-w-7xl mx-auto bg-gray-600 rounded-[2%] p-4 sm:p-8 md:p-20">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Our Services</h2>
            <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-300">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer
                  ${service.highlighted
                    ? 'bg-lime-300 text-gray-900 shadow-lime-300/30'
                    : 'bg-white backdrop-blur-sm text-white border border-white/20'
                }`}
                variants={cardVariants}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-3xl sm:text-4xl transition-all duration-300
                    ${service.highlighted
                      ? 'bg-gray-50 text-lime-800'
                      : 'bg-gray-400 text-lime-300 group-hover:bg-lime-300 group-hover:text-gray-800'
                  }`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">{service.title}</h3>
                <p className={`leading-relaxed text-sm sm:text-base ${service.highlighted ? 'text-gray-700' : 'text-gray-950'}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand logo */}
      <section className='text-center bg-gray-50 px-4 py-10 sm:py-16'>
        <h2 className='text-black text-2xl sm:text-3xl font-bold mb-8'>We've helped thousands of sales teams</h2>
        <div className='overflow-hidden relative'>
          <motion.div
            className='flex items-center gap-8 sm:gap-12 md:gap-16 whitespace-nowrap'
            animate={{ x: [0, -100 * 6] }} // Assuming 6 logos, adjust as needed
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate logos for seamless loop */}
            <img src={brand1} alt="Amazon" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand2} alt="Casio" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand3} alt="Moonstar" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand4} alt="Randstad" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand5} alt="Start" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand6} alt="Start People" className="h-8 sm:h-10 flex-shrink-0" />
            {/* Duplicate for seamless */}
            <img src={brand1} alt="Amazon" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand2} alt="Casio" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand3} alt="Moonstar" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand4} alt="Randstad" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand5} alt="Start" className="h-8 sm:h-10 flex-shrink-0" />
            <img src={brand6} alt="Start People" className="h-8 sm:h-10 flex-shrink-0" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;

