import React from 'react';
import { motion } from 'framer-motion';
import liveTrackingImg from '../../../assets/live-tracking.png';
import bookingIconImg from '../../../assets/bookingIcon.png';
import safeDeliveryImg from '../../../assets/safe-delivery.png';


const featuresData = [
  {
    image: liveTrackingImg,
    title: 'Live Parcel Tracking',
    description: 'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
    align: 'left',
  },
  {
    image: bookingIconImg,
    title: '100% Safe Delivery',
    description: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    align: 'right',
  },
  {
    image: safeDeliveryImg,
    title: '24/7 Call Center Support',
    description: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    align: 'left',
  },
];


const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden p-8
              flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
            custom={feature.align}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
          >
            
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>

            
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;