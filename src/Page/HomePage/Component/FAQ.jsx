import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, posture correctors are designed to be adjustable and suitable for most body types and ages above 12. However, always consult your doctor before prolonged use.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Regular use can help relieve mild back pain, reduce slouching, and improve posture over time by training your muscles to stay aligned.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include vibration alerts to notify you when you start slouching. Please check the product details for this feature.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can sign up for restock notifications through our website. You will receive an email alert when the product becomes available.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          Frequently Asked Question (FAQ)
        </motion.h2>

        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mt-10 max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-800 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-5 pb-4 text-sm text-gray-600 bg-teal-50"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-10 flex justify-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="flex items-center gap-2 bg-lime-300 px-6 py-3 rounded-xl font-semibold text-gray-800 shadow-md hover:bg-lime-400 transition"
        >
          See More FAQ's
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black text-lime-300">
            →
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default FAQ;
