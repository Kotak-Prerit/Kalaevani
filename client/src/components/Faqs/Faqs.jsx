import React, { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long will it take to get a bulk order?",
      answer:
        "Our team will generally inform you regarding an approximate timeline during the first call you receive from us.",
    },
    {
      question: "What is the minimum order quantity?",
      answer: `For wholesale, the minimum order value is ₹5,00,000/-. Depending on your order size we will share final discounted rates. For project-based or self-design bulk orders, there is no minimum order restriction. Due to machinery and other utilization processes, the costs are always better with higher quantities.`,
    },
    {
      question: "What kind of fabrics are available?",
      answer:
        "At Kalaevani, we utilize a range of fabrics like Cotton Terry, Cotton Fleece, Polar Fleece, Selvedge Denim, Artificial Leather, Artificial Suede, Nylon, Corduroy, etc. As per the requirements, we will suggest the best-suited fabrics, GSM, colors so you can take an informed decision.",
    },
    {
      question: "What kind of prints are available?",
      answer:
        "We offer high-quality prints including digital printing, screen printing, sublimation, and embroidery, tailored to match your specific design requirements.",
    },
    {
      question: "What are the design charges?",
      answer:
        "If you already have your designs, there are no extra charges for design fees. If you require us to design a product, we estimate the charges based on the product and communicate them to you.",
    },
    {
      question: "Any question?",
      answer: "Please reach us at business@kalaevani.com for any inquiries.",
    },
  ];

  return (
    <div className="flex flex-col items-center mb-[15vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-center my-8 futuraLt text-gray-800">
        Frequently Asked Questions
      </h1>

      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white rounded-xl border border-black-600 p-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-none">
            <div
              className="flex justify-between items-center py-4 cursor-pointer group"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-lg md:text-xl font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200 montserrat pr-4">
                {faq.question}
              </h3>
              <span className="flex-shrink-0">
                {activeIndex === index ? (
                  <MdKeyboardArrowUp className="text-3xl text-green-500 bg-green-50 rounded-full p-1" />
                ) : (
                  <MdKeyboardArrowDown className="text-3xl text-gray-400 bg-gray-50 rounded-full p-1 group-hover:text-green-500 group-hover:bg-green-50 transition-colors duration-200" />
                )}
              </span>
            </div>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: activeIndex === index ? '500px' : '0',
              }}
            >
              <p className="text-gray-600 pb-4 poppins text-base md:text-lg whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
